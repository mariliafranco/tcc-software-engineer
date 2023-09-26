import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Lottie from "react-lottie";
import animationData from "../../Lotties/sob-contrucao-animation.json";

const PaginaSobConstrucao = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <Header />
      <div className="avaliacoesContainer">
        <div className="mt-5 mx-4 text-center content-wrapper">
          Ops! Essa página ainda está em construção!
          <div>
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PaginaSobConstrucao;
