import { FC } from "react";
import ContentGroup from "../ContentGroup";
import "./index.css";

interface CardPedidoProperties {
    endereco:string,
    formaPagamento:string,
    quantidade:number,
    valorTotal:number,
    nomeProduto: string,
    descricaoProduto: string,
    imagemProduto:string,
}

const CardPedido: FC<CardPedidoProperties> = ({
    endereco,
    formaPagamento,
    quantidade,
    valorTotal,
    nomeProduto,
    descricaoProduto,
    imagemProduto
}) => {

    return <>
        <div className="card-pedido">
            <div className="card-pedido-header">
                <h3>PAGO</h3>
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