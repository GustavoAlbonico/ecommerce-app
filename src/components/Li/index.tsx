import { SvgIconProps } from "@mui/material";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

interface LiProperties {
    rota:string,
    titulo:string,
    icon:React.ReactElement<SvgIconProps>,
}

const Li: FC<LiProperties> = ({
    rota,
    titulo,
    icon
}) => {
    
    const navigate = useNavigate();

    const redirecionamento = (rota:string) => {
        navigate(`/usuario/${rota}`);
    }

    return <>
        <li onClick={() => {
            redirecionamento(rota);
        }}>
            {icon}
            <span>{titulo}</span>
        </li>
    </>
}

export default Li;