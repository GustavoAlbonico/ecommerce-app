export interface IPedidoItemStore {
    valorUnitario: number,
    quantidade: number,
    produtoId: number,
}

export interface IPedidoStore {
    formaPagamento: string,
    enderecoId:number,
    clienteId: number,
    listaPedidoItem: IPedidoItemStore[],
}