import { isAllowedByRole, isAuthenticated, Role } from 'core/utils/auth';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

type Props = {
    children: React.ReactNode;
    path: string;
    allowedRoutes?: Role[];
    exact?: boolean;
}

const PrivateRoute = ({ children, path, allowedRoutes, exact }: Props) => {

    return (
        <Route            
            path={path}
            exact={exact}
            render={({ location }) => {
                //Verificando se o usuário está autenticado
                if (!isAuthenticated()) {
                    return (
                        <Redirect
                         to={{
                             pathname: "/admin/auth/login",
                             state: { from: location }
                         }}
                        />
                    )
                } else if (isAuthenticated() && !isAllowedByRole(allowedRoutes)) { //Verificando se o usuário está autenticado e tem permissão de acessar aquela rota
                    return (
                        <Redirect to={{ pathname: "/admin/auth/login" }} />
                    )
                }

                return children;
            }
            }
            
        />
    )
}

export default PrivateRoute;