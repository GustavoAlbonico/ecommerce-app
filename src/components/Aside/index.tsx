import { FC } from "react";
import "./index.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Li from "../Li";

interface AsideProperties {
    usuarioNome:string
}

const Aside: FC<AsideProperties> = ({
    usuarioNome
}) => {
    return <>
        <aside className="container-aside-minha-conta">
            <div className="usuario-sessao">
                <AccountCircleIcon/>
                <h4>{usuarioNome}</h4>
            </div>
            <ul className="list-options-minha-conta">
                <Li titulo="Suas Informações"
                    rota="minhaconta"
                    icon={<PersonIcon/>}
                />
                <Li titulo="Histórico de compras"
                    rota="pedidos"
                    icon={<ShoppingCartIcon/>}
                />
            </ul>
        </aside>
    </>
}

export default Aside;