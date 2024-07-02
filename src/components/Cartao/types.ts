export interface ICartao {
    nomeCompleto:string,
    numeroCartao:string,
    codigo:string,
    bandeiraCartao:string,
}

export enum BANDEIRA_CARTAO {
    VISA = "Visa",
    MASTERCARD = "Mastercard",
    HIPERCARD = "Hipercard",
    ELO = "Elo",
    AMERICAN_EXPRESS = "American Express",
}