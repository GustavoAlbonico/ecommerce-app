import React from "react";
import { FC } from "react";
import CardOferta from "../../components/CardOferta";
import Carousel from "../../components/Carousel/inde";
import ShapeDivider from "../../components/ShapeDivider";
import Categorias from "../../components/Categorias";

const Home: FC = () => {
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
