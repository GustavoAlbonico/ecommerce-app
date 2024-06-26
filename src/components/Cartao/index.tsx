import { FC, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import "./index.css";

interface CartaoProperties {
    mostraModal: boolean,
}

const Cartao: FC<CartaoProperties> = ({
    mostraModal,
}) => {
    const [open, setOpen] = useState<boolean>(true);

    const mudaModal = () => (mostraModal ? setOpen(true) : setOpen(false));

    useEffect(() => {
        mudaModal();
    }, [mostraModal])

    return <>
        {
            open
            &&
            <>
                <div className="pagamento-form">
                    <div>
                        <img src="/dominion.png" alt="" />
                    </div>
                    <TextField
                        fullWidth
                        // value={dataNascimento}
                        label="Data de Nascimento"
                        type="date"
                        onChange={(event) => {
                            if (event) {
                                // setDataNascimento(event.target.value);
                            }
                        }}
                    />
                    <div className="pagamento-form-codigo">
                        <TextField
                            fullWidth
                            // value={email}
                            label="E-mail"
                            type="mail"
                            onChange={(event) => {
                                if (event) {
                                    // setEmail(event.target.value);
                                }
                            }}
                        />
                        <TextField
                            fullWidth
                            // value={telefone}
                            label="Telefone"
                            type="text"
                            onChange={(event) => {
                                if (event) {
                                    // setTelefone(event.target.value);
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