export interface IUsuarioCadastro {
    login:string,
    senha: string,
    cliente: IClienteCadastro,
    endereco: IEnderecoCadastro,
}

export interface IClienteCadastro {
    nome:string,
    dataNascimento: string,
    email: string,
    telefone?: string,
}

export interface IEnderecoCadastro {
    apelido:string
    bairro:string,
    numero:string,
    cep:string,
    logradouro:string,
    complemento?:string,
}