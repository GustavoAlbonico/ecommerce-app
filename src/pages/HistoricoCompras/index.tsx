import { FC, useEffect, useState } from "react"
import Aside from "../../components/Aside";
import "./index.css";
import CardPedido from "../../components/CardPedido";
import { IPedido, IPedidoItem } from "./types";
import { STATUS_CODE, apiGet } from "../../api/RestClient";
import { buscaUsuarioSessao } from "../../store/UsuarioStore/usuarioStore";

const HistoricoCompras: FC = () => {
    const [usuarioSessaoNome, setUsuarioSessaoNome] = useState<string>("Usuário");
    const [pedido, setPedido] = useState<IPedido>();


    const carregarPedido = async () => {

        const usuarioSessao = buscaUsuarioSessao();

        if (usuarioSessao.login) {
            setUsuarioSessaoNome(usuarioSessao.login);

            const response = await apiGet(`/pedido/carregar/usuario/${usuarioSessao.id}`);

            if (response.status === STATUS_CODE.OK) {
                setPedido(response.data);
            }
        }
    }

console.log(pedido)


    useEffect( () => {
            carregarPedido();
    }, []);

    
    return <>
        <div className="container-historico-compras">
            <Aside usuarioNome={usuarioSessaoNome} />
            <main className="historico-compras-main">
                <div className="titulo-detalhes-historico">
                    <h2>Histórico de Compras</h2>
                </div>
                    {
                    pedido
                    ?
                    <>
                    <p>{pedido.clienteNome}</p>
                    {/* {pedido?.listaPedidoItem.map((pedidoItem:IPedidoItem) => {
                        return <>
                            <div className="container-card-pedido">
                                <CardPedido
                                    endereco={pedido.enderecoApelido}
                                    formaPagamento={pedido.formaPagamento}
                                    quantidade={pedidoItem.quantidade}
                                    valorTotal={pedidoItem.valorTotal}
                                    nomeProduto={pedidoItem.produto.nome}
                                    descricaoProduto={pedidoItem.produto.descricao}
                                    imagemProduto={pedidoItem.produto.imagem}
                                />
                            </div>
                        </>
                    })} */}
                    </>
                    :
                    <>
                    <p>ERRO INESPERADO</p>
                    </>
                    }
            </main>
        </div>
    </>
}

export default HistoricoCompras;