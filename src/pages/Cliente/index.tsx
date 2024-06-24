import { FC, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import Aside from "../../components/Aside";
import "./index.css";
import { TextField } from "@mui/material";
import Button from "../../components/Button";
import { IClienteEdit } from "./types";
import { STATUS_CODE, apiGet } from "../../api/RestClient";
import { buscaUsuarioSessao } from "../../store/UsuarioStore/usuarioStore";

const Cliente: FC = () => {
    const navigate = useNavigate();
    const [usuarioSessaoNome, setUsuarioSessaoNome] = useState<string>("Usuário");
    const [urlParametro, setUrlParametro] = useSearchParams();
    const [cliente, setCliente] = useState<IClienteEdit>();
    const [dataNascimento, setDataNascimento] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [telefone, setTelefone] = useState<string>();

    const buscaClientePorId = async () => {
        const usuarioSessao = buscaUsuarioSessao();
        
        if (usuarioSessao.login) {
            setUsuarioSessaoNome(usuarioSessao.login);

            const response = await apiGet(`/cliente/carregar/${urlParametro.get('idCliente')}`);

            if (response.status === STATUS_CODE.OK) {
                setCliente(response.data);
            }
        }
    }

    const editarCliente = () => {

    }

    const redirecionamento = () => {
        navigate("/usuario/minhaconta");
    }

    useEffect(() => {
        buscaClientePorId();
    },[]);

    return <>
        <div className="container-cliente">
            <Aside usuarioNome={usuarioSessaoNome} />
            <main className="cliente-main">
                <div className="titulo-detalhes-cliente">
                    <h2>Suas Informações &#707;  Informações do Perfil &#707; Editar</h2>
                </div>
                <div className="cliente-form">
                    <TextField
                        fullWidth
                        value={cliente?.dataNascimento}
                        label="Data de Nascimento"
                        type="date"
                        onChange={(event) => {
                            if (event) {
                                setDataNascimento(event.target.value);
                            }
                        }}
                    />
                    <TextField
                        fullWidth
                        value={cliente?.email}
                        label="E-mail"
                        type="mail"
                        onChange={(event) => {
                            if (event) {
                                setEmail(event.target.value);
                            }
                        }}
                    />
                    <TextField
                        fullWidth
                        value={cliente?.telefone}
                        label="Telefone"
                        type="text"
                        onChange={(event) => {
                            if (event) {
                                setTelefone(event.target.value);
                            }
                        }}
                    />
                    <div className="cliente-buttons">
                        <Button
                            nome="Cancelar"
                            funcao={redirecionamento}
                        />
                        <Button
                            nome="Salvar"
                            funcao={editarCliente}
                        />
                    </div>
                </div>
            </main>
        </div>
    </>
}

export default Cliente