import { FC, useEffect, useState } from "react"
import Aside from "../../components/Aside";
import "./index.css";
import CardPedido from "../../components/CardPedido";
import { IPedido, IPedidoItem } from "./types";
import { STATUS_CODE, apiGet } from "../../api/RestClient";
import { buscaUsuarioSessao } from "../../store/UsuarioStore/usuarioStore";
import { AlertColor } from "@mui/material";
import MensagemModal from "../../components/MensagemModal";

const HistoricoCompras: FC = () => {
    const [usuarioSessaoNome, setUsuarioSessaoNome] = useState<string>("Usuário");
    const [pedido, setPedido] = useState<IPedido[]>([]);
    const [estadoModal, setEstadoModal] = useState<boolean>(false);
    const [mensagemModal, setMensagemModal] = useState<string[]>([]);
    const [corModal, setCorModal] = useState<AlertColor>("success");

    const carregarPedido = async () => {

        const usuarioSessao = buscaUsuarioSessao();

        if (usuarioSessao.login) {
            setUsuarioSessaoNome(usuarioSessao.login);

            const response = await apiGet(`/pedido/carregar/usuario/${usuarioSessao.id}`);

            if (response.status === STATUS_CODE.OK) {
                setPedido(response.data);
                return;
            }

            setEstadoModal(true);
            setMensagemModal(["Erro inesperado!"]);
            setCorModal("error");
        }
    }

    useEffect(() => {
        carregarPedido();
    }, []);


    return <>
        <MensagemModal
            estadoInicial={estadoModal}
            corModal={corModal}
            mensagem={mensagemModal}
            onClose={() => {
                setEstadoModal(false);
            }}
        />
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
                            <div className="container-card-pedido">
                                {pedido.map((pedido: IPedido) => {
                                    return pedido?.listaPedidoItem.map((pedidoItem: IPedidoItem) => {
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
                                    })
                                })}
                            </div>
                        </>
                        :
                        <>                          
                        </>
                }
            </main>
        </div>
    </>
}

export default HistoricoCompras;