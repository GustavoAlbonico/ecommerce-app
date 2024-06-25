import { FC, useEffect, useState } from "react";
import Aside from "../../components/Aside";
import "./index.css";
import { AlertColor, TextField } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IUsuarioStore } from "../../store/UsuarioStore/types";
import Button from "../../components/Button";
import { buscaUsuarioSessao } from "../../store/UsuarioStore/usuarioStore";
import { STATUS_CODE, apiGet, apiPost, apiPut } from "../../api/RestClient";
import { IEndereco } from "./types";
import MensagemModal from "../../components/MensagemModal";

interface EnderecoProperties {
    acao: string
}

const Endereco: FC<EnderecoProperties> = ({
    acao
}) => {
    const navigate = useNavigate();
    const [usuarioSessao, setUsuarioSessao] = useState<IUsuarioStore>();
    const [urlParametro, setUrlParametro] = useSearchParams();
    const [apelido, setApelido] = useState<string>('');
    const [bairro, setBairro] = useState<string>('');
    const [numero, setNumero] = useState<string>('');
    const [cep, setCep] = useState<string>('');
    const [logradouro, setLogradouro] = useState<string>('');
    const [complemento, setComplemento] = useState<string>('');
    const [estadoModal, setEstadoModal] = useState<boolean>(false);
    const [mensagemModal, setMensagemModal] = useState<string[]>([]);
    const [corModal, setCorModal] = useState<AlertColor>("success");

    const salvaEndereco = async () => {
        const cliente_id = parseInt(urlParametro.get("idCliente") || '0');

        const endereco: IEndereco = {
            apelido,
            bairro,
            numero,
            cep,
            logradouro,
            complemento,
            cliente_id: cliente_id,
        }

        if (acao === "Editar") {
            const response = await apiPut(`/endereco/atualizar/${urlParametro.get("idEndereco")}`, endereco)

            if (response.status === STATUS_CODE.OK) {
                navigate("/usuario/minhaconta",{ state:{
                    estadoModal: true, 
                    msgModal:"Endereço editado com sucesso!"
                    } 
                });
            }

            if(response.status === STATUS_CODE.INTERNAL_SERVER_ERROR){
                 setEstadoModal(true);
                 setMensagemModal(["Erro Inesperado!"]);
                 setCorModal("error");
            }

            if(response.status === STATUS_CODE.BAD_REQUEST){
                setEstadoModal(true);
                 setMensagemModal(response.messages);
                 setCorModal("error");
            }

           
            return;
        }

        const response = await apiPost("/endereco/criar", endereco);

        if (response.status === STATUS_CODE.CREATED) {
            navigate("/usuario/minhaconta",{ state:{
                estadoModal: true, 
                msgModal:"Endereço cadastrado com sucesso!"
                } 
            });
        }

        if(response.status === STATUS_CODE.INTERNAL_SERVER_ERROR){
            setEstadoModal(true);
            setMensagemModal(["Erro Inesperado!"]);
            setCorModal("error");
        }

       if(response.status === STATUS_CODE.BAD_REQUEST){
            setEstadoModal(true);
            setMensagemModal(response.messages);
            setCorModal("warning");
       }

    }

    const buscaEnderecoPorId = async () => {

        const response = await apiGet(`/endereco/carregar/${urlParametro.get('idEndereco')}`);

        if (response.status === STATUS_CODE.OK) {
            setApelido(response.data.apelido);
            setBairro(response.data.bairro);
            setNumero(response.data.numero);
            setCep(response.data.cep);
            setLogradouro(response.data.logradouro);
            setComplemento(response.data.complemento);
        }
    }

    const redirecionamento = () => {
        navigate("/usuario/minhaconta");
    }


    useEffect(() => {
        setUsuarioSessao(buscaUsuarioSessao);

        if (acao === "Editar") {
            buscaEnderecoPorId();
        }
    }, [])

    return <>
        <MensagemModal
            estadoInicial={estadoModal}
            corModal={corModal}
            mensagem={mensagemModal}
            onClose={() => {
                setEstadoModal(false);
            }}
        />
        <div className="container-endereco">
            <Aside usuarioNome={usuarioSessao?.login || "Usuário"} />
            <main className="endereco-main">
                <div className="titulo-detalhes-endereco">
                    <h2>Suas Informações &#707; Endereço &#707; {acao}</h2>
                </div>
                <div className="endereco-form">
                    <TextField
                        fullWidth
                        value={apelido}
                        label="Apelido"
                        type="text"
                        onChange={(event) => {
                            if (event) {
                                setApelido(event.target.value);
                            }
                        }}
                    />
                    <TextField
                        fullWidth
                        value={bairro}
                        label="Bairro"
                        type="text"
                        onChange={(event) => {
                            if (event) {
                                setBairro(event.target.value);
                            }
                        }}
                    />
                    <TextField
                        fullWidth
                        value={numero}
                        label="Número"
                        type="text"
                        onChange={(event) => {
                            if (event) {
                                setNumero(event.target.value);
                            }
                        }}
                    />
                    <TextField
                        fullWidth
                        value={cep}
                        label="Cep"
                        type="text"
                        onChange={(event) => {
                            if (event) {
                                setCep(event.target.value);
                            }
                        }}
                    />
                    <TextField
                        fullWidth
                        value={logradouro}
                        label="Logradouro"
                        type="text"
                        onChange={(event) => {
                            if (event) {
                                setLogradouro(event.target.value);
                            }
                        }}
                    />
                    <TextField
                        fullWidth
                        value={complemento}
                        multiline
                        rows={4}
                        label="Complemento"
                        type="text"
                        onChange={(event) => {
                            if (event) {
                                setComplemento(event.target.value);
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
                            funcao={salvaEndereco}
                        />
                    </div>
                </div>
            </main>
        </div>
    </>
}

export default Endereco;