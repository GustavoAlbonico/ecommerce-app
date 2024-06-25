import { FC, useState } from "react";
import Aside from "../../components/Aside";
import "./index.css";
import { TextField } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IUsuarioStore } from "../../store/UsuarioStore/types";
import Button from "../../components/Button";

const Endereco: FC = () => {
    const navigate = useNavigate();
    const [usuarioSessao, setUsuarioSessao] = useState<IUsuarioStore>();
    const [urlParametro, setUrlParametro] = useSearchParams();


    const endereco = () => {

    }

    const redirecionamento = () => {
        navigate("/usuario/minhaconta");
    }

    return <>

    
    <div className="container-endereco">
            <Aside usuarioNome="Admin" />
            <main className="endereco-main">
                <div className="titulo-detalhes-endereco">
                    <h2>Suas Informações &#707; Endereço &#707; Adicionar</h2>
                </div>
                <div className="endereco-form">
                    <TextField
                        fullWidth
                        value=""
                        label="Data de Nascimento"
                        type="text"
                        onChange={(event) => {
                            if (event) {
                                // setDataNascimento(event.target.value);
                            }
                        }}
                    />
                    <TextField
                        fullWidth
                        value=""
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
                        value=""
                        label="Telefone"
                        type="text"
                        onChange={(event) => {
                            if (event) {
                                // setTelefone(event.target.value);
                            }
                        }}
                    />
                    <div className="endereco-buttons">
                        <Button
                            nome="Cancelar"
                            funcao={redirecionamento}
                        />
                        <Button
                            nome="Salvar"
                            funcao={endereco}
                        />
                    </div>
                </div>
            </main>
        </div>
    </>
}

export default Endereco;
