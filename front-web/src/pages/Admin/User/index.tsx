import React from 'react';
import './styles.scss';
import { Route, Switch } from 'react-router-dom';
import List from './List';
import Form from './Form';

const User = () => {
    return (
        <div>
            <Switch>
                <Route path="/admin/user" exact>
                    <List />
                </Route>
                <Route path="/admin/user/:userId">
                    <Form />
                </Route>
            </Switch>
        </div>
    );
}

export default User;