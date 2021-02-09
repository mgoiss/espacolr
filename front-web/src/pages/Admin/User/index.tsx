import React from 'react';
import './styles.scss';
import { Route, Switch } from 'react-router-dom';
import List from './List';
import Form from './Form';

const User = () => {
    return( 
        <div>
            <Switch>
                <Route path="/admin/user" exact>
                    <List />
                </Route>
                <Route path="/admin/user/create">
                    <Form />
                </Route>
                <Route path="/admin/user/:userId">
                    <h1>Edição de Usuários</h1>
                </Route>    
            </Switch>
        </div>
    );
}

export default User;