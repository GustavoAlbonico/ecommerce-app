import { FC, useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import "./index.css";
import { BANDEIRA_CARTAO, ICartao } from "./types";

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
    const [bandeiraCartao, setBandeiraCartao] = useState<BANDEIRA_CARTAO>(BANDEIRA_CARTAO.VISA);

    const mudaModal = () => (mostraModal ? setOpen(true) : setOpen(false));

    const construirCartao = () => {
        const cartao: ICartao = {
            nomeCompleto: nomeCompleto,
            numeroCartao: numeroCartao,
            codigo: codigo,
            bandeiraCartao: bandeiraCartao?.toUpperCase() || '',
        }

        buscaCartao(cartao);
    }

    const mudaSelecao = (event: SelectChangeEvent) => {
        const bandeiraCartaoEnum: BANDEIRA_CARTAO = event.target.value as BANDEIRA_CARTAO;
        setBandeiraCartao(bandeiraCartaoEnum);
    };

    useEffect(() => {
        mudaModal();
    }, [mostraModal]);

    useEffect(() => {
        construirCartao();
    }, [numeroCartao, nomeCompleto, codigo, bandeiraCartao]);

    return <>

        {
            open
            &&
            <>
                <div className="pagamento-form">
                    <div className="pagamento-img">
                        <img src="/pagamento/cartao-pagamento.png" alt="cartao exemplo" />
                    </div>
                    <div className="pagamento-form-dados">

                        <TextField
                            value={numeroCartao}
                            label="Número do cartão"
                            type="text"
                            onChange={(event) => {
                                if (event) {
                                    setNumeroCartao(event.target.value);
                                }
                            }}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Bandeira</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={bandeiraCartao}
                                label="Bandeira"
                                onChange={mudaSelecao}
                            >
                                <MenuItem value={BANDEIRA_CARTAO.VISA}>{BANDEIRA_CARTAO.VISA}</MenuItem>
                                <MenuItem value={BANDEIRA_CARTAO.ELO}>{BANDEIRA_CARTAO.ELO}</MenuItem>
                                <MenuItem value={BANDEIRA_CARTAO.HIPERCARD}>{BANDEIRA_CARTAO.HIPERCARD}</MenuItem>
                                <MenuItem value={BANDEIRA_CARTAO.MASTERCARD}>{BANDEIRA_CARTAO.MASTERCARD}</MenuItem>
                                <MenuItem value={BANDEIRA_CARTAO.AMERICAN_EXPRESS}>{BANDEIRA_CARTAO.AMERICAN_EXPRESS}</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="pagamento-form-codigo">
                        <TextField
                            fullWidth
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