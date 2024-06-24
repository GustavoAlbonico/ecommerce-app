import "./index.css"
import { FC, useEffect, useState } from "react"
import Aside from "../../components/Aside"
import HeaderContainer from "../../components/HeaderContainer"
import ContentGroup from "../../components/ContentGroup"
import { ICliente, IEndereco } from "./types"
import { STATUS_CODE, apiGet } from "../../api/RestClient"
import { buscaUsuarioSessao } from "../../store/UsuarioStore/usuarioStore"
import { hexToRgb } from "@mui/material"

const MinhaConta: FC = () => {
    const [cliente, setCliente] = useState<ICliente>();
    const [usuarioSessaoNome, setUsuarioSessaoNome] = useState<string>("Usuário");

    const carregarCliente = async () => {

        const usuarioSessao = buscaUsuarioSessao();
        
        if(usuarioSessao.login){

            setUsuarioSessaoNome(usuarioSessao.login);

            const response = await apiGet(`cliente/carregar/usuario/${usuarioSessao.id}`);
    
            if (response.status === STATUS_CODE.OK) {
                setCliente(response.data[0]);
            }
        }
    }

    useEffect(() => {
        carregarCliente();
    }, []);

    return <>
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
                                    rota="editar"
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
                                    rota="endereco/adicionar"
                                />
                                {cliente.enderecos.map((endereco: IEndereco) => {
                                    return <>
                                        <div className="minha-conta-endereco-content">
                                            <div className="minha-conta-endereco-card">
                                                <HeaderContainer
                                                    titulo={endereco.apelido}
                                                    nomeBotao="Editar"
                                                    rota="endereco/editar"
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
                                        </div>
                                    </>
                                })}
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