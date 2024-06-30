import { FC, useEffect, useState } from "react";
import ContentGroup from "../ContentGroup";
import HeaderContainer from "../HeaderContainer";
import { IEndereco } from "../../pages/MinhaConta/types";
import { STATUS_CODE, apiGet } from "../../api/RestClient";
import { buscaUsuarioSessao } from "../../store/UsuarioStore/usuarioStore";
import MensagemModal from "../MensagemModal";
import { AlertColor } from "@mui/material";
import "./index.css";
import { useNavigate } from "react-router-dom";

interface FinalizaCompraEnderecoProperties {
    mostraModal: boolean,
    buscaEndereco: (idEndereco:number) => void
    buscaCliente: (idCliente:number) => void
}

const FinalizaCompraEndereco: FC<FinalizaCompraEnderecoProperties> = ({
    mostraModal,
    buscaEndereco,
    buscaCliente
}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const [enderecos, setEnderecos] = useState<IEndereco[]>([]);
    const [estadoModal, setEstadoModal] = useState<boolean>(false);
    const [mensagemModal, setMensagemModal] = useState<string[]>([]);
    const [corModal, setCorModal] = useState<AlertColor>("error");
    const [enderecoIndex, setEnderecoIndex] = useState<number | null>();

    const carregarEnderecos = async () => {

        const usuarioSessao = buscaUsuarioSessao();

        const response = await apiGet(`cliente/carregar/usuario/${usuarioSessao.id}`);

        if (response.status === STATUS_CODE.OK) {
            buscaCliente(response.data.id)
            setEnderecos(response.data.enderecos);
            return;
        }

        if(response.status === STATUS_CODE.FORBIDDEN){//redireciona para o login
            window.location.href = "usuario/login";
            return;
        }

        setEstadoModal(true);
        setMensagemModal(["Erro Inesperado ao buscar endereços!"]);
    }

    const mudaModal = () => (mostraModal ? setOpen(true) : setOpen(false));

    const mudaEnderecoDestaqueIndex = (index:number,idEndereco:number) => {
        setEnderecoIndex(index)
        buscaEndereco(idEndereco);
    };

    useEffect(() => {

        if (mostraModal) {
            carregarEnderecos();
        }

        mudaModal();
    }, [mostraModal]);

    return <>
        {
            open
            && <>
            <MensagemModal
                estadoInicial={estadoModal}
                corModal={corModal}
                mensagem={mensagemModal}
                onClose={() => {
                    setEstadoModal(false);
                }}
            />
            <div className="finaliza-compra-endereco-content">
                {enderecos.map((endereco: IEndereco,index :number) => {
                    return <>
                        <div 
                            className={`finaliza-compra-endereco-card ${enderecoIndex === index ? "endereco-destaque-on" : "endereco-destaque-off"}`} 
                            onClick={() => (mudaEnderecoDestaqueIndex(index,endereco.id))}
                        >
                            <HeaderContainer
                                titulo={endereco.apelido}
                                nomeBotao=""
                                rota=""
                            />
                            <div className="finaliza-compra-endereco-card-content">
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
            </>
        }
    </>
}

export default FinalizaCompraEndereco;