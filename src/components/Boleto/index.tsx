import { FC, useEffect, useState } from "react";
import "./index.css";

interface BoletoProperties {
    mostraModal: boolean,
}

const Boleto: FC<BoletoProperties> = ({
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
                <div className="container-boleto">
                    <button>Imprimir</button>
                    <img src="/pagamento/boleto-pagamento.svg" alt="boleto imagem" />
                </div>
            </>
        }
    </>
}

export default Boleto;