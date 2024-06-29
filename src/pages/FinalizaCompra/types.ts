import { STATUS } from "../../components/CardPedido/types";

export interface IPedidoPost {
  formaPagamento:string,
  status:STATUS,
  endereco_id:number,
  cliente_id:number,
  dadosFormaPagamento:IDadosFormaPagamento,
  listaPedidoItem:IPedidoItemPost[],
}

export interface IPedidoItemPost {
    valorUnitario:number,
    quantidade:number,
    produto_id:number,
}

export interface IDadosFormaPagamento {
    numeroCartao?:string,
    nomeTitular?:string,
    codigoSeguranca?:string,
}
