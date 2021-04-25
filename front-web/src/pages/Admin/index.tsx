import React from 'react';
import { Switch } from 'react-router-dom';
import Navbar from 'core/components/Navbar';
import Schedule from './Schedule';
import User from './User';
import Client from './Client';
import ScheduleDetails from './Schedule/components/ScheduleDetails';
import PrivateRoute from 'core/components/Routes/PrivateRouts';

const Admim = () => (
  <div>
    <Navbar />
    <div className="container-general-base">
      <Switch>
        <PrivateRoute path="/admin/schedule" exact>
          <Schedule />
        </PrivateRoute>
        <PrivateRoute path="/admin/schedule/:scheduleId" >
          <ScheduleDetails />
        </PrivateRoute>
        <PrivateRoute path="/admin/user" allowedRoutes={['ROLE_ADMIN']}>
          <User />
        </PrivateRoute>
        <PrivateRoute path="/admin/client" >
          <Client />
        </PrivateRoute>
      </Switch>
    </div>
  </div>
);

export default Admim;