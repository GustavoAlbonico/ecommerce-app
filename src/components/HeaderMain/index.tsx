import { FC, useEffect, useState } from "react";
import Carrinho from "../Carrinho";
import "./index.css";
import IconeLogin from "../IconLogin";

interface HeaderMainProperties {
    disabledCarrinho: boolean,
}

const HeaderMain: FC<HeaderMainProperties> = ({
    disabledCarrinho,
}) => {
    const [disabled, setDisabled] = useState<string>();

    const carrinhoDisabled = () => disabledCarrinho && setDisabled("disabled-carrinho");

    useEffect(() => {
        carrinhoDisabled();
    })

    return <>
        <div className="header-main">
            <a href="/home"><img src="/pandora_title.png" alt="" /></a>
            <div className="options-header">
                <IconeLogin />
                <div className={disabled}>
                    <Carrinho />
                </div>
            </div>
        </div>
    </>
}

export default HeaderMain;