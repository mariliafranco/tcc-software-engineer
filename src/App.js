import React, { Fragment } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import PostarAvaliacao from "./pages/PostarAvaliacao/PostarAvaliacao";
import Avaliacoes from "./pages/Avaliacoes/Avaliacoes";
import PaginaSobConstrucao from "./pages/PaginaSobConstrucao/PaginaSobConstrucao";
import { useAuthContext } from "./hooks/useAuthContext";
import CriarConta from "./pages/CriarConta/CriarConta";
import MinhasAvaliacoes from "./pages/MinhasAvaliacoes/MinhasAvaliacoes";

function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <>
      {authIsReady && (
        <Routes>
          <Fragment>
            <Route
              path="/"
              exact
              element={
                !user ? <Login /> : <Navigate to="/avaliacoes" replace />
              }
            ></Route>
            <Route path="/criar-conta" element={<CriarConta />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/postar-avaliacao"
              element={
                user ? <PostarAvaliacao /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/minhas-avaliacoes"
              element={
                user ? <MinhasAvaliacoes /> : <Navigate to="/login" replace />
              }
            />

            <Route path="/avaliacoes" element={<Avaliacoes />} />
            <Route path="*" element={<PaginaSobConstrucao />} />
          </Fragment>
        </Routes>
      )}
    </>
  );
}

export default App;
