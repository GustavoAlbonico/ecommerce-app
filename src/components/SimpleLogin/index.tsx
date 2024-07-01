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


    const [errorLogin, setErrorLogin] = useState<boolean>(false);
    const [errorSenha, setErrorSenha] = useState<boolean>(false);
    const [mensagemErroLogin, setMensagemErroLogin] = useState<string>();
    const [mensagemErroSenha, setMensagemErroSenha] = useState<string>();


    const [estadoModal, setEstadoModal] = useState<boolean>(false);
    const [mensagemModal, setMensagemModal] = useState<string[]>([]);
    const [corModal, setCorModal] = useState<AlertColor>("error");


    const limpaError = () => {
        setErrorLogin(false);
        setMensagemErroLogin("");
        setErrorSenha(false);
        setMensagemErroSenha("");
    }

    const validaLogin = (): boolean => {
        let hasError = false;

        if (!login) {
            setErrorLogin(true);
            setMensagemErroLogin("Campo obrigatório");
            hasError = true;
        }
        if (!senha) {
            setErrorSenha(true);
            setMensagemErroSenha("Campo obrigatório");
            hasError = true;
        }

        return hasError;
    }

    const onTipoSenha = () => {
        setTipoSenha(!tipoSenha);
    }

    const autenticarCliente = async () => {
        limpaError();
        if (validaLogin()) return;

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
            const listaMensagens = response.messages;

            for (const mensagem of listaMensagens) {
                if (mensagem.includes("Login")) {
                    setErrorLogin(true);
                    setMensagemErroLogin(mensagem);
                    continue;
                }
                if (mensagem.includes("Senha")) {
                    setErrorSenha(true);
                    setMensagemErroSenha(mensagem);
                }
            }
        }

        if (response.status === STATUS_CODE.INTERNAL_SERVER_ERROR) {
            setEstadoModal(true);
            setMensagemModal(["Erro Inesperado !"]);
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
                    error={errorLogin}
                    fullWidth
                    label="Login"
                    type="text"
                    value={login}
                    helperText={mensagemErroLogin}
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
                    error={errorSenha}
                    label="Senha"
                    type={tipoSenha ? "text" : "password"}
                    value={senha}
                    helperText={mensagemErroSenha}
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
                        color: "#850d85",
                        width: "50%",
                        fontSize: "13px",
                        fontWeight: "bolder",
                        border: "1px solid #850d85"
                    }}
                >
                    Voltar
                </Button>

                <Button
                    sx={{
                        width: "50%",
                        fontSize: "13px",
                        border: "1px solid #850d85",
                        backgroundColor: '#850d85',
                        color: 'white',

                        '&:hover': {
                            backgroundColor: '#8d288d',
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