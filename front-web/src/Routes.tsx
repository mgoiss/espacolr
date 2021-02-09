import Admim from 'pages/Admin';
import Auth from 'pages/Auth';
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Scheduling from './pages/Scheduling';


const Routes = () => (
    //O BrowserRouter - encapsula e gerencia todas as rotas do sistema
    //Switch - Realiza a decisão que qual rota ele vai redenrizar
    //Route - Define a URL da pagina
    <BrowserRouter>
        <Switch>
            <Route path="/scheduling">
                <Scheduling />
            </Route>
            <Redirect from="/" to="/admin/auth" exact />
            <Route path="/admin/auth">
                <Auth />
            </Route>
            <Redirect from="/admin" to="/admin/schedule" exact />
            <Route path="/admin">
                <Admim />
            </Route>
        </Switch>
    </BrowserRouter>
);

export default Routes;