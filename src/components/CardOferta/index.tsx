import { FC, useEffect, useState } from "react";
import "./index.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { IProduto } from "./types";
import { STATUS_CODE, apiGet } from "../../api/RestClient";
import BotaoPadrao from "../BotaoPadrao";

const CardOferta: FC = () => {
  const { categoria } = useParams();
  const [produtos, setProdutos] = useState<IProduto[]>([]);

  const carregarProdutos = async () => {
    let url = "/produto/carregar";
    if (categoria) {
      url = `/produto/carregar/categoria/${categoria}`;
    }

    const response = await apiGet(url);
    if (response.status === STATUS_CODE.OK) {
      setProdutos(response.data);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, [categoria]);

  const redirecionarDetalhesProduto = (idProduto: number) => {
    if (idProduto) {
      window.location.href = `/detalhes/${idProduto}`;
    }
  };

  const transformaValorReais = (valorUnitario: number): string => {
    return Intl.NumberFormat("pt-BR", { style: 'currency', currency: 'BRL' }).format(valorUnitario)
}

  return (
    <>
      {produtos.length ? (
        <>
          <div className="container-home-grid">
            {produtos.map((produto: IProduto) => (
              <div key={produto.nome} className={`body-card-oferta ${produto.quantidadeEstoque === 0 && "disabled-card-oferta"}`}>
                <Card className="card-oferta" sx={{ maxWidth: 250 }}>
                  <CardMedia
                    sx={{ height: 180, width: 250 ,objectFit: "cover" }}
                    image={`produtos/${produto.imagem}`}
                    title={produto.nome}
                  />
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography
                      sx={{ marginBottom: 2 }}
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      {produto.nome}
                    </Typography>
                    <Typography sx={{ fontSize: 18 }} variant="body1">
                      <p>{transformaValorReais(produto.valorUnitario)}</p>
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingBottom: 4,
                    }}
                    onClick={() => {
                      redirecionarDetalhesProduto(produto.id);
                    }}
                  >
                    <BotaoPadrao />
                  </CardActions>
                </Card>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>Lista de dados</div>
      )}
    </>
  );
};

export default CardOferta;
