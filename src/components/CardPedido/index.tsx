import { FC, useEffect, useState } from "react";
import ContentGroup from "../ContentGroup";
import "./index.css";
import { FORMA_PAGAMENTO } from "./types";

interface CardPedidoProperties {
    status:string
    endereco:string,
    formaPagamento:string,
    quantidade:number,
    valorTotal:number,
    nomeProduto: string,
    descricaoProduto: string,
    imagemProduto:string,
}

const CardPedido: FC<CardPedidoProperties> = ({
    status,
    endereco,
    formaPagamento,
    quantidade,
    valorTotal,
    nomeProduto,
    descricaoProduto,
    imagemProduto
}) => {

    const [cardClasseCor,setCardClasseCor] = useState<string>();
    const [tituloClasseCor,setTituloClasseCor] = useState<string>();

    const mudaCorCard = (status:string) => {
        
        switch(status) {
            case FORMA_PAGAMENTO.PAGO:
                setCardClasseCor("card-pago");
                setTituloClasseCor("card-titulo-pago");
            break;
            case FORMA_PAGAMENTO.PENDENTE:
                setCardClasseCor("card-pendente");
                setTituloClasseCor("card-titulo-pendente");
            break;
            case FORMA_PAGAMENTO.CANCELADO:
                setCardClasseCor("card-cancelado");
                setTituloClasseCor("card-titulo-cancelado");
            break;
            case FORMA_PAGAMENTO.ENTREGUE:
                setCardClasseCor("card-entregue");
                setTituloClasseCor("card-titulo-entregue");
            break;
        }
    }

    useEffect(() => {
        mudaCorCard(status);
    },[])

    return <>
        <div className={`card-pedido ${cardClasseCor}`}>
            <div className="card-pedido-header">
                <h3 className={tituloClasseCor}>{status}</h3>
            </div>
            <div className="card-pedido-details">
                <ContentGroup
                    titulo="Endereço"
                    descricao={endereco}
                />
                <ContentGroup
                    titulo="Pagamento"
                    descricao={formaPagamento}
                />
                <ContentGroup
                    titulo="Quantidade"
                    descricao={quantidade}
                />
                <ContentGroup
                    titulo="Total"
                    descricao={valorTotal}
                />
            </div>
            <div className="card-pedido-produto">
                <img src={`/${imagemProduto}`} alt={nomeProduto} />
                <div className="card-pedido-produto-detalhes">
                    <h4>{nomeProduto}</h4>
                    <p>{descricaoProduto}</p>
                </div>
            </div>
        </div>
    </>
}

export default CardPedido;