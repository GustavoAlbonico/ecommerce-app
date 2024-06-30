import React, { useEffect, useState } from "react";
import { FC } from "react";
import CardOferta from "../../components/CardOferta";
import Carousel from "../../components/Carousel/inde";
import ShapeDivider from "../../components/ShapeDivider";
import Categorias from "../../components/Categorias";
import { atualizaItensCarrinhoStore } from "../../store/CarrinhoStore/carrinhoStore";
import { adicionaUsuarioSessao } from "../../store/UsuarioStore/usuarioStore";
import { ICarrinhoStore } from "../../store/CarrinhoStore/types";
import { IUsuarioStore } from "../../store/UsuarioStore/types";
import "./index.css";
import { useParams } from "react-router-dom";
import { IProduto } from "../../components/CardOferta/types";
import { CATEGORIA } from "./types";

const Home: FC = () => {
  const { categoria } = useParams();
  const [titulo, setTitulo] = useState<string>("Oferta");

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
  },[])

  useEffect(() => {
    const usuario: IUsuarioStore = {
      id: 1,
      login: "robertinha furacão",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdG9yZS1wYW5kb3JhLWFwaSIsInN1YiI6ImFsaWNlIiwiZXhwIjoxNzE5NjE5MzU2fQ.PxTs6d48U_QtTDUoIG487iaRN1YQkX77eKPEWtlTUW0",
    };

    
    adicionaUsuarioSessao(usuario);
  }, []);

  return (
    <>
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
