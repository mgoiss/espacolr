import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './core/components/Navbar';
import Client from './pages/Client';
import Schedule from './pages/Schedule';
import Scheduling from './pages/Scheduling';
import User from './pages/User';


const Routes = () => (
    //O BrowserRouter - encapsula e gerencia todas as rotas do sistema
    //Switch - Realiza a decisão que qual rota ele vai redenrizar
    //Route - Define a URL da pagina
    <BrowserRouter> 
        <Navbar />
        <Switch> 
            <Route path="/" exact> 
                <Schedule />
            </Route>
            <Route path="/user"> 
                <User />
            </Route>
            <Route path="/client"> 
                <Client />
            </Route>
            <Route path="/scheduling"> 
                <Scheduling />
            </Route>
        </Switch>
    </BrowserRouter>
);

export default Routes;