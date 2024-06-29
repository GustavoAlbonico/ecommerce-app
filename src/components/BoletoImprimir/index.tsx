import React, { useEffect, useState } from "react";
import "./index.css";
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

interface BoletoImprimir {
    valorTotal:string,
}

const BoletoImprimir = React.forwardRef<HTMLDivElement,BoletoImprimir>(({valorTotal}, ref) => {
    const [dataAtual, setDataAtual] = useState<string>();

    const buscaDataAtual = () => {
        const zona = 'America/Sao_Paulo';
        const dataAtualHoje = new Date();
        const dataZona = toZonedTime(dataAtualHoje, zona);
        dataZona.setDate(dataZona.getDate() + 1);
        const dataFormatada = format(dataZona, 'dd/MM/yyyy');

        setDataAtual(dataFormatada);
    }

    useEffect(() =>{
        buscaDataAtual();
    },[dataAtual]);

    return (
        <div ref={ref} className="body-boleto">
            <div className="boleto-imprimir-header">
                <div className="boleto-imprimir-logo">
                    <img src="/favicon.ico" alt="" />
                    <h4>Pandora |0 0 1</h4>
                </div>
                <p>00000.00000.00000.000000 00000.000000 0 000000000000</p>
            </div>
            <div className="container-boleto-imprimir">

                <div className="boleto-imprimir-content">
                    <div className="boleto-imprimir-left">
                        <div>
                            <span>Local Pagamento</span>
                            <p></p>
                        </div>
                        <div>
                            <span>Convenente</span>
                            <p></p>
                        </div>
                        <ul className="list-left">
                            <li>
                                <span>Data Doc.</span>
                                <p></p>
                            </li>
                            <li>
                                <span>Nº Doc.</span>
                                <p></p>
                            </li>
                            <li>
                                <span>Espécie Doc.</span>
                                <p>RC</p>
                            </li>
                            <li>
                                <span>Aceite</span>
                                <p>N</p>
                            </li>
                            <li>
                                <span>Data Proc.</span>
                                <p></p>
                            </li>
                            <li>
                                <span>CPF/CNPJ</span>
                                <p></p>
                            </li>
                            <li>
                                <span>Carteira</span>
                                <p></p>
                            </li>
                            <li>
                                <span>Espécie</span>
                                <p>R$</p>
                            </li>
                            <li>
                                <span>Quantidade</span>
                                <p></p>
                            </li>
                            <li>
                                <span>Valor</span>
                                <p>{valorTotal}</p>
                            </li>
                        </ul>
                        <p></p>
                    </div>
                    <div className="boleto-imprimir-right">
                        <ul className="list-right">
                            <li>
                                <span>Vencimento</span>
                                <p>{dataAtual}</p>
                            </li>
                            <li>
                                <span>Código Convênio</span>
                                <p></p>
                            </li>
                            <li>
                                <span>Nosso Número</span>
                                <p></p>
                            </li>
                            <li>
                                <span>Valor Documento</span>
                                <p></p>
                            </li>
                            <li>
                                <span>&#x28;-&#x29; Desconto</span>
                                <p></p>
                            </li>
                            <li>
                                <span>&#x28;-&#x29; Outras Ded./Abatimento</span>
                                <p></p>
                            </li>
                            <li>
                                <span>&#x28;+&#x29; Mora/Multa/Juros</span>
                                <p></p>
                            </li>
                            <li>
                                <span>&#x28;+&#x29; Outros Acréscimos</span>
                                <p></p>
                            </li>
                            <li>
                                <span>&#x28;=&#x29; Valor Cobrado</span>
                                <p>{valorTotal}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="boleto-imprimir-footer">
                    <span></span>
                    <p></p>
                </div>
            </div>
            <div className="boleto-imprimir-cod">
                <img src="/pagamento/boleto-codigo-pagamento.svg" alt="codigo de barras" />
                <div>
                    <p>_______________Autenticação Mecanica / Ficha de Compensação_______________</p>
                </div>
            </div>
        </div>
    );
});

export default BoletoImprimir;