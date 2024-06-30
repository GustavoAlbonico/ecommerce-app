import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { FC, ReactNode } from "react";
import "./index.css";

interface ConfirmarModalProperties {
    open: boolean,
    titulo: ReactNode,
    mensagem: ReactNode,
    onConfirmar: () => void,
    onCancelar: () => void,
}

const ConfirmarModal: FC<ConfirmarModalProperties> = ({
    open,
    titulo,
    mensagem,
    onConfirmar,
    onCancelar,
}) => {
    return <>
        <Dialog 
            open={open}>
            <DialogTitle>{titulo}</DialogTitle>
            <DialogContent
                    sx={{
                        fontWeight: 'bolder',
                        fontSize: 18,
                    }}>
                     {mensagem}</DialogContent>
            <DialogActions>
                <Button 
                    sx={{
                        backgroundColor: 'white',
                        color: 'purple',
                        border: '1px solid purple',
                        fontWeight: 'bold'
                      }}
                    onClick={onCancelar}>
                        Cancelar
                </Button>
                <Button 
                    sx={{
                        backgroundColor: 'purple',
                        color: 'white',
                        border: '1px solid white',
                        fontWeight: 'bold',
                        '&:hover': {
                          backgroundColor: '#862886',
                          border: '1px solid #862886',
                          fontWeight: 'bold'
                        }
                      }}
                    onClick={onConfirmar}>
                        Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    </>
}

export default ConfirmarModal;