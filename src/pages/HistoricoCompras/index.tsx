import { FC, useState } from "react"
import Aside from "../../components/Aside";
import "./index.css";

const HistoricoCompras: FC = () => {
    const [usuarioSessaoNome, setUsuarioSessaoNome] = useState<string>("Usuário");
    
    return <>
        <div className="container-historico-compras">
                <Aside usuarioNome={usuarioSessaoNome} />
                <main className="historico-compras-main">
                    <div className="titulo-detalhes-historico">
                        <h2>Histórico de Compras</h2>
                    </div>
                </main>
        </div>
    </>
}

export default HistoricoCompras;