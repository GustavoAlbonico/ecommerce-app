import { AlertColor, Button, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import "./index.css"
import { useNavigate, useSearchParams } from "react-router-dom";
import { IUsuarioStore } from "../../store/UsuarioStore/types";
import { IClienteCadastro, IEnderecoCadastro, IUsuarioCadastro } from "./types";
import { STATUS_CODE, apiPost } from "../../api/RestClient";
import { adicionaUsuarioSessao, buscaUsuarioSessao } from "../../store/UsuarioStore/usuarioStore";
import MensagemModal from "../../components/MensagemModal";

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

  const [mensagemErroLogin, setMensagemErroLogin] = useState<string>();
  const [mensagemErroSenha, setMensagemErroSenha] = useState<string>();

  // validações - cliente
  const [errorNome, setErrorNome] = useState<boolean>(false);
  const [errorDataNascimento, setErrorDataNascimento] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<boolean>(false);

  const [mensagemErroNome, setMensagemErroNome] = useState<string>();
  const [mensagemErroDataNascimento, setMensagemErroDataNascimento] = useState<string>();
  const [mensagemErroEmail, setMensagemErroEmail] = useState<string>();

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

    setErrorNome(false);
    setMensagemErroNome("");
    setErrorDataNascimento(false);
    setMensagemErroDataNascimento("");
    setErrorEmail(false);
    setMensagemErroEmail("");

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

  const validaUsuario = (): boolean => {
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

  const validaCliente = (): boolean => {
    let hasError = false;

    if (!nome) {
      setErrorNome(true);
      setMensagemErroNome("Campo obrigatório");
      hasError = true;
    }

    if (!dataNascimento) {
      setErrorDataNascimento(true);
      setMensagemErroDataNascimento("Campo obrigatório");
      hasError = true;
    }

    if (!email) {
      setErrorEmail(true);
      setMensagemErroEmail("Campo obrigatório");
      hasError = true;
    }

    return hasError;
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
      if (mensagem.includes("Login")) {
        setErrorLogin(true);
        setMensagemErroLogin(mensagem);
        continue;
      }
      if (mensagem.includes("Senha")) {
        setErrorSenha(true);
        setMensagemErroSenha(mensagem);
        continue;
      }

      if (mensagem.includes("Nome")) {
        setErrorNome(true);
        setMensagemErroNome(mensagem);
        continue;
      }
      if (mensagem.includes("Data de nascimento")) {
        setErrorDataNascimento(true);
        setMensagemErroDataNascimento(mensagem);
        continue;
      }
      if (mensagem.includes("E-mail")) {
        setErrorEmail(true);
        setMensagemErroEmail(mensagem);
        continue;
      }


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
    if (validaUsuario() && validaCliente() && validaEndereco()) return;

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
    <MensagemModal
      estadoInicial={estadoModal}
      corModal={corModal}
      mensagem={mensagemModal}
      onClose={() => {
        setEstadoModal(false);
      }}
    />
    <div className="container-cadastro-page">
      <header className="header-cadastro">
        <a href="/home"><img src="/logo-login.svg" alt="" /></a>
      </header>
      <main>
        <h3>Informações - Usuário</h3>
        <div className="info-usuario">
          <div className="itens-cadastro">
            <div className="login-cadastro">
              <TextField
                error={errorLogin}
                helperText={mensagemErroLogin}
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
                error={errorSenha}
                helperText={mensagemErroSenha}
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
          </div>
        </div>
        <h3>Informações - Cliente</h3>
        <div className="info-cliente">
          <div className="itens-cadastro">
            <div className="login-cadastro">
              <TextField
                error={errorNome}
                helperText={mensagemErroNome}
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
                error={errorDataNascimento}
                helperText={mensagemErroDataNascimento}
                fullWidth
                type="date"
                // placeholder="dataNascimento"
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
                InputLabelProps={{ shrink: true }}
                variant="standard"
              />
            </div>
          </div>
          <div className="itens-cadastro">
            <div className="login-cadastro">
              <TextField
                error={errorEmail}
                helperText={mensagemErroEmail}
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
          </div>
        </div>
        <h3>Informações - Endereço</h3>
        <div className="info-endereco">
          <div className="itens-cadastro">
            <div className="login-cadastro">
              <TextField
                error={errorApelido}
                helperText={mensagemErroApelido}
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
                error={errorLogradouro}
                helperText={mensagemErroLogradouro}
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
          </div>
          <div className="itens-cadastro">
            <div className="login-cadastro">
              <TextField
                error={errorCep}
                helperText={mensagemErroCep}
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
                error={errorBairro}
                helperText={mensagemErroBairro}
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
          </div>
          <div className="itens-cadastro">
            <div className="login-cadastro">
              <TextField
                error={errorNumero}
                helperText={mensagemErroNumero}
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
          </div>
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