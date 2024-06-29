import { FC, useEffect, useState } from "react";
import "./index.css";

interface PixProperties {
    mostraModal: boolean,
}

const Pix: FC<PixProperties> = ({
    mostraModal,
}) => {
    const [open, setOpen] = useState<boolean>(true);

    const mudaModal = () => (mostraModal ? setOpen(true) : setOpen(false));

    useEffect(() => {
        mudaModal();
    }, [mostraModal])

    return <>
        {
            open
            &&
            <>
                <div className="container-pix">
                    <h3>QR Code</h3>
                    <img src="/pagamento/pix-pagamento.svg" alt="pix imagem" />
                    <div className="pix-info">
                        <span>Tempo de expiração 30 minutos.</span>
                        <p>Caso o pagamento não seja efetuado o pedido ira ser cancelado automaticamente.</p>
                    </div>
                </div>
            </>
        }
    </>
}

export default Pix;