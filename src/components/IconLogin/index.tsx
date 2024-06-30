import {PersonOutline } from "@mui/icons-material";
import { FC, useEffect, useState } from "react";
import "./index.css"
import { Popover } from "@mui/material";
import { IUsuarioStore } from "../../store/UsuarioStore/types";
import { buscaUsuarioSessao } from "../../store/UsuarioStore/usuarioStore";
import SimpleLogin from "../SimpleLogin";
import { toZonedTime } from "date-fns-tz";
import SimpleMinhaConta from "../SimpleMinhaConta";
import PersonIcon from '@mui/icons-material/Person';

const IconeLogin: FC = () => {
    const [openPopover, setOpenpopover] = useState<boolean>(false);
    const [ancoraPopover, setAncoraPopover] = useState<HTMLDivElement | null>(null);
    const [usuarioSessao,setUsuarioSessao] = useState<IUsuarioStore>(buscaUsuarioSessao());
    const [periodo,setPeriodo] = useState<string>();

    const onClickLogin = (evento: React.MouseEvent<HTMLDivElement>) => {
        setOpenpopover((openPopover) => !openPopover);
        setAncoraPopover(evento.currentTarget);
    }

    const onClosePopover = () => {
        setOpenpopover(false);
    }

    const buscaPeriodoAtual = () => {
        const zona = 'America/Sao_Paulo';
        const dataAtualHoje = new Date();
        const dataZona = toZonedTime(dataAtualHoje, zona);
        
        const horaAtual = dataZona.getHours();

        if(horaAtual >= 0 && horaAtual <= 5){
            setPeriodo("Boa Noite");
        }else if(horaAtual > 5 && horaAtual <= 12){
            setPeriodo("Bom Dia");
        } else if(horaAtual > 12 && horaAtual <= 17){
            setPeriodo("Boa Tarde");
        } else if(horaAtual > 17 && horaAtual < 24){
            setPeriodo("Boa Noite");
        }

        console.log(horaAtual)
    }

    useEffect(() => {
        buscaPeriodoAtual();
    },[])

    return <>
        <div className="container-login" onClick={onClickLogin}>
            <div className="div-logo">
                <PersonIcon sx={{fontSize: 38, color:"#803EA0"}}/>
            </div>
            <div className="div-usuario">
                <div className="texto-login">Olá, {usuarioSessao?.login ? usuarioSessao.login : "Visitante"}</div>
                <div className="texto-login"> {usuarioSessao?.login ? periodo : "Entre ou cadastre-se"}</div>
            </div>
        </div>
        {
        usuarioSessao?.login 
        ? <>
        <Popover
            open={openPopover}
            onClose={onClosePopover}
            anchorEl={ancoraPopover}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
            }}
            >
            <SimpleMinhaConta/>
            </Popover>
        
        </> : <>
            <Popover
            open={openPopover}
            onClose={onClosePopover}
            anchorEl={ancoraPopover}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
            }}
            >
            <SimpleLogin 
             onClose={onClosePopover}
             onLogin={(usuario:IUsuarioStore) => {
                setUsuarioSessao(usuario);
                onClosePopover();
            }}/>
            </Popover>
        </>
        }
        
    </>
}

export default IconeLogin;