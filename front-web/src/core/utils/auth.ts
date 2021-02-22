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

//metodo para pegar o dados do token salvo no localstorege e converte-lo para objeto
export const getSessionData = () => {
    //As ?? faz um condição e caso a função getItem retorne null, vai ser passado um objeto vazio
    const sessionData = localStorage.getItem('authData') ?? '{}';
    const parsedSessionData = JSON.parse(sessionData);

    //Type cast está falando para a aplicação que o retorno sera do tipo LoginResponse
    return parsedSessionData as LoginResponse;
}