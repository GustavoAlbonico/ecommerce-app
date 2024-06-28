import { FC, useEffect, useState } from "react";
import { IPedido, IPedidoItem } from "../../pages/HistoricoCompras/types";
import "./index.css";
import CardPedido from "../CardPedido";

interface FinalizaCompraFinalizadaProperties {
    mostraModal: boolean,
    pedido?: IPedido,
}

const FinalizaCompraFinalizada: FC<FinalizaCompraFinalizadaProperties> = ({
    mostraModal,
    pedido,
}) => {
    const [open, setOpen] = useState<boolean>(false);

    const mudaModal = () => (mostraModal ? setOpen(true) : setOpen(false));

    useEffect(() => {

        mudaModal();
    }, [mostraModal]);

    return <>
        {
            open
            && <>{
                pedido
                    ? <>
                        <div className="container-card-compra-finalizada">
                            {pedido?.listaPedidoItem.map((pedidoItem: IPedidoItem) => {
                                return <>
                                    <CardPedido
                                        status={pedido.status}
                                        endereco={pedido.enderecoApelido}
                                        formaPagamento={pedido.formaPagamento}
                                        quantidade={pedidoItem.quantidade}
                                        valorTotal={pedidoItem.valorTotal}
                                        nomeProduto={pedidoItem.produto.nome}
                                        descricaoProduto={pedidoItem.produto.descricao}
                                        imagemProduto={pedidoItem.produto.imagem}
                                    />
                                </>
                            })}
                        </div>
                    </> 
                    :<>
                        <div className="container-erro-message">
                            <img src="/compra-finalizada-erro.svg" alt="erro inesperado" />
                        </div>
                    </>
                }
            </>
        }
    </>
}

export default FinalizaCompraFinalizada;