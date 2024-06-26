export interface IPedido {
    id:number,
    valorTotal:number,
    formaPagamento: string,
    status:string,
    deleteAt:string,
    enderecoApelido:string,
    clienteNome:string,
    listaPedidoItem: IPedidoItem[]
}

export interface IPedidoItem {
    id:number,
    valorUnitario:number,
    quantidade:number,
    valorTotal:number,
    produto: IProdutoPedido
}

export interface IProdutoPedido {
    nome:string,
    descricao:string,
    imagem:string,
}