import { FC, useEffect, useState } from "react";
import HeaderFinalizaCompra from "../../components/HeaderFinalizaCompra";
import FinalizaCompraEndereco from "../../components/FinalizaCompraEndereco";
import "./index.css";
import { AlertColor, Button, MobileStepper, useTheme } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import React from "react";
import FinalizaCompraPagamento from "../../components/FinalizaCompraPagamento";
import { useNavigate } from "react-router-dom";
import { ICartao } from "../../components/Cartao/types";
import { FORMA_PAGAMENTO } from "../../components/FinalizaCompraPagamento/types";
import { buscaItensCarrinho, limpaCarrinho } from "../../store/CarrinhoStore/carrinhoStore";
import FinalizaCompraFinalizada from "../../components/FinalizaCompraFinalizada";
import { STATUS_CODE, apiPost } from "../../api/RestClient";
import {IDadosFormaPagamento, IPedidoItemPost, IPedidoPost} from "./types";
import { STATUS } from "../../components/CardPedido/types";
import MensagemModal from "../../components/MensagemModal";
import { IPedido } from "../HistoricoCompras/types";

const FinalizaCompra: FC = () => {
    const navigate = useNavigate();
    const [mostraModalEndereco, setMostraModalEndereco] = useState<boolean>(true);
    const [mostraModalPagamento, setMostraModalPagamento] = useState<boolean>(false);
    const [mostraModalCompraFinalizada, setMostraModalCompraFinalizada] = useState<boolean>(false);
    const [idEndereco, setIdEndereco] = useState<number>(0);
    const [idCliente, setIdCliente] = useState<number>(0);
    const [cartao, setCartao] = useState<ICartao>();
    const [etapa, setEtapa] = useState<number>(0);
    const [formaPagamento, setFormaPagamento] = useState<FORMA_PAGAMENTO>();
    const [labelProximo, setLabelProximo] = useState<string>("Próximo");
    const [labelVoltar, setLabelVoltar] = useState<string>("Cancelar");
    const [estadoModal, setEstadoModal] = useState<boolean>(false);
    const [mensagemModal, setMensagemModal] = useState<string[]>([]);
    const [corModal, setCorModal] = useState<AlertColor>("warning");
    const [pedido, setPedido] = useState<IPedido>();
    const theme = useTheme();

    const validaCartao = (): boolean => {
        if (!cartao?.codigo || !cartao?.nomeCompleto || !cartao?.numeroCartao) {
            return false;
        }
        return true;
    }

    const salvaPedido = async () => {

        const itensCarrinho = buscaItensCarrinho();

        const pedidoItemPost: IPedidoItemPost[] = itensCarrinho.map(item => ({
            valorUnitario: item.valorUnitario,
            quantidade: item.quantidade,
            produto_id: item.id
        }));

        const dadosFormaPagamento:IDadosFormaPagamento = {
            numeroCartao: cartao?.numeroCartao,
            nomeTitular: cartao?.nomeCompleto,
            codigoSeguranca: cartao?.codigo,
        }

        const pedidoPost: IPedidoPost = {
            formaPagamento: formaPagamento?.toUpperCase() || '',
            status: STATUS.PENDENTE,
            endereco_id: idEndereco,
            cliente_id: idCliente,
            dadosFormaPagamento:dadosFormaPagamento,
            listaPedidoItem: pedidoItemPost
        }

        const response = await apiPost('/pedido/criar', pedidoPost);

        if (response.status === STATUS_CODE.CREATED) {
            limpaCarrinho();
            setPedido(response.data);
        }

        if (response.status === STATUS_CODE.BAD_REQUEST) {
            setEstadoModal(true);
            setMensagemModal(response.messages);
        }
    }

    const validaCarrinhoVazio = () => {
        const listaCarrinho = buscaItensCarrinho();
        if (listaCarrinho.length < 1) {
            navigate("/home", {
                state: {
                    estadoModal: true,
                    msgModal: "O carrinho está vazio!"
                }
            })
        }
    }

    const handleNext = async () => {

        if (!validaCartao() && etapa === 1 && formaPagamento === FORMA_PAGAMENTO.CARTAO) return;

        if (idEndereco !== 0) {
            setEtapa((prevActiveStep) => prevActiveStep + 1);

            switch (etapa) {
                case 0:
                    setMostraModalEndereco(false);
                    setMostraModalPagamento(true);
                    setLabelVoltar("Voltar");
                    break;
                case 1:
                    setMostraModalPagamento(false);
                    await salvaPedido();
                    setMostraModalCompraFinalizada(true);
                    setLabelProximo("Página Inicial");
                    break;
                case 2:
                    setTimeout(() => {
                        window.location.href = "/home"
                    }, 500);
                    break;
            }
        }
    };

    const handleBack = () => {

        setEtapa((prevActiveStep) => prevActiveStep - 1);

        switch (etapa) {
            case 0:
                window.location.href = "/home";
                break;
            case 1:
                setLabelVoltar("Cancelar");
                setMostraModalEndereco(true);
                setMostraModalPagamento(false);
                break;
            case 2:
                setMostraModalPagamento(true);
                break;
        }
    };

    const buscaEnderecoId = (idEndereco: number) => (setIdEndereco(idEndereco));

    const buscaClienteId = (idCliente: number) => (setIdCliente(idCliente));

    const defineCartao = (cartao: ICartao) => (setCartao(cartao));

    const defineFormaPagamento = (formaPagamento: FORMA_PAGAMENTO) => (setFormaPagamento(formaPagamento));

    useEffect(() => {
        validaCarrinhoVazio();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 190, behavior: 'smooth' });
          },100)
    }, [mostraModalEndereco, mostraModalPagamento, mostraModalCompraFinalizada,formaPagamento]);

    return <>
        <MensagemModal
            estadoInicial={estadoModal}
            corModal={corModal}
            mensagem={mensagemModal}
            onClose={() => {
                setEstadoModal(false);
            }}
        />
        <div className="container-finaliza-compra">
            <HeaderFinalizaCompra etapa={etapa} />
            <div className="content-finaliza">
                <FinalizaCompraEndereco 
                    mostraModal={mostraModalEndereco} 
                    buscaEndereco={buscaEnderecoId} 
                    buscaCliente={buscaClienteId} 
                />
                <FinalizaCompraPagamento
                    mostraModal={mostraModalPagamento}
                    buscaCartao={defineCartao}
                    buscaFormaPagamento={defineFormaPagamento}
                />
                <FinalizaCompraFinalizada 
                    mostraModal={mostraModalCompraFinalizada} 
                    pedido={pedido}
                />
            </div>
            <div className="container-buttons-finaliza-compra">
                <MobileStepper
                    steps={3}
                    position="static"
                    activeStep={etapa}
                    sx={{ maxWidth: "90%", flexGrow: 1}}
                    nextButton={
                        <Button size="small" onClick={handleNext} sx={{ color: "#803EA0"}} disabled={etapa === 3}>
                            {labelProximo}
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack}  sx={{ color: "#803EA0"}} disabled={etapa >= 2}>
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                            {labelVoltar}
                        </Button>
                    }
                />
            </div>
        </div>
    </>
}

export default FinalizaCompra;