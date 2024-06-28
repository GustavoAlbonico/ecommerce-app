import { FC, useState } from "react";
import "./index.css";
import CarouselDetalhes from "../../components/CarouselDetalhes";
import InputQuantidade from "../../components/InputQuantidade";
import BotaoPadrao from "../../components/BotaoPadrao";

//commit branch
const DetalheProduto: FC = () => {
  const [quantidadeProduto, setQuantidadeProduto] = useState<number>(1);
  return (
    <>
      <section className="detalhes-produto-section">
        <CarouselDetalhes />
        <div className="detalhes-produto-body">
          <h3 className="detalhes-produto-title">Exploding Kittens</h3>
          <p>Um jogo de cartas rápido e maluco.</p>
          <div className="detalhes-produto-card-info">
            <div className="detalhes-produto-info">
              <span>Classificação indicativa</span>
              <span>16+</span>
            </div>
            <div className="detalhes-produto-info">
              <span>Nº de jogadores</span>
              <span>2-5</span>
            </div>
          </div>
          <p>34,90</p>
          <InputQuantidade
            quantidade={quantidadeProduto || 0}
            onChange={(quantidade: number) => {
              setQuantidadeProduto(quantidade);
            }}
          />
          <BotaoPadrao/>
        </div>
      </section>
    </>
  );
};

export default DetalheProduto;
