import { type } from "os";

export const CLIENT_ID = 'espacolr';
export const CLIENT_SECRET = 'espacolr123'

type LoginResponse = {
    access_token: string,
    token_type: string,
    expires_in: number,
    scope: string,
    UserId: string,
    UserFirstName: string
}

//Estou convertendo em string o objeto para salvar no localstorege
export const saveSessionData = (loginresponse: LoginResponse) => {
    //o metodo stringify converte para string o objeto mantando o padrão de objetos
    localStorage.setItem("authData", JSON.stringify(loginresponse));
}