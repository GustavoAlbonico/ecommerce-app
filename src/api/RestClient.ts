import { Axios } from "axios"

const api =  new Axios({baseURL: "http://localhost:8080"});

export interface IDataResponse {
    status: number;
    data?: any;
    messages:string[]
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

export const apiGet = async (url: string) : Promise<IDataResponse> => {
    try {
        const response: AxiosResponse = await api.get(url);

        if(response === undefined){
            return {
                status: STATUS_CODE.INTERNAL_SERVER_ERROR,
                messages: ["Erro não mapeado"],
            }
        }

        if(response.status === STATUS_CODE.NO_CONTENT){
            return {
                status:  response.status,
                messages: ["Nenhum conteÚdo retornado"]
            }
        }

        if(response.status === STATUS_CODE.BAD_REQUEST){
            return {
                status:  response.status,
                messages: response.data
            }
        }

        if(response.status === STATUS_CODE.INTERNAL_SERVER_ERROR){
            return {
                status:  response.status,
                messages: response.data.messages
            }
        }

        return {
            status: response.status,
            messages: ["OK"],
            data: JSON.parse(response.data),
        }

    } catch (e) {
        return {
            status: STATUS_CODE.INTERNAL_SERVER_ERROR,
            messages: ["Erro não mapaeado"]
        }
    }
}