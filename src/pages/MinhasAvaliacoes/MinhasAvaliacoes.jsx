import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth } from "../../config/firebase";
import Lottie from "react-lottie";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AvaliacoesCards from "../../components/AvaliacoesCards/AvaliacoesCards";
import animationData from "../../Lotties/pagina-vazia.json";
import "./MinhasAvaliacoes.scss";
import { Link } from "react-router-dom";

const MinhasAvaliacoes = () => {
  const [minhasAvaliacoes, setMinhasAvaliacoes] = useState([]);
  console.log(minhasAvaliacoes);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const q = query(
          collection(db, "avaliacoes"),
          where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        setMinhasAvaliacoes(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      }
    };

    fetchAvaliacoes();
  }, []);

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
        <div className="text-center fs-2 highlightedText">
          Minhas Avaliações
        </div>
        <div className="avaliacoesCardContainer mt-5 mx-4">
          <div>
            {minhasAvaliacoes.length > 0 ? (
              <AvaliacoesCards
                avaliacoes={minhasAvaliacoes}
                minhasAvaliacoes={true}
              />
            ) : (
              <div className="text-center mt-1">
                Ops! Parece que você ainda não possui nenhuma avaliação postada
                <Lottie options={defaultOptions} height={300} width={300} />
                Você pode{" "}
                <Link className="textLink" to="/avaliacoes">
                  clicar aqui
                </Link>{" "}
                para ver as avaliações postadas pelos outros usuários ou fazer a
                sua primeira avaliação{" "}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MinhasAvaliacoes;
