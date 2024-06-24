import { FC } from "react";
import "./index.css"

interface ContentGroupProperties {
    titulo:string,
    descricao:string | number,
}

const ContentGroup: FC<ContentGroupProperties> = ({
    titulo,
    descricao,
}) => {
    return <>
        <div className="component-content-group">
            <h4>{titulo}</h4>
            <p title={descricao.toString()}>{descricao}</p>
        </div>
    </>
}

export default ContentGroup;