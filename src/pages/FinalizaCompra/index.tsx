import { FC, useEffect, useState } from "react";
import HeaderFinalizaCompra from "../../components/HeaderFinalizaCompra";
import FinalizaCompraEndereco from "../../components/FinalizaCompraEndereco";
import "./index.css";
import { Button, MobileStepper, useTheme } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import React from "react";
import FinalizaCompraPagamento from "../../components/FinalizaCompraPagamento";
import { useNavigate } from "react-router-dom";
import { ICartao } from "../../components/Cartao/types";
import { FORMA_PAGAMENTO } from "../../components/FinalizaCompraPagamento/types";

const FinalizaCompra: FC = () => {
    const navigate = useNavigate();
    const [mostraModalEndereco, setMostraModalEndereco] = useState<boolean>(true);
    const [mostraModalPagamento, setMostraModalPagamento] = useState<boolean>(false);
    const [idEndereco, setIdEndereco] = useState<number>(0);
    const [cartao, setCartao] = useState<ICartao>();
    const [etapa, setEtapa] = useState<number>(0);
    const [formaPagamento, setFormaPagamento] = useState<FORMA_PAGAMENTO>();
    const [labelProximo, setLabelProximo] = useState<string>("Próximo");
    const theme = useTheme();

    const validaCartao = ():boolean => {
        if(!cartao?.codigo || !cartao?.nomeCompleto || !cartao?.numeroCartao){
            return false;
        }
        return true;
    }

    const handleNext = () => {

        if(!validaCartao() && etapa === 1 && formaPagamento === FORMA_PAGAMENTO.CARTAO) return;

        if(idEndereco !== 0){
            setEtapa((prevActiveStep) => prevActiveStep + 1);

            switch(etapa){
                case 0:
                    setMostraModalEndereco(false);
                    setMostraModalPagamento(true);
                break;
                case 1:
                    setMostraModalPagamento(false);
                    setLabelProximo("Página Inicial");
                break;
                case 2:
                    setTimeout(() => {
                        navigate("/home");
                    },500);
                break;
            }
        }
    };

    const handleBack = () => {

        setEtapa((prevActiveStep) => prevActiveStep - 1);

        switch(etapa){
            case 1:
                setMostraModalEndereco(true);
                setMostraModalPagamento(false);
            break;
            case 2:
                setMostraModalPagamento(true);
            break;
        }
    };

    const buscaEnderecoId = (idEndereco: number) => (setIdEndereco(idEndereco));

    const defineCartao = (cartao:ICartao) => (setCartao(cartao));

    const defineFormaPagamento = (formaPagamento:FORMA_PAGAMENTO) => (setFormaPagamento(formaPagamento));

    useEffect(() => {

    }, [mostraModalEndereco,mostraModalPagamento])
    
    return <>
        <div className="container-finaliza-compra">
            <HeaderFinalizaCompra etapa={etapa} />
            <div className="content-finaliza">
                <FinalizaCompraEndereco mostraModal={mostraModalEndereco} buscaEndereco={buscaEnderecoId} />
                <FinalizaCompraPagamento 
                    mostraModal={mostraModalPagamento} 
                    buscaCartao={defineCartao}
                    buscaFormaPagamento={defineFormaPagamento}
                />
            </div>
            <div className="container-buttons-finaliza-compra">
                <MobileStepper
                    variant="dots"
                    steps={3}
                    position="static"
                    activeStep={etapa}
                    sx={{ maxWidth: "90%",flexGrow: 1 }}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={etapa === 3}>
                            {labelProximo}
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={etapa === 0 || etapa >= 2}>
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                            Voltar
                        </Button>
                    }
                />
            </div>
        </div>
    </>
}

export default FinalizaCompra;