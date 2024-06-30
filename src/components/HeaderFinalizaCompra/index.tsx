import { FC } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import "./index.css";

interface HeaderFinalizaCompraProperties {
    etapa:number,
}
const HeaderFinalizaCompra: FC<HeaderFinalizaCompraProperties> = ({
    etapa
}) => {

    const steps = [
        'Endereço de destino',
        'Forma de pagamento',
        'Compra Finalizada',
    ];

    return <>
        <header className="finaliza-compra-header">
            <div className="etapas">
                <Box sx={{ width: '100%'}}>
                    <Stepper activeStep={etapa} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            </div>
        </header>
    </>
}

export default HeaderFinalizaCompra;