import jwtDecode from 'jwt-decode';

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

export type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

type AccessToken = {
    exp: number;
    user_name: string;
    authorities: Role[];
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

//Decodificando o Token
export const getAccessTokenDecoded = () => {
    const sessionData = getSessionData();
    //DECODIFICANO O TOKEN
    const tokenDecoded = jwtDecode(sessionData.access_token);

    return tokenDecoded as AccessToken;
}

//verificando a expiração do Token
export const isTokenValid = () => {
    const { exp } = getAccessTokenDecoded();

    //Verificando se foi expirado
    //A multiplicação por mil é pq o Date retorna em milesegundos e o exp vem em segundos
    return Date.now() <= exp * 1000;
}

export const isAuthenticated = () => {
    const sessionData = getSessionData();
    //Retornando true ou false, caso ambos sejam verdadeiro será retornado true
    return sessionData.access_token && isTokenValid();
}

//Metodo para verificar se o usuário pode acessar a rota
//Estou definindo o valor padrão com um lista vazia, caso não seja informado um valor
export const isAllowedByRole = (routeRoles: Role[] = []) => {
    //Caso não seja informado uma role significa que qualquer usuário pode acessar
    if (routeRoles.length === 0 ) {
        return true;
    }

    const { authorities } = getAccessTokenDecoded();

    /*Pegando a ROLE que o usuário necessita ter para poder acessar a rota e 
    verificando se o usuário logado a tem*/
    return routeRoles.some(role => authorities.includes(role));
}