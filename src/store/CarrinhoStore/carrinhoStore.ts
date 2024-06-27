import { ICarrinhoStore } from "./types";

const CARRINHO_STORE = "carrinho";

export const atualizaItensCarrinhoStore = (item:ICarrinhoStore): ICarrinhoStore[] => {

    const carrinho:ICarrinhoStore[] = buscaItensCarrinho();

    if(carrinho && carrinho.length){
        const index = carrinho.findIndex((c:ICarrinhoStore) => c.id === item.id);

        if(index > -1){
            carrinho[index] = item;
        } else {
            carrinho.push(item);
        }
    } else {
         carrinho.push(item);
    }
    adicionaItemCarrinhoStore(carrinho);

    return carrinho;
}

export const buscaItensCarrinho = (): ICarrinhoStore[] => {
    const carrinho:ICarrinhoStore[] = JSON.parse(localStorage.getItem(CARRINHO_STORE) || "[]");

    return carrinho;
}

const adicionaItemCarrinhoStore = (carrinho:ICarrinhoStore[]) => {
    localStorage.setItem(CARRINHO_STORE, JSON.stringify(carrinho));
}

export const obterQuantidadeCarrinho = (): number => {
    const carrinho: ICarrinhoStore[] = buscaItensCarrinho();

    return carrinho.length;
}

export const removeItemCarrinho = (id:number): ICarrinhoStore[]  => {
    const carrinho = buscaItensCarrinho();

    const index = carrinho.findIndex((item:ICarrinhoStore) => item.id === id);

    if(index > -1){
        carrinho.splice(index, 1);
    }

    adicionaItemCarrinhoStore(carrinho);

    return carrinho;
}

export const limpaCarrinho = () => (localStorage.removeItem(CARRINHO_STORE));