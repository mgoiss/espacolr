import React from 'react';
import { Route, Switch } from 'react-router';
import ListClient from './List/index';

const Client = () => {
  return (
    <div>
      <Switch>
        <Route path="/admin/client" exact>
          <ListClient />
        </Route>
      </Switch>
    </div>
  );
}

export default Client;