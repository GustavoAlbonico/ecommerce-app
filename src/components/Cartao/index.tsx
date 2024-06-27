import { FC, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import "./index.css";
import { ICartao } from "./types";

interface CartaoProperties {
    mostraModal: boolean,
    buscaCartao: (cartao: ICartao) => void,
}

const Cartao: FC<CartaoProperties> = ({
    mostraModal,
    buscaCartao,
}) => {
    const [open, setOpen] = useState<boolean>(true);
    const [numeroCartao, setNumeroCartao] = useState<string>('');
    const [nomeCompleto, setNomeCompleto] = useState<string>('');
    const [codigo, setCodigo] = useState<string>('');

    const mudaModal = () => (mostraModal ? setOpen(true) : setOpen(false));

    const construirCartao = () => {
        const cartao: ICartao = {
            nomeCompleto: nomeCompleto,
            numeroCartao: numeroCartao,
            codigo: codigo,
        }

        buscaCartao(cartao);
    }

    useEffect(() => {
        mudaModal();
    }, [mostraModal]);

    useEffect(() => {
        construirCartao();
    }, [numeroCartao, nomeCompleto, codigo]);

    return <>
        {
            open
            &&
            <>
                <div className="pagamento-form">
                    <div className="pagamento-img">
                        <img src="/cartao-pagamento.png" alt="" />
                    </div>
                    <TextField
                        fullWidth
                        value={numeroCartao}
                        label="Número do cartão"
                        type="text"
                        onChange={(event) => {
                            if (event) {
                                setNumeroCartao(event.target.value);
                            }
                        }}
                    />
                    <div className="pagamento-form-codigo">
                        <TextField
                            sx={{ width: "90%" }}
                            value={nomeCompleto}
                            label="Nome completo"
                            type="text"
                            onChange={(event) => {
                                if (event) {
                                    setNomeCompleto(event.target.value);
                                }
                            }}
                        />
                        <TextField
                            sx={{ width: "10%" }}
                            value={codigo}
                            label="Código"
                            type="text"
                            onChange={(event) => {
                                if (event) {
                                    setCodigo(event.target.value);
                                }
                            }}
                        />
                    </div>
                </div>
            </>
        }
    </>
}

export default Cartao;