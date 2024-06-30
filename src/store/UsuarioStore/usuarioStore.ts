import { IUsuarioStore } from "./types";

const USUARIO_STORE = "usuario";

export const buscaUsuarioSessao = ():IUsuarioStore => {

    const usuario:IUsuarioStore = JSON.parse(localStorage.getItem(USUARIO_STORE) || "{}");

    return usuario;
}

export const adicionaUsuarioSessao = (usuario:IUsuarioStore) => {
    localStorage.setItem(USUARIO_STORE,JSON.stringify(usuario));
}

export const removerUsuario = () => (localStorage.removeItem(USUARIO_STORE));