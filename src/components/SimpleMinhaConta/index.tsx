import { FC } from "react";
import "./index.css";
import { removerUsuario } from "../../store/UsuarioStore/usuarioStore";

const SimpleMinhaConta: FC = () => {

    const redirecionamentoMinhaConta = () => window.location.href = "/usuario/minhaconta";

    const redirecionamentoHistoricoCompras = () => window.location.href = "/usuario/pedidos";

    const redirecionamentoSair = () => {
        removerUsuario();
        window.location.href = "/home";
    }

    return <>
        <div className="container-simple-minha-conta">
            <ul>
                <li><span onClick={redirecionamentoMinhaConta}>Minha Conta</span></li>
                <li><span onClick={redirecionamentoHistoricoCompras}>Historico Compras</span></li>
                <li><span onClick={redirecionamentoSair}>Sair</span></li>
            </ul>
        </div>
    </>
}

export default SimpleMinhaConta;