import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Button } from "react-bootstrap";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import * as Icon from "react-bootstrap-icons";
import "./CriarConta.scss";

const CriarConta = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();

  const handleCreateAccount = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/minhas-avaliacoes");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !passwordConfirmation.trim()
    ) {
      setErrorMessage("Por favor, preencha todos os campos antes de continuar");
      return;
    }
    if (password !== passwordConfirmation) {
      setErrorMessage(
        "Os campos senha e confirmação de senha devem ser iguais"
      );
      return;
    }

    const regexLowercase = /[a-z]/g;
    const regexUppercase = /[A-Z]/g;
    const regexDigit = /[0-9]/g;
    const regexSpecial = /[!@#$%^&*]/g;

    if (password.length < 8) {
      setErrorMessage("A senha deve ter pelo menos 8 caracteres");
      return;
    }
    if (!password.match(regexLowercase)) {
      setErrorMessage("A senha deve conter pelo menos uma letra minúscula");
      return;
    }
    if (!password.match(regexUppercase)) {
      setErrorMessage("A senha deve conter pelo menos uma letra maiúscula");
      return;
    }
    if (!password.match(regexDigit)) {
      setErrorMessage("A senha deve conter pelo menos um dígito numérico");
      return;
    }
    if (!password.match(regexSpecial)) {
      setErrorMessage(
        "A senha deve conter pelo menos um caractere especial como !@#$%^&*"
      );
      return;
    }
    setErrorMessage("");
    handleCreateAccount();
  };

  const [isVisible, setVisible] = useState(false);

  const showOrHidePassword = () => {
    if (passwordType === "password") {
      setVisible(!isVisible);
      setPasswordType("text");
    } else {
      setVisible();
      setPasswordType("password");
    }
  };

  const formInput = [
    {
      id: "name",
      label: "Nome Completo",
      value: "name",
      onChangeAction: setName,
      type: "text",
      classname: "col-12",
    },
    {
      id: "username",
      label: "Nome de Usuário",
      value: "username",
      onChangeAction: setUsername,
      type: "text",
      classname: "col-12",
    },
    {
      id: "email",
      label: "Email",
      value: "email",
      onChangeAction: setEmail,
      type: "email",
      classname: "col-12",
    },
    {
      id: "password",
      label: "Senha",
      value: "password",
      onChangeAction: setPassword,
      type: passwordType,
      classname: "col-11",
    },
    {
      id: "passwordConfirmation",
      label: "Confirmação da Senha",
      value: "passwordConfirmation",
      onChangeAction: setPasswordConfirmation,
      type: passwordType,
      classname: "col-11",
    },
  ];

  return (
    <>
      <Header />
      <div className="criarContaContainer h-100 content-wrapper">
        <div className="criarContaFormContainer">
          <div className="text-center fs-2 highlightedText">Criar Conta</div>
          <form className="criarContaForm" onSubmit={handleSubmit}>
            {formInput.map((inpt) => (
              <div className="formDiv" key={inpt.id}>
                <label className="col-12 inputLabel" htmlFor={inpt.value}>
                  {inpt.label}
                </label>
                <div className="d-flex formInput">
                  <input
                    className={`formInput ${inpt.classname}`}
                    name={inpt.value}
                    id={inpt.id}
                    type={inpt.type}
                    value={
                      { name, username, email, password, passwordConfirmation }[
                        inpt.value
                      ]
                    }
                    onChange={(e) => inpt.onChangeAction(e.target.value)}
                  />
                  {(inpt.id === "password" ||
                    inpt.id === "passwordConfirmation") && (
                    <span
                      className="col-1 text-center"
                      onClick={() => showOrHidePassword()}
                    >
                      {isVisible ? (
                        <Icon.Eye className="inputIcon eyeIcon" />
                      ) : (
                        <Icon.EyeSlash className="inputIcon eyeIcon" />
                      )}
                    </span>
                  )}
                </div>
              </div>
            ))}
            {errorMessage && (
              <div className="text-end mt-3 text-danger">{errorMessage}</div>
            )}

            <div>
              <Button className="btn btn-light submitButton mt-2" type="submit">
                ENVIAR
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CriarConta;
