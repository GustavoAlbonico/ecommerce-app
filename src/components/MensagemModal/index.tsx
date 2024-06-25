import { Alert, AlertColor, Snackbar } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { FC } from "react";

interface MensagemModalProperties {
    estadoInicial:boolean,
    corModal: AlertColor,
    mensagem:string[],
    onClose: () => void,

}

const MensagemModal: FC<MensagemModalProperties> = ({
    estadoInicial,
    corModal,
    mensagem,
    onClose,
}) => {

    return <>
        <Snackbar
            open={estadoInicial}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }} 
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

export default MensagemModal;