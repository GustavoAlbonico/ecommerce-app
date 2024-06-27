import { FC, useEffect, useRef, useState } from "react";
import "./index.css";
import ReactToPrint from "react-to-print";
import BoletoImprimir from "../BoletoImprimir";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import DownloadIcon from '@mui/icons-material/Download';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@mui/material";

interface BoletoProperties {
    mostraModal: boolean,
    valorTotal: string,
}

const Boleto: FC<BoletoProperties> = ({
    mostraModal,
    valorTotal,
}) => {
    const [open, setOpen] = useState<boolean>(true);
    const componentRef = useRef<HTMLDivElement>(null);

    const mudaModal = () => (mostraModal ? setOpen(true) : setOpen(false));

    const geraPDF = async () => {
        if (componentRef.current) {
            const canvas = await html2canvas(componentRef.current);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 5, 5, pdfWidth - 10, pdfHeight);
            pdf.save('boleto.pdf');
        }
    };

    useEffect(() => {
        mudaModal();
    }, [mostraModal])

    return <>
        {
            open
            &&
            <>
                <div className="container-boleto">
                    <div className="container-boleto-buttons">
                        <Button onClick={geraPDF} variant="contained" sx={{width: "142px"}} startIcon={<DownloadIcon />}>Download</Button>
                        <ReactToPrint
                            trigger={() => <Button variant="contained" sx={{width: "142px"}} startIcon={<LocalPrintshopIcon />}>Imprimir</Button>}
                            content={() => componentRef.current}
                        />
                    </div>
                    <BoletoImprimir valorTotal={valorTotal} ref={componentRef} />
                    <p>Caso o pagamento não seja efetuado o pedido ira ser cancelado automaticamente.</p>
                </div>
            </>
        }
    </>
}

export default Boleto;