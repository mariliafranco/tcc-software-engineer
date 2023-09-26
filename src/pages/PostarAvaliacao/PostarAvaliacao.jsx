import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AvaliacaoForm from "../../components/AvaliacaoForm/AvaliacaoForm";
import "./PostarAvaliacao.scss";

const PostarAvaliacao = () => {
  return (
    <>
      <Header />
      <div className="postarAvaliacaoContainer">
        <div className="avaliacaoFormContainer content-wrapper">
          <div className="text-center fs-2 highlightedText">
            Postar Avaliação
          </div>
          <AvaliacaoForm />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PostarAvaliacao;
