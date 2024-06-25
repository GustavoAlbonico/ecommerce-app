import { FC } from "react";
import HeaderFinalizaCompra from "../../components/HeaderFinalizaCompra";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import ContentGroup from "../../components/ContentGroup";
import HeaderContainer from "../../components/HeaderContainer";

const FinalizaCompraEndereco: FC = () => {

    return <>
        <div className="container-finaliza-compra">
            <HeaderFinalizaCompra etapa={1} />
            <div className="content-finaliza-endereco">
                <div className="minha-conta-endereco-content">
                    {/* {cliente.enderecos.map((endereco: IEndereco) => {
                        return <> */}
                            <div className="minha-conta-endereco-card">
                                <HeaderContainer
                                    titulo={"endereco.apelido"}
                                    nomeBotao=""
                                    rota={`/usuario/endereco/editar?idCliente=${"cliente.id"}&idEndereco=${"endereco.id"}`}
                                />
                                <div className="minha-conta-endereco-card-content">
                                    <ContentGroup
                                        titulo="Bairro"
                                        descricao={"endereco.bairro"}
                                    />
                                    <ContentGroup
                                        titulo="Número"
                                        descricao={"endereco.numero"}
                                    />
                                    <ContentGroup
                                        titulo="Cep"
                                        descricao={"endereco.cep"}
                                    />
                                    <ContentGroup
                                        titulo="Logradouro"
                                        descricao={"endereco.logradouro"}
                                    />
                                    <ContentGroup
                                        titulo="Complemento"
                                        descricao={"endereco.complemento"}
                                    />
                                </div>
                            </div>
                        {/* </>
                    })} */}
                </div>
            </div>
        </div>
    </>
}

export default FinalizaCompraEndereco;