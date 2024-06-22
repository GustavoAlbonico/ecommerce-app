import { FC } from "react";
import "./index.css"

interface ContentGroupProperties {
    titulo:string,
    descricao:string,
}

const ContentGroup: FC<ContentGroupProperties> = ({
    titulo,
    descricao,
}) => {
    return <>
        <div className="component-content-group">
            <h4>{titulo}</h4>
            <p title={descricao}>{descricao}</p>
        </div>
    </>
}

export default ContentGroup;