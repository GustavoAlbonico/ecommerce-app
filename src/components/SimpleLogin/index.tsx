import { AlertColor, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { FC, useState } from "react";
import "./index.css";
import { AlternateEmail, Key, Visibility, VisibilityOff } from "@mui/icons-material";
import { STATUS_CODE, apiPost } from "../../api/RestClient";
import { IUsuarioStore } from "../../store/UsuarioStore/types";
import { adicionaUsuarioSessao } from "../../store/UsuarioStore/usuarioStore";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MensagemModal from "../MensagemModal";

interface SimpleLoginProperties {
    onClose: () => void,
    onLogin: (usuario: IUsuarioStore) => void;
}

const SimpleLogin: FC<SimpleLoginProperties> = ({
    onClose,
    onLogin
}) => {
    const [tipoSenha, setTipoSenha] = useState<boolean>(false);
    const [login, setLogin] = useState<string>();
    const [senha, setSenha] = useState<string>();
    const [estadoModal, setEstadoModal] = useState<boolean>(false);
    const [mensagemModal, setMensagemModal] = useState<string[]>([]);
    const [corModal, setCorModal] = useState<AlertColor>("warning");

    const onTipoSenha = () => {
        setTipoSenha(!tipoSenha);
    }

    const autenticarCliente = async () => {
        const data = {
            login,
            senha
        }

        const response = await apiPost("/usuario/login", data);

        if (response.status === STATUS_CODE.OK) {

            const dataResult = response.data;

            const usuario: IUsuarioStore = {
                id: dataResult.id,
                login: dataResult.nome,
                token: dataResult.token
            }
            adicionaUsuarioSessao(usuario);
            onLogin(usuario);
            return;
        }

        if (response.status === STATUS_CODE.BAD_REQUEST) {
            setEstadoModal(true);
            setMensagemModal(response.messages);
        }

        if (response.status === STATUS_CODE.INTERNAL_SERVER_ERROR) {
            setEstadoModal(true);
            setMensagemModal(["Erro Inesperado !"]);
            setCorModal("error");
        }
    }

    return <>
        <MensagemModal
            estadoInicial={estadoModal}
            corModal={corModal}
            mensagem={mensagemModal}
            onClose={() => {
                setEstadoModal(false);
            }}
        />
        <div className="div-login">
            <div className="div-login-linha">
                <TextField
                    fullWidth
                    label="Login"
                    type="text"
                    value={login}
                    onChange={(event) => {
                        if (event) {
                            setLogin(event.target.value);
                        }
                    }}
                    InputProps={{
                        startAdornment: <>
                            <InputAdornment position="start">
                                <AccountCircleIcon />
                            </InputAdornment>
                        </>
                    }}
                />
            </div>
            <div className="div-login-linha">
                <TextField
                    label="Senha"
                    type={tipoSenha ? "text" : "password"}
                    value={senha}
                    onChange={(event) => {
                        if (event) {
                            setSenha(event.target.value);
                        }
                    }}
                    InputProps={{
                        startAdornment: <>
                            <InputAdornment position="start">
                                <Key />
                            </InputAdornment>
                        </>,
                        endAdornment: <>
                            <IconButton onClick={onTipoSenha}>
                                {tipoSenha ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </>
                    }}
                />
            </div>
            <div className="div-login-linha">
                <Button 
                    onClick={onClose}
                    sx={{ 
                        color:"#803EA0",
                        width: "50%",
                        fontSize: "13px",
                        fontWeight: "bolder",
                        border: "1px solid #803EA0"
                    }}
                >
                    Voltar
                </Button>
                <Button
                    sx={{
                        width: "50%",
                        fontSize: "13px",
                        border: "1px solid #803EA0",
                        backgroundColor: '#803EA0',
                        color: 'white',
                        opacity: "0.9",
                        '&:hover': {
                            backgroundColor: '#803EA0',
                            opacity: "1",
                        }
                    }}
                    variant="contained"
                    onClick={() => {
                        autenticarCliente();
                    }}
                >Entrar
                </Button>
            </div>
            <div className="div-login-linha">
                <p>Não tem uma conta? <a href="/usuario/cadastro">Cadastre-se</a></p>
            </div>
        </div>
    </>
}

export default SimpleLogin;