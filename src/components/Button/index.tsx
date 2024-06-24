import { FC } from "react";
import "./index.css";

interface ButtonProperties {
    nome:string,
    funcao:() => void;
}
const Button: FC<ButtonProperties> = ({
    nome,
    funcao
}) => {
    return <>
        <button className="btn-component" onClick={funcao}>{nome}</button>
    </>
}

export default Button;