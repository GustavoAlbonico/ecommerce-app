import React, { useEffect, useState } from "react";
import { FC } from "react";
import CardOferta from "../../components/CardOferta";
import Carousel from "../../components/Carousel/inde";
import ShapeDivider from "../../components/ShapeDivider";
import Categorias from "../../components/Categorias";
import { IUsuarioStore } from "../../store/UsuarioStore/types";
import { ICarrinhoStore } from "../../store/CarrinhoStore/types";
import { atualizaItensCarrinhoStore, buscaItensCarrinho, limpaCarrinho } from "../../store/CarrinhoStore/carrinhoStore";
import { adicionaUsuarioSessao } from "../../store/UsuarioStore/usuarioStore";
import { AlertColor } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import MensagemModal from "../../components/MensagemModal";

const Home: FC = () => {
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

  useEffect(() => {
    showMensagemModal();
  }, []);

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
        <h2 className="home-title">Ofertas</h2>
        <CardOferta />
      </div>
    </>
  );
};

export default Home;
