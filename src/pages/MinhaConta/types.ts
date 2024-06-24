export interface ICliente {
    id:number,
    nome:string,
    dataNascimento:string,
    email:string,
    telefone:string,
    usuario:IUsuario,
    enderecos:IEndereco[]

}

export interface IUsuario {
    id:number,
    nome: string,
}

export interface IEndereco {
    id:number,
    apelido:string
    bairro:string,
    numero:string,
    cep:string,
    logradouro:string,
    complemento:string,
}