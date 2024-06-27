import React, { useEffect } from "react";
import { FC } from "react";
import CardOferta from "../../components/CardOferta";
import Carousel from "../../components/Carousel/inde";
import ShapeDivider from "../../components/ShapeDivider";
import Categorias from "../../components/Categorias";
import { IUsuarioStore } from "../../store/UsuarioStore/types";
import { ICarrinhoStore } from "../../store/CarrinhoStore/types";
import { atualizaItensCarrinhoStore } from "../../store/CarrinhoStore/carrinhoStore";
import { adicionaUsuarioSessao } from "../../store/UsuarioStore/usuarioStore";

const Home: FC = () => {
  useEffect(() => {
    const usuario: IUsuarioStore = {
      id: 1,
      login: "robertinha furacão",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdG9yZS1wYW5kb3JhLWFwaSIsInN1YiI6ImFsaWNlIiwiZXhwIjoxNzE5NDk0MDU5fQ.3cS-GtM3_oNF-PpcbY1W-mmStzrLx_iMntW2ileuNhQ"
    }

    const carrinho1: ICarrinhoStore = {
      id: 1,
      nome: "pedra",
      valorUnitario: 50.50,
      quantidade: 8,
      imagem: "losadasdasda"
    }

    const carrinho2: ICarrinhoStore = {
      id: 2,
      nome: "jose",
      valorUnitario: 25.50,
      quantidade: 2,
      imagem: "losadasdasda"
    }

    atualizaItensCarrinhoStore(carrinho1);
    atualizaItensCarrinhoStore(carrinho2);
    // limpaCarrinho();
    adicionaUsuarioSessao(usuario);
  }, [])
  return (
    <>
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
