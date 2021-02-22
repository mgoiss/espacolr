import Admim from 'pages/Admin';
import Auth from 'pages/Auth';
import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Scheduling from './pages/Scheduling';
import history from './core/utils/history'


const Routes = () => (
    //O BrowserRouter - encapsula e gerencia todas as rotas do sistema
    //Switch - Realiza a decisão que qual rota ele vai redenrizar
    //Route - Define a URL da pagina
    <Router history={history}>
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
    </Router>
);

export default Routes;