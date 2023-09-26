import React from "react";
import { Card } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import "./AvaliacoesCards.scss";

const AvaliacoesCards = ({ avaliacoes, minhasAvaliacoes }) => {
  return (
    <div className="avaliacoesCardsContainer content-wrapper">
      {avaliacoes?.map((item) => (
        <Card className="avaliacaoCard" key={item.id}>
          <Card.Body className="card-body">
            <h6 className="card-title text-center">
              {item.tipoDeProduto.toUpperCase()}
            </h6>
            <Card.Text className="card-text avaliacaoMarca">
              <span>
                {" "}
                <Icon.Bullseye className="icon"></Icon.Bullseye>
              </span>{" "}
              {item.marca}
            </Card.Text>
            <Card.Text className="card-text avaliacaoModelo">
              <span>
                <Icon.Joystick className="icon"></Icon.Joystick>
              </span>
              {item.modelo}
            </Card.Text>
            <Card.Text className="card-text avaliacaoValor">
              <span>
                <Icon.CashCoin className="icon"></Icon.CashCoin>
              </span>
              {item.valorPago}
            </Card.Text>
            <Card.Text className="card-text text-center avaliacaoNota">
              <span>
                <Icon.AwardFill className="icon"></Icon.AwardFill>
              </span>
              {item.nota}
            </Card.Text>
            {minhasAvaliacoes ? (
              <div className="col-12 text-center mt-4">
                <Icon.TrashFill className="icon trashIcon" />
              </div>
            ) : (
              ""
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default AvaliacoesCards;
