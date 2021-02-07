import React from 'react';
import './styles.scss';
import { Route, Switch } from 'react-router-dom';
import List from './List';
import Form from './Form';

const User = () => {
    return( 
        <div className="container-general-base">
            <Switch>
                <Route path="/user" exact>
                    <List />
                </Route>
                <Route path="/user/create">
                    <Form />
                </Route>
                <Route path="/user/:userId">
                    <h1>Edição de Usuários</h1>
                </Route>    
            </Switch>
        </div>
    );
}

export default User;