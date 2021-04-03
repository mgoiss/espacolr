import Admim from 'pages/Admin';
import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import history from './core/utils/history'
import Public from 'pages/index';


const Routes = () => (
  //O BrowserRouter - encapsula e gerencia todas as rotas do sistema
  //Switch - Realiza a decisão que qual rota ele vai redenrizar
  //Route - Define a URL da pagina
  <Router history={history}>
    <Switch>
      <Route path="/scheduling">
        <Public />
      </Route>
      <Route path="/auth">
        <Public />
      </Route>
      <Redirect from="/" to="/admin" exact />
      <Redirect from="/admin" to="/admin/schedule" exact />
      <Route path="/admin">
        <Admim />
      </Route>
    </Switch>
  </Router>
);

export default Routes;