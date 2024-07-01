import { Alert, AlertColor, Snackbar } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { FC } from "react";

interface MensagemModalLoginProperties {
    estadoInicial:boolean,
    corModal: AlertColor,
    mensagem:string[],
    onClose: () => void,

}

const MensagemModalLogin: FC<MensagemModalLoginProperties> = ({
    estadoInicial,
    corModal,
    mensagem,
    onClose,
}) => {
    return <>
        <Snackbar
            open={estadoInicial}
            style={{
                position: 'fixed',
                top: '1vh',
                right: '0.3vw',
                left: 'auto',
                bottom: 'auto',
            }}
            onClose={onClose}
        >
            <Alert 
                iconMapping={{
                    success: <CheckIcon fontSize="inherit" />,
                }} 
                severity={corModal} 
                onClose={onClose}>
                {mensagem.map((mensagem:string) => {
                    return <>
                        {mensagem}.<br />
                    </>
                })}
            </Alert>
        </Snackbar>
    </>
}

export default MensagemModalLogin;