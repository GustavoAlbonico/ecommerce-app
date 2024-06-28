import { STATUS } from "../../components/CardPedido/types";

export interface IPedidoPost {
  formaPagamento:string,
  status:STATUS,
  endereco_id:number,
  cliente_id:number,
  listaPedidoItem:IPedidoItemPost[],
}

export interface IPedidoItemPost {
    valorUnitario:number,
    quantidade:number,
    produto_id:number,
}

export interface IPixPost {
    valor:number,
    pedido_id:number,
}

export interface ICartaoPost {
    numeroCartao:string,
    nomeTitular:string,
    codigoSeguranca:string,
    valor:number,
    pedido_id:number,
}

export interface IBoletoPost {
    dataVencimento:string,
    valor:number,
    pedido_id:number,
}

export enum FORMA_PAGAMENTO_POST {
    CARTAO = "CARTAO",
    PIX = "PIX",
    BOLETO = "BOLETO",
}
