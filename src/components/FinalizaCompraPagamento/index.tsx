import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FC, useState } from "react";
import { FORMA_PAGAMENTO } from "./types";
import "./index.css";

const FinalizaCompraPagamento: FC = () => {
    const [formaPagamento, setFormaPagamento] = useState<FORMA_PAGAMENTO>(FORMA_PAGAMENTO.NONE);
    const [valorTotal, setValorTotal] = useState<number>();

    const mudaSelecao = (event: SelectChangeEvent) => {
        setFormaPagamento(event.target.value as FORMA_PAGAMENTO);
    };

    return <>
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
                        <MenuItem value={FORMA_PAGAMENTO.BOLETO}>{FORMA_PAGAMENTO.BOLETO}</MenuItem>
                        <MenuItem value={FORMA_PAGAMENTO.CARTAO}>{FORMA_PAGAMENTO.CARTAO}</MenuItem>
                    </Select>
                </FormControl>
                <div className="header-title-pagamento">
                    <h3>Valor Total:R$ {valorTotal}</h3>
                </div>
            </div>
        </div>
    </>
}

export default FinalizaCompraPagamento;