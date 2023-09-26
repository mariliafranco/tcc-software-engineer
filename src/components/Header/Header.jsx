import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { Button } from "react-bootstrap";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import * as Icon from "react-bootstrap-icons";
import "./Header.scss";

const Header = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="header">
      <div className="headerLeftColumn ms-5 fs-4">
        <Link to={"/avaliacoes"}>
          <Logo />
        </Link>
      </div>

      <div className="headerRightColumn me-5">
        <Link to="/quem-somos" className="headerButton me-2">
          Quem Somos
        </Link>
        {user ? (
          <>
            <Link
              to="/minhas-avaliacoes"
              className="headerButton fw-bold  d-flex justify-content-center align-content-center"
            >
              <Icon.PersonCircle className="mx-2 fs-4" />
              <div className="mb-0">{user.email.split("@")[0]}</div>
            </Link>
            <Button className="logout" type="button" onClick={logout}>
              Sair
            </Button>
          </>
        ) : (
          <Link to="/avaliacoes" className="headerButton fw-bold">
            Avaliações
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
