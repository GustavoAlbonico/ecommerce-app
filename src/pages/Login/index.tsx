import { AlertColor, Button, TextField } from "@mui/material";
import { FC, useState } from "react";
import "./index.css";
import { ILogin } from "./types";
import { STATUS_CODE, apiPost } from "../../api/RestClient";
import MensagemModal from "../../components/MensagemModal";
import { adicionaUsuarioSessao } from "../../store/UsuarioStore/usuarioStore";
import { IUsuarioStore } from "../../store/UsuarioStore/types";

const Login: FC = () => {
    const [errorLogin, setErrorLogin] = useState<boolean>(false);
    const [errorSenha, setErrorSenha] = useState<boolean>(false);
    const [mensagemErroLogin, setMensagemErroLogin] = useState<string>();
    const [mensagemErroSenha, setMensagemErroSenha] = useState<string>();
    const [login, setLogin] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
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

    const entrar = async () => {

        limpaError();
        if (validaLogin()) return;

        const usuario: ILogin = {
            login: login,
            senha: senha,
        }

        const response = await apiPost("/usuario/login", usuario);

        if (response.status === STATUS_CODE.OK) {

            const usuario:IUsuarioStore = {
                id: response.data.id,
                login: response.data.nome,
                token: response.data.token
            }

            adicionaUsuarioSessao(usuario);
            window.location.href = "/home";
        }

        if (response.status === STATUS_CODE.BAD_REQUEST) {
           const listaMensagens = response.messages;

           for(const mensagem of listaMensagens){
                if(mensagem.includes("Login")){
                    setErrorLogin(true);
                    setMensagemErroLogin(mensagem);
                    continue;
                }
                if(mensagem.includes("Senha")){
                    setErrorSenha(true);
                    setMensagemErroSenha(mensagem);
                }
           }
        }

        if (response.status === STATUS_CODE.INTERNAL_SERVER_ERROR) {
            setEstadoModal(true);
            setMensagemModal(["Erro inesperado!"]);
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
        <div className="container-login-page">
            <header className="header-login">
                <a href="/home"><img src="/pandora_title.png" alt="" /></a>
            </header>
            <main>
                <h3>Jogos incríveis estão a sua espera.</h3>
                <div className="login-login">
                    <TextField
                        fullWidth
                        error={errorLogin}
                        id="standard-basic"
                        sx={{
                            '& .MuiInput-underline:after': {
                                borderBottomColor: '#862886',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#862886',
                            },
                        }}
                        onChange={(e) => {
                            if (e) {
                                setLogin(e.target.value);
                            }
                        }}
                        helperText={mensagemErroLogin}
                        label="Login"
                        variant="standard"
                    />
                </div>
                <div className="login-senha">
                    <TextField
                        fullWidth
                        error={errorSenha}
                        id="standard-basic"
                        sx={{
                            '& .MuiInput-underline:after': {
                                borderBottomColor: '#862886',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#862886',
                            },
                        }}
                        onChange={(e) => {
                            if (e) {
                                setSenha(e.target.value);
                            }
                        }}
                        label="Senha"
                        variant="standard"
                        helperText={mensagemErroSenha}
                    />
                </div>
                <div className="login-buttons">
                    <Button
                        sx={{
                            backgroundColor: '#803EA0',
                            color: 'white',
                            opacity: "0.9",
                            '&:hover': {
                                backgroundColor: '#803EA0',
                                opacity: "1",
                            }
                        }}
                        variant="contained"
                        onClick={entrar}
                    >
                        Entrar
                    </Button>
                </div>
                <p>Não tem uma conta? <a href="/usuario/cadastro">Cadastre-se</a></p>
            </main>
        </div>
    </>
}

export default Login;