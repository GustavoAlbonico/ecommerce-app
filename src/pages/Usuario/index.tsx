import { AlertColor, Button, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import "./index.css"
import { useNavigate, useSearchParams } from "react-router-dom";
import { IUsuarioStore } from "../../store/UsuarioStore/types";
import { IClienteCadastro, IEnderecoCadastro, IUsuarioCadastro } from "./types";
import { STATUS_CODE, apiPost } from "../../api/RestClient";
import { adicionaUsuarioSessao, buscaUsuarioSessao } from "../../store/UsuarioStore/usuarioStore";

interface UsuarioProperties {

}

const Usuario: FC<UsuarioProperties> = ({


}) => {
  const navigate = useNavigate();
  const [usuarioSessao, setUsuarioSessao] = useState<IUsuarioStore>();
  const [urlParametro, setUrlParametro] = useSearchParams();
  const [estadoModal, setEstadoModal] = useState<boolean>(false);
  const [mensagemModal, setMensagemModal] = useState<string[]>([]);
  const [corModal, setCorModal] = useState<AlertColor>("success");

  const [login, setLogin] = useState<string>('');
  const [senha, setSenha] = useState<string>('');

  const [nome, setNome] = useState<string>('');
  const [dataNascimento, setDataNascimento] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');

  const [apelido, setApelido] = useState<string>('');
  const [bairro, setBairro] = useState<string>('');
  const [numero, setNumero] = useState<string>('');
  const [cep, setCep] = useState<string>('');
  const [logradouro, setLogradouro] = useState<string>('');
  const [complemento, setComplemento] = useState<string>('');

  // validações - usuario
  const [errorLogin, setErrorLogin] = useState<boolean>(false);
  const [errorSenha, setErrorSenha] = useState<boolean>(false);

  const [mensagemLogin, setMensagemErroLogin] = useState<string>();
  const [mensagemErroSenha, setMensagemErroSenha] = useState<string>();

  // validações - cliente
  const [errorNomeCompleto, setErrorNomeCompleto] = useState<boolean>(false);
  const [errorDataNascimento, setErrorDataNascimento] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorTelefone, setErrorTelefone] = useState<boolean>(false);

  const [mensagemNomeCompleto, setMensagemErroNomeCompleto] = useState<string>();
  const [mensagemErroDataNascimento, setMensagemErroDataNascimento] = useState<string>();
  const [mensagemErroEmail, setMensagemErroEmail] = useState<string>();
  const [mensagemErroTelefone, setMensagemErroTelefone] = useState<string>();

  // validações - endereço
  const [errorApelido, setErrorApelido] = useState<boolean>(false);
  const [errorBairro, setErrorBairro] = useState<boolean>(false);
  const [errorNumero, setErrorNumero] = useState<boolean>(false);
  const [errorLogradouro, setErrorLogradouro] = useState<boolean>(false);
  const [errorCep, setErrorCep] = useState<boolean>(false);

  const [mensagemErroApelido, setMensagemErroApelido] = useState<string>();
  const [mensagemErroBairro, setMensagemErroBairro] = useState<string>();
  const [mensagemErroNumero, setMensagemErroNumero] = useState<string>();
  const [mensagemErroLogradouro, setMensagemErroLogradouro] = useState<string>();
  const [mensagemErroCep, setMensagemErroCep] = useState<string>();

  const limpaError = () => {
    setErrorLogin(false);
    setMensagemErroLogin("");
    setErrorSenha(false);
    setMensagemErroSenha("");

    setErrorNomeCompleto(false);
    setMensagemErroNomeCompleto("");
    setErrorDataNascimento(false);
    setMensagemErroDataNascimento("");
    setErrorEmail(false);
    setMensagemErroEmail("");
    setErrorTelefone(false);
    setMensagemErroTelefone("");

    setErrorApelido(false);
    setMensagemErroApelido("");
    setErrorBairro(false);
    setMensagemErroBairro("");
    setErrorNumero(false);
    setMensagemErroNumero("");
    setErrorLogradouro(false);
    setMensagemErroLogradouro("");
    setErrorCep(false);
    setMensagemErroCep("");
  }

  const validaEndereco = (): boolean => {
    let hasError = false;

    if (!apelido) {
      setErrorApelido(true);
      setMensagemErroApelido("Campo obrigatório");
      hasError = true;
    }
    if (!bairro) {
      setErrorBairro(true);
      setMensagemErroBairro("Campo obrigatório");
      hasError = true;
    }
    if (!numero) {
      setErrorNumero(true);
      setMensagemErroNumero("Campo obrigatório");
      hasError = true;
    }
    if (!logradouro) {
      setErrorLogradouro(true);
      setMensagemErroLogradouro("Campo obrigatório");
      hasError = true;
    }
    if (!cep) {
      setErrorCep(true);
      setMensagemErroCep("Campo obrigatório");
      hasError = true;
    }

    return hasError;
  }

  const mostraErrorResponse = (listaMensagens: string[]) => {

    for (const mensagem of listaMensagens) {
      if (mensagem.includes("Apelido")) {
        setErrorApelido(true);
        setMensagemErroApelido(mensagem);
        continue;
      }
      if (mensagem.includes("Bairro")) {
        setErrorBairro(true);
        setMensagemErroBairro(mensagem);
        continue;
      }
      if (mensagem.includes("Número")) {
        setErrorNumero(true);
        setMensagemErroNumero(mensagem);
        continue;
      }
      if (mensagem.includes("Logradouro")) {
        setErrorLogradouro(true);
        setMensagemErroLogradouro(mensagem);
        continue;
      }
      if (mensagem.includes("CEP")) {
        setErrorCep(true);
        setMensagemErroCep(mensagem);
      }
    }
  }

  const salvaUsuario = async () => {
    limpaError();
    if (validaEndereco()) return;

    const endereco: IEnderecoCadastro = {
      apelido,
      bairro,
      numero,
      cep,
      logradouro,
      complemento,
    }


    const cliente: IClienteCadastro = {
      nome,
      dataNascimento,
      email,
      telefone
    }

    const usuario: IUsuarioCadastro = {
      endereco: endereco,
      cliente: cliente,
      login,
      senha,
    }



    const response = await apiPost("/usuario/cadastro", usuario);

    if (response.status === STATUS_CODE.OK) {
      const usuario: IUsuarioStore = {
        id: response.data.id,
        login: response.data.nome,
        token: response.data.token
      }

      adicionaUsuarioSessao(usuario);
      window.location.href = "/home";
    }

    if (response.status === STATUS_CODE.FORBIDDEN) {//redireciona para o login
      window.location.href = "/usuario/login?msgModal=true";
      return;
    }

    if (response.status === STATUS_CODE.INTERNAL_SERVER_ERROR) {
      setEstadoModal(true);
      setMensagemModal(["Erro Inesperado!"]);
      setCorModal("error");
    }

    if (response.status === STATUS_CODE.BAD_REQUEST) {
      mostraErrorResponse(response.messages);
    }
  }

  return <>
    <div className="container-cadastro-page">
      <header className="header-cadastro">
        <a href="/home"><img src="/logo-login.svg" alt="" /></a>
      </header>
      <main>
        <h3>Informações - Usuário</h3>
        <div className="login-cadastro">
          <TextField
            fullWidth
            value={login}
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
            label="Login"
            variant="standard"
          />
        </div>
        <div className="cadastro-senha">
          <TextField
            fullWidth
            value={senha}
            type="password"
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
          />
        </div>
        <h3>Informações - Cliente</h3>
        <div className="login-cadastro">
          <TextField
            fullWidth
            value={nome}
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
                setNome(e.target.value);
              }
            }}
            label="Nome completo"
            variant="standard"
          />
        </div>
        <div className="login-cadastro">
          <TextField
            fullWidth
            type="date"
            value={dataNascimento}
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
                setDataNascimento(e.target.value);
              }
            }}
            label="Data de nascimento"
            variant="standard"
          />
        </div>
        <div className="login-cadastro">
          <TextField
            fullWidth
            type="email"
            value={email}
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
                setEmail(e.target.value);
              }
            }}
            label="E-mail"
            variant="standard"
          />
        </div>
        <div className="login-cadastro">
          <TextField
            fullWidth
            type="number"
            value={telefone}
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
                setTelefone(e.target.value);
              }
            }}
            label="Telefone"
            variant="standard"
          />
        </div>
        <h3>Informações - Endereço</h3>
        <div className="login-cadastro">
          <TextField
            fullWidth
            value={apelido}
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
                setApelido(e.target.value);
              }
            }}
            label="Apelido"
            variant="standard"
          />
        </div>
        <div className="login-cadastro">
          <TextField
            fullWidth
            value={logradouro}
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
                setLogradouro(e.target.value);
              }
            }}
            label="Logradouro"
            variant="standard"
          />
        </div>
        <div className="login-cadastro">
          <TextField
            fullWidth
            value={cep}
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
                setCep(e.target.value);
              }
            }}
            label="CEP"
            variant="standard"
          />
        </div>
        <div className="login-cadastro">
          <TextField
            fullWidth
            value={bairro}
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
                setBairro(e.target.value);
              }
            }}
            label="Bairro"
            variant="standard"
          />
        </div>
        <div className="login-cadastro">
          <TextField
            fullWidth
            value={numero}
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
                setNumero(e.target.value);
              }
            }}
            label="Número"
            variant="standard"
          />
        </div>
        <div className="login-cadastro">
          <TextField
            fullWidth
            value={complemento}
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
                setComplemento(e.target.value);
              }
            }}
            label="Complemento"
            variant="standard"
          />
        </div>


        <div className="cadastro-buttons">
          <Button
            sx={{
              backgroundColor: '#850d85',
              color: 'white',
              '&:hover': {
                backgroundColor: '#8d288d',
              }
            }}
            variant="contained"
          onClick={salvaUsuario}
          >
            Cadastrar
          </Button>
        </div>
      </main>
    </div>
  </>
}

export default Usuario;