import React, { useEffect, useState } from "react";
import { FC } from "react";
import CardOferta from "../../components/CardOferta";
import Carousel from "../../components/Carousel/inde";
import ShapeDivider from "../../components/ShapeDivider";
import Categorias from "../../components/Categorias";
import "./index.css";
import { useParams } from "react-router-dom";
import { CATEGORIA } from "./types";
import { AlertColor } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import MensagemModal from "../../components/MensagemModal";
        

const Home: FC = () => {
  const { categoria } = useParams();
  const [titulo, setTitulo] = useState<string>("Oferta");
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [estadoModal, setEstadoModal] = useState<boolean>(false);
  const [mensagemModal, setMensagemModal] = useState<string[]>([]);
  const [corModal, setCorModal] = useState<AlertColor>("warning");
    
  const showMensagemModal = () => {
    if (state) {
      setEstadoModal(state.estadoModal);
      setMensagemModal([state.msgModal]);
      navigate(location.pathname, { replace: true, state: null });
    }
  }

  const mudaTitulo = () => {
    switch (categoria) {
      case CATEGORIA.CARTAS:
        setTitulo("Cartas");
        break;
      case CATEGORIA.RPG:
        setTitulo("RPG");
        break;
      case CATEGORIA.MAGIC:
        setTitulo("Magic");
        break;
      case CATEGORIA.TABULEIRO:
        setTitulo("Tabuleiro");
        break;
    }
  };

  useEffect(() => {
    mudaTitulo();
    showMensagemModal();
  },[]);


  return (
    <>
      <MensagemModal
        estadoInicial={estadoModal}
        corModal={corModal}
        mensagem={mensagemModal}
        onClose={() => {
          setEstadoModal(false);
        }}
      />
      <div className="home-body">
        <Carousel />
        <ShapeDivider />
        <Categorias />
        <p>
          <h2 className="home-title">{titulo}</h2>
        </p>
        <CardOferta />
      </div>
    </>
  );
};

export default Home;
