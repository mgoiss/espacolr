import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Footer from './core/components/Footer';
import Navbar from './core/components/Navbar';
import Client from './pages/Client';
import Schedule from './pages/Schedule';
import ScheduleDetails from './pages/Schedule/components/ScheduleDetails';
import Scheduling from './pages/Scheduling';
import User from './pages/User';


const Routes = () => (
    //O BrowserRouter - encapsula e gerencia todas as rotas do sistema
    //Switch - Realiza a decisão que qual rota ele vai redenrizar
    //Route - Define a URL da pagina
    <BrowserRouter> 
        <Navbar />
        <Switch> 
            <Redirect from="/" to="/schedule" exact/>
            <Route path="/schedule" exact> 
                <Schedule />
            </Route>
            <Route path="/schedule/:scheduleId"> 
                <ScheduleDetails />
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
        <Footer />
    </BrowserRouter>
);

export default Routes;