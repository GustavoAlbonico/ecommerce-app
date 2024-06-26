import { FC, useEffect, useState } from "react";

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
                Pix
            </>
        }
    </>
}

export default Pix;