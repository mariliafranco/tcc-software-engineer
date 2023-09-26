import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import categories from "../../data/categorias.json";
import { Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { db, auth } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import "./AvaliacaoForm.scss";

const AvaliacaoForm = () => {
  const [produto, setProduto] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [valor, setValor] = useState("");
  const [nota, setNota] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    produto: "",
    marca: "",
    modelo: "",
    valor: "",
    nota: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({
      produto: "",
      marca: "",
      modelo: "",
      valor: "",
      nota: "",
    });

    let hasError = false;

    if (!produto) {
      setErrors((prevState) => ({
        ...prevState,
        produto: "Por favor selecione uma opção",
      }));
      hasError = true;
    }
    if (!marca) {
      setErrors((prevState) => ({
        ...prevState,
        marca: "Digite a marca",
      }));
      hasError = true;
    }
    if (!modelo) {
      setErrors((prevState) => ({
        ...prevState,
        modelo: "Digite o modelo",
      }));
      hasError = true;
    }
    if (!valor || !/^\d+(,\d+)*$/.test(valor)) {
      setErrors((prevState) => ({
        ...prevState,
        valor: "Digite o valor separado por vírgula",
      }));
      hasError = true;
    }
    if (!nota || !/^\d+\.\d$/.test(nota)) {
      setErrors((prevState) => ({
        ...prevState,
        nota: "Digite uma nota válida (ex: 7.8)",
      }));
      hasError = true;
    }

    if (hasError) return;
    event.preventDefault();
    const avaliacoesCollectionRef = collection(db, "avaliacoes");
    setIsLoading(true);
    try {
      await addDoc(avaliacoesCollectionRef, {
        tipoDeProduto: produto,
        marca: marca,
        modelo: modelo,
        valorPago: valor,
        nota: nota,
        userId: auth?.currentUser?.uid,
      });
      setIsSuccessful(true);
    } catch (err) {
      console.error(err);
      setIsSuccessful(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSuccessful) {
      setTimeout(() => {
        navigate("/minhas-avaliacoes");
      }, 2000);
    }
  }, [isSuccessful, navigate]);

  const renderInput = (id, labelText, value, setter, icon, inputClass = "") => (
    <div className={`avaliacaoFormDiv mt-3`}>
      <label className="col-12 text-center inputLabel" htmlFor={id}>
        {labelText}
      </label>
      <div className="input-group mt-1 d-flex">
        <span className="input-group-text avaliacaoFormInput">
          {React.createElement(Icon[icon], { className: "inputIcon" })}
        </span>
        <input
          className={`avaliacaoFormInput py-2 ${inputClass}`}
          id={id}
          type="text"
          name={id}
          value={value}
          onChange={(e) => setter(e.target.value)}
        />
      </div>
      {errors[id] && (
        <div className="text-danger mt-2 errorMessage">{errors[id]}</div>
      )}
    </div>
  );
  return (
    <>
      <form className="avaliacaoForm" onSubmit={handleSubmit}>
        <div className="avaliacaoFormDiv col-8 mx-auto">
          <label className="col-12 text-center inputLabel" htmlFor="tipo">
            Tipo do Produto
          </label>
          <select
            className="avaliacaoFormInput col-12 text-center mt-1 py-2"
            name="produto"
            id="produto"
            value={produto}
            onChange={(e) => setProduto(e.target.value)}
          >
            <option value="" hidden>
              Selecionar
            </option>
            {categories.map((prd) => (
              <option key={prd}>{prd}</option>
            ))}
          </select>
        </div>
        <div className="avaliacaoFormInputGroup">
          {renderInput("marca", "Marca", marca, setMarca, "Bullseye", "me-1")}
          {renderInput("modelo", "Modelo", modelo, setModelo, "Joystick")}
        </div>
        <div className="avaliacaoFormInputGroup col-8 px-5 mx-auto">
          {renderInput(
            "valor",
            "Valor Pago",
            valor,
            setValor,
            "CashCoin",
            "col-8"
          )}
          {renderInput(
            "nota",
            "Avaliação",
            nota,
            setNota,
            "AwardFill",
            "col-8"
          )}
        </div>
        <div className="text-center mt-5">
          <Button
            className="btn btn-light submitReviewButton"
            type="button"
            onClick={handleSubmit}
          >
            {isLoading ? "Enviando..." : "ENVIAR"}
          </Button>
        </div>
        {isSuccessful && (
          <div className="alert alert-info mt-3" role="alert">
            Avaliação criada com sucesso!
          </div>
        )}
      </form>
    </>
  );
};

export default AvaliacaoForm;
