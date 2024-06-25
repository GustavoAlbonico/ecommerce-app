import { FC, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import Aside from "../../components/Aside";
import "./index.css";
import { TextField } from "@mui/material";
import Button from "../../components/Button";
import { IClienteEdit } from "./types";
import { STATUS_CODE, apiGet, apiPut } from "../../api/RestClient";
import { buscaUsuarioSessao } from "../../store/UsuarioStore/usuarioStore";
import { ICliente } from "../MinhaConta/types";
import { IUsuarioStore } from "../../store/UsuarioStore/types";

const Cliente: FC = () => {
    const navigate = useNavigate();
    const [usuarioSessao, setUsuarioSessao] = useState<IUsuarioStore>();
    const [urlParametro, setUrlParametro] = useSearchParams();
    const [dataNascimento, setDataNascimento] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');
    const [nome, setNome] = useState<string>('');

    const buscaClientePorId = async () => {
        const usuarioSessao = buscaUsuarioSessao();
        
        if (usuarioSessao.login) {
            setUsuarioSessao(usuarioSessao);

            const response = await apiGet(`/cliente/carregar/${urlParametro.get('idCliente')}`);

            if (response.status === STATUS_CODE.OK) {
                setDataNascimento(response.data.dataNascimento);
                setEmail(response.data.email);
                setTelefone(response.data.telefone);
                setNome(response.data.nome);
            }
        }
    }

    const editarCliente = async () => {

        const cliente:IClienteEdit = {
            nome:nome,
            dataNascimento:dataNascimento,
            email:email,
            telefone:telefone,
            usuario_id:usuarioSessao?.id || 0
        }

        const response = await apiPut(`/cliente/atualizar/${urlParametro.get('idCliente')}`, cliente);

        if(response.status === STATUS_CODE.OK){
            alert("perfil editado com sucesso!");
            navigate("/usuario/minhaconta");
        }
    }

    const redirecionamento = () => {
        navigate("/usuario/minhaconta");
    }

    useEffect(() => {
        buscaClientePorId();
    },[]);

    return <>
        <div className="container-cliente">
            <Aside usuarioNome={usuarioSessao?.login || "Usuário"} />
            <main className="cliente-main">
                <div className="titulo-detalhes-cliente">
                    <h2>Suas Informações &#707;  Informações do Perfil &#707; Editar</h2>
                </div>
                <div className="cliente-form">
                    <TextField
                        fullWidth
                        value={dataNascimento}
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
                        value={email}
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
                        value={telefone}
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