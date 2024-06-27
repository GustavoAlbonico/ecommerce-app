import { FC, useEffect, useState } from "react";

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
                BOLETO
            </>
        }
    </>
}

export default Boleto;