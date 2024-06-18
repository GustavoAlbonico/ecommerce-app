import { Axios } from "axios"
import { buscaUsuarioSessao } from "../store/UsuarioStore/usuarioStore";

const api = new Axios({ baseURL: "http://localhost:8080" });

export interface IDataResponse {
    status: number;
    data?: any;
    messages: string[]
}

export interface AxiosResponse {
    data: any;
    status: number,
    statusText: string,
    headers: any,
    request?: any;
}

export enum STATUS_CODE {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    INTERNAL_SERVER_ERROR = 500,
    FORBIDDEN = 403,
}

const DEFAULT_ERROR_MESSAGE = "Erro não mapeado";
const FORBIDDEN_ERROR_MESSAGE = "Não possui acesso";
const NO_CONTENT_ERROR_MESSAGE = "Nenhum conteúdo retornado";
const SUCCESS_MESSAGE = "OK";

export const apiGet = async (url: string): Promise<IDataResponse> => {

    const usuarioSessao = buscaUsuarioSessao();

    try {
        const response: AxiosResponse = await api.get(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${usuarioSessao?.token ?? ""}`
            }
        });
         
        if (response === undefined) {
            return {
                status: STATUS_CODE.INTERNAL_SERVER_ERROR,
                messages: [DEFAULT_ERROR_MESSAGE],
            }
        }

        if (response.status === STATUS_CODE.NO_CONTENT) {
            return {
                status: response.status,
                messages: [NO_CONTENT_ERROR_MESSAGE]
            }
        }

        if (response.status === STATUS_CODE.BAD_REQUEST) {
            return {
                status: response.status,
                messages: JSON.parse(response.data).messages
            }
        }

        if (response.status === STATUS_CODE.FORBIDDEN) {
            return {
                status: response.status,
                messages: [FORBIDDEN_ERROR_MESSAGE]
            }
        }

        if (response.status === STATUS_CODE.INTERNAL_SERVER_ERROR) {
            return {
                status: response.status,
                messages: JSON.parse(response.data).messages
            }
        }

        return {
            status: response.status,
            messages: [SUCCESS_MESSAGE],
            data: JSON.parse(response.data),
        }

    } catch (e) {
        return {
            status: STATUS_CODE.INTERNAL_SERVER_ERROR,
            messages: [DEFAULT_ERROR_MESSAGE]
        }
    }
}

export const apiPost = async (url: string, data: any): Promise<IDataResponse> => {

    const usuarioSessao = buscaUsuarioSessao();

    try {
        const response: AxiosResponse = await api.post(url, JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${usuarioSessao?.token ?? ""}`
            }
        });

        if (response === undefined) {
            return {
                status: STATUS_CODE.INTERNAL_SERVER_ERROR,
                messages: [DEFAULT_ERROR_MESSAGE],
            }
        }

        if (response.status === STATUS_CODE.NO_CONTENT) {
            return {
                status: response.status,
                messages: [NO_CONTENT_ERROR_MESSAGE]
            }
        }

        if (response.status === STATUS_CODE.BAD_REQUEST) {
            return {
                status: response.status,
                messages: JSON.parse(response.data).messages
            }
        }

        if (response.status === STATUS_CODE.FORBIDDEN) {
            return {
                status: response.status,
                messages: [FORBIDDEN_ERROR_MESSAGE]
            }
        }

        if (response.status === STATUS_CODE.INTERNAL_SERVER_ERROR) {
            return {
                status: response.status,
                messages: JSON.parse(response.data).messages
            }
        }

        return {
            status: response.status,
            messages: [SUCCESS_MESSAGE],
            data: JSON.parse(response.data),
        }

    } catch (e) {
        return {
            status: STATUS_CODE.INTERNAL_SERVER_ERROR,
            messages: [DEFAULT_ERROR_MESSAGE]
        }
    }
}

export const apiPut = async (url: string, data: any): Promise<IDataResponse> => {

    const usuarioSessao = buscaUsuarioSessao();

    try {
        const response: AxiosResponse = await api.put(url, JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${usuarioSessao?.token ?? ""}`
            }
        });

        if (response === undefined) {
            return {
                status: STATUS_CODE.INTERNAL_SERVER_ERROR,
                messages: [DEFAULT_ERROR_MESSAGE],
            }
        }

        if (response.status === STATUS_CODE.NO_CONTENT) {
            return {
                status: response.status,
                messages: [NO_CONTENT_ERROR_MESSAGE]
            }
        }

        if (response.status === STATUS_CODE.BAD_REQUEST) {
            return {
                status: response.status,
                messages: JSON.parse(response.data).messages
            }
        }

        if (response.status === STATUS_CODE.FORBIDDEN) {
            return {
                status: response.status,
                messages: [FORBIDDEN_ERROR_MESSAGE]
            }
        }

        if (response.status === STATUS_CODE.INTERNAL_SERVER_ERROR) {
            return {
                status: response.status,
                messages: JSON.parse(response.data).messages
            }
        }

        return {
            status: response.status,
            messages: [SUCCESS_MESSAGE],
            data: JSON.parse(response.data),
        }

    } catch (e) {
        return {
            status: STATUS_CODE.INTERNAL_SERVER_ERROR,
            messages: [DEFAULT_ERROR_MESSAGE]
        }
    }
}

export const apiDelete = async (url: string): Promise<IDataResponse> => {

    const usuarioSessao = buscaUsuarioSessao();

    try {
        const response: AxiosResponse = await api.delete(url,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${usuarioSessao?.token ?? ""}`
            }
        });

        console.log(response);

        if (response === undefined) {
            return {
                status: STATUS_CODE.INTERNAL_SERVER_ERROR,
                messages: [DEFAULT_ERROR_MESSAGE],
            }
        }

        if (response.status === STATUS_CODE.NO_CONTENT) {
            return {
                status: response.status,
                messages: [NO_CONTENT_ERROR_MESSAGE]
            }
        }

        if (response.status === STATUS_CODE.FORBIDDEN) {
            return {
                status: response.status,
                messages: [FORBIDDEN_ERROR_MESSAGE]
            }
        }

        if (response.status === STATUS_CODE.INTERNAL_SERVER_ERROR) {
            return {
                status: response.status,
                messages: JSON.parse(response.data).messages
            }
        }

        return {
            status: response.status,
            messages: [SUCCESS_MESSAGE],
        }

    } catch (e) {
        return {
            status: STATUS_CODE.INTERNAL_SERVER_ERROR,
            messages: [DEFAULT_ERROR_MESSAGE]
        }
    }
}