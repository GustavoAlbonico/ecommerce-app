import { SvgIconProps } from "@mui/material";
import React, { FC } from "react";

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
    const redirecionamento = (rota:string) => {
        window.location.href = `/usuario/${rota}`;
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