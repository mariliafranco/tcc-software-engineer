import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import * as Icon from "react-bootstrap-icons";
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [errorMessage, setErrorMessage] = useState("");
  const [wrongPasswordMessage, setWrongPasswordMessage] = useState("");

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/avaliacoes");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (errorCode === "auth/invalid-login-credentials") {
          setWrongPasswordMessage(
            "Ops! A senha ou o e-mail digitados não estão corretos"
          );
        }
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Por favor, preencha todos os campos antes de continuar");
      return;
    } else {
      setErrorMessage("");
      handleSignIn();
    }
  };

  const [isVisible, setVisible] = useState(false);

  const showOrHidePassword = () => {
    if (type === "password") {
      setVisible(!isVisible);
      setType("text");
    } else {
      setVisible();
      setType("password");
    }
  };

  return (
    <>
      <Header />
      <div className="loginContainer">
        <div className="loginFormContainer content-wrapper">
          <div className="text-center fs-2 highlightedText">Login</div>
          <form className="loginForm" onSubmit={handleSubmit}>
            <div className="formDiv">
              <label className="col-12 inputLabel" htmlFor="email">
                {" "}
                Email ou Usuário Cadastrado
              </label>
              <input
                className="formInput col-12 mt-1"
                name="email"
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="formDiv mt-3">
              <label className="col-12 inputLabel" htmlFor="senha">
                Senha
              </label>
              <div className="d-flex formInput">
                <input
                  className="formInput col-11"
                  id="senha"
                  name="senha"
                  type={type}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />{" "}
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
              </div>
            </div>

            <Link to="relembrar-senha" className="textButton mt-2">
              Esqueceu sua senha?
            </Link>
            {errorMessage && (
              <div className="text-end mt-3 text-danger">{errorMessage}</div>
            )}
            {wrongPasswordMessage && (
              <div className="text-end mt-3 text-danger">
                {wrongPasswordMessage}
              </div>
            )}
            <div>
              <Button className="btn btn-light submitButton mt-3" type="submit">
                ENTRAR
              </Button>
            </div>
          </form>
          <div className="text-center mt-3">
            <p className="buttonParagraph  d-flex justify-content-center align-middle mb-0">
              Não possui uma conta?{" "}
              <Link to="/criar-conta" className="textButton py-0 ms-1">
                Registre-se aqui
              </Link>{" "}
            </p>{" "}
            <p className="buttonParagraph mt-2 mb-1">ou</p>
            <Link to="/avaliacoes" className="textButton">
              Continue sem registrar
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Login;
