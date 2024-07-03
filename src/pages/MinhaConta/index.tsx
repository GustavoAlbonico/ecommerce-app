import "./index.css"
import { FC, useEffect, useState } from "react"
import Aside from "../../components/Aside"
import HeaderContainer from "../../components/HeaderContainer"
import ContentGroup from "../../components/ContentGroup"
import { ICliente, IEndereco } from "./types"
import { STATUS_CODE, apiDelete, apiGet } from "../../api/RestClient"
import { buscaUsuarioSessao, removerUsuario } from "../../store/UsuarioStore/usuarioStore"
import MensagemModal from "../../components/MensagemModal"
import { AlertColor } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import CloseIcon from '@mui/icons-material/Close';

const MinhaConta: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const [cliente, setCliente] = useState<ICliente>();
    const [usuarioSessaoNome, setUsuarioSessaoNome] = useState<string>("Usuário");
    const [estadoModal, setEstadoModal] = useState<boolean>(false);
    const [mensagemModal, setMensagemModal] = useState<string[]>([]);
    const [corModal, setCorModal] = useState<AlertColor>("success");


    const removerEndereco = async (idEndereco:number) => {

        const response = await apiDelete(`endereco/deletar/${idEndereco}`);

        if (response.status === STATUS_CODE.OK) {
            setEstadoModal(true);
            setMensagemModal(["Endereço removido com sucesso!"]);
            setCorModal("success");

            carregarCliente();
            return;
        }

        if (response.status === STATUS_CODE.FORBIDDEN) {//redireciona para o login
            removerUsuario();
            window.location.href = "/usuario/login?msgModal=true";
            return;
        }

        setEstadoModal(true);
        setMensagemModal(["Erro inesperado!"]);
        setCorModal("error");
        return;
    }

    const carregarCliente = async () => {

        const usuarioSessao = buscaUsuarioSessao();

        if (usuarioSessao.login) {

            setUsuarioSessaoNome(usuarioSessao.login);

            const response = await apiGet(`cliente/carregar/usuario/${usuarioSessao.id}`);

            if (response.status === STATUS_CODE.OK) {
                setCliente(response.data);
                return;
            }

            if (response.status === STATUS_CODE.FORBIDDEN) {//redireciona para o login
                removerUsuario();
                window.location.href = "/usuario/login?msgModal=true";
                return;
            }

            setEstadoModal(true);
            setMensagemModal(["Erro inesperado!"]);
            setCorModal("error");
            return;
        }

        window.location.href = "/usuario/login?msgModal=true";
    }

    const showMensagemModal = () => {
        if(state){
            setEstadoModal(state.estadoModal);
            setMensagemModal([state.msgModal]);

            if(state.endereco){
                setTimeout(() => {
                    window.scrollTo({ top: 1440, behavior: 'smooth' });
                  },100)
            }

            navigate(location.pathname, { replace: true, state: null });
        }
    }

    useEffect(() => {
        carregarCliente();
        showMensagemModal();
    }, []);

    return <>
        <MensagemModal
            estadoInicial={estadoModal}
            corModal={corModal}
            mensagem={mensagemModal}
            onClose={() => {
                setEstadoModal(false);
            }}
        />
        <div className="container-minha-conta">
            <Aside usuarioNome={usuarioSessaoNome} />
            <main className="minha-conta-main">
                <div className="titulo-detalhes-conta">
                    <h2>Suas Informações</h2>
                </div>
                {
                    cliente
                        ?
                        <>
                            <div className="minha-conta-perfil">
                                <HeaderContainer
                                    titulo="Informações do perfil"
                                    nomeBotao="Editar Informações do perfil"
                                    rota={`editar?idCliente=${cliente.id}`}
                                />
                                <ContentGroup
                                    titulo="Data de Nascimento"
                                    descricao={cliente.dataNascimento}
                                />
                                <ContentGroup
                                    titulo="E-mail"
                                    descricao={cliente.email}
                                />
                                <ContentGroup
                                    titulo="Telefone"
                                    descricao={cliente.telefone}
                                />
                            </div>
                            <div className="minha-conta-endereco-header">
                                <HeaderContainer
                                    titulo="Endereços"
                                    nomeBotao="Adicionar"
                                    rota={`/usuario/endereco/adicionar?idCliente=${cliente.id}`}
                                />
                                <div className="minha-conta-endereco-content">
                                    {cliente.enderecos.map((endereco: IEndereco) => {
                                        return <>
                                            <div className="minha-conta-endereco-card">
                                                <div className="minha-conta-endereco-remove"></div>
                                                <div 
                                                title="Double click para excluir"
                                                    onDoubleClick={async () => {
                                                       await removerEndereco(endereco.id);
                                                    }}
                                                >
                                                    <CloseIcon
                                                        sx={{
                                                            fontSize: "0.8rem",
                                                            position:"absolute",
                                                            right:"2px",
                                                            top:"2px", 
                                                            color:"#bf0000",
                                                            cursor:"pointer",
                                                            }}
                                                        />
                                                </div>
                                                <HeaderContainer
                                                    titulo={endereco.apelido}
                                                    nomeBotao="Editar"
                                                    rota={`/usuario/endereco/editar?idCliente=${cliente.id}&idEndereco=${endereco.id}`}
                                                />
                                                <div className="minha-conta-endereco-card-content">
                                                    <ContentGroup
                                                        titulo="Bairro"
                                                        descricao={endereco.bairro}
                                                    />
                                                    <ContentGroup
                                                        titulo="Número"
                                                        descricao={endereco.numero}
                                                    />
                                                    <ContentGroup
                                                        titulo="Cep"
                                                        descricao={endereco.cep}
                                                    />
                                                    <ContentGroup
                                                        titulo="Logradouro"
                                                        descricao={endereco.logradouro}
                                                    />
                                                    <ContentGroup
                                                        titulo="Complemento"
                                                        descricao={endereco.complemento}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    })}
                                </div>
                            </div>
                        </>
                        :
                        <>
                        </>
                }
            </main>
        </div>
    </>
}

export default MinhaConta;