import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AvaliacoesCards from "../../components/AvaliacoesCards/AvaliacoesCards";
import { Button } from "react-bootstrap";
import "./Avaliacoes.scss";

function Avaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const q = searchParams.get("q");

  const avaliacoesCollectionRef = collection(db, "avaliacoes");

  useEffect(() => {
    const getAvaliacoes = async () => {
      try {
        const data = await getDocs(avaliacoesCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setAvaliacoes(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getAvaliacoes();
  }, [avaliacoesCollectionRef]);

  const filteredAvaliacoes = avaliacoes.filter((avaliacao) => {
    return Object.values(avaliacao).some((value) =>
      String(value).toLowerCase().includes(q?.toLowerCase())
    );
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <div className="avaliacoesContainer">
        <div className="text-center fs-2 highlightedText">Avaliações</div>
        <div className="avaliacoesCardContainer content-wrapper mt-5 mx-4">
          <div className="d-flex justify-content-center mb-4">
            <form
              className="d-flex searchRow"
              role="search"
              onSubmit={handleSearchSubmit}
            >
              <input
                className="form-control me-2 searchBar"
                type="text"
                id="q"
                value={q}
                placeholder="Procurar por..."
                aria-label="Search"
                onChange={(e) =>
                  setSearchParams(
                    (prev) => {
                      prev.set("q", e.target.value);
                      return prev;
                    },
                    { replace: true }
                  )
                }
              />
              <Button className="searchButton" type="submit">
                BUSCAR
              </Button>
            </form>
          </div>
          <div className="d-flex justify-content-end mb-4 me-5">
            <Link
              className="btn btn-light submitButton mt-3"
              to="/postar-avaliacao"
            >
              Postar Avaliação
            </Link>
          </div>
          <AvaliacoesCards avaliacoes={filteredAvaliacoes} />
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default Avaliacoes;
