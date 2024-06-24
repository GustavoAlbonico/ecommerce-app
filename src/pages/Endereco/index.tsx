import { FC } from "react";
import Aside from "../../components/Aside";

const Endereco: FC = () => {
 
    return <>
    <div className="container-endereco">
            <Aside usuarioNome="Admin" />
            <main className="minha-conta-main">
                <div className="titulo-detalhes-conta">
                    <h2>Suas Informações &#707; Endereço &#707; Adicionar</h2>
                </div>
            </main>
    </div>
    </>
}

export default Endereco;
