import { FC } from "react";
import "./index.css";

interface HeaderContainerProperties {
    titulo:string,
    nomeBotao:string,
    rota: string
}

const HeaderContainer: FC<HeaderContainerProperties> = ({
    titulo,
    nomeBotao,
    rota,
}) => {
    return <>
        <div className="component-header-container">
            <h3>{titulo}</h3>
            <a href={rota}>{nomeBotao}</a>
        </div>
    </>
}

export default HeaderContainer;