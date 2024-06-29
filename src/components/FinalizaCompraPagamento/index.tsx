import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { FORMA_PAGAMENTO } from "./types";
import "./index.css";
import { buscaItensCarrinho } from "../../store/CarrinhoStore/carrinhoStore";
import { ICarrinhoStore } from "../../store/CarrinhoStore/types";
import Cartao from "../Cartao";
import Pix from "../Pix";
import Boleto from "../Boleto";
import { ICartao } from "../Cartao/types";

interface FinalizaCompraPagamentoProperties {
    mostraModal: boolean,
    buscaCartao: (cartao: ICartao) => void,
    buscaFormaPagamento: (formaPagamento: FORMA_PAGAMENTO) => void,
}

const FinalizaCompraPagamento: FC<FinalizaCompraPagamentoProperties> = ({
    mostraModal,
    buscaCartao,
    buscaFormaPagamento,
}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [mostraCartao, setMostraCartao] = useState<boolean>(true);
    const [mostraPix, setMostraPix] = useState<boolean>(false);
    const [mostraBoleto, setMostraBoleto] = useState<boolean>(false);
    const [formaPagamento, setFormaPagamento] = useState<FORMA_PAGAMENTO>(FORMA_PAGAMENTO.CARTAO);
    const [valorTotal, setValorTotal] = useState<string>();

    const mudaModal = () => (mostraModal ? setOpen(true) : setOpen(false));

    const mudaSelecao = (event: SelectChangeEvent) => {
        const formaPagementoEnum: FORMA_PAGAMENTO = event.target.value as FORMA_PAGAMENTO;

        setFormaPagamento(formaPagementoEnum);
        mudaContent(formaPagementoEnum);
    };

    const mudaContent = (formaPagementoEnum: FORMA_PAGAMENTO) => {
        switch (formaPagementoEnum) {
            case FORMA_PAGAMENTO.CARTAO:
                setMostraCartao(true);
                setMostraBoleto(false);
                setMostraPix(false);
                break;
            case FORMA_PAGAMENTO.PIX:
                setMostraCartao(false);
                setMostraBoleto(false);
                setMostraPix(true);
                break;
            case FORMA_PAGAMENTO.BOLETO:
                setMostraCartao(false);
                setMostraBoleto(true);
                setMostraPix(false);
                break;
        }
    }

    const calculaValorTotal = () => {
        const listaCarrinho: ICarrinhoStore[] = buscaItensCarrinho();

        let somaTotal: number = 0;

        listaCarrinho.forEach((carrinho: ICarrinhoStore) => {
            somaTotal += carrinho.quantidade * carrinho.valorUnitario;
        });

        setValorTotal(Intl.NumberFormat("pt-BR", { style: 'currency', currency: 'BRL' }).format(somaTotal));
    }

    const defineCartao = (cartao:ICartao) => (buscaCartao(cartao));

    useEffect(() => {
        mudaModal();
        calculaValorTotal();
    }, [mostraModal]);

    useEffect(() => {
       buscaFormaPagamento(formaPagamento);
    }, [formaPagamento]);

    return <>
        {
            open
            &&
            <>
                <div className="container-pagamento">
                    <div className="header-pagamento">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Forma de Pagamento</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formaPagamento}
                                label="Forma de Pagamento"
                                onChange={mudaSelecao}
                            >
                                <MenuItem value={FORMA_PAGAMENTO.PIX}>{FORMA_PAGAMENTO.PIX}</MenuItem>
                                <MenuItem value={FORMA_PAGAMENTO.CARTAO}>{FORMA_PAGAMENTO.CARTAO}</MenuItem>
                                <MenuItem value={FORMA_PAGAMENTO.BOLETO}>{FORMA_PAGAMENTO.BOLETO}</MenuItem>
                            </Select>
                        </FormControl>
                        <div className="header-title-pagamento">
                            <h3>Valor Total: {valorTotal}</h3>
                        </div>
                    </div>
                    <div className="content-pagamento">
                        <Cartao mostraModal={mostraCartao} buscaCartao={defineCartao}/>
                        <Pix mostraModal={mostraPix}/>
                        <Boleto mostraModal={mostraBoleto} valorTotal={valorTotal || ""}/>
                    </div>
                </div>
            </>
        }
    </>
}

export default FinalizaCompraPagamento;