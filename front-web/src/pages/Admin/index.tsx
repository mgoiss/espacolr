import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Footer from 'core/components/Footer';
import Navbar from 'core/components/Navbar';
import Schedule from './Schedule';
import User from './User';
import Client from './Client';
import ScheduleDetails from './Schedule/components/ScheduleDetails';

const Admim = () => (
    <div>
        <Navbar />
        <div className="container-general-base">
            <Switch>
                <Route path="/admin/schedule" exact>
                    <Schedule />
                </Route>
                <Route path="/admin/schedule/:scheduleId">
                    <ScheduleDetails />
                </Route>
                <Route path="/admin/user">
                    <User />
                </Route>
                <Route path="/admin/client">
                    <Client />
                </Route>
            </Switch>
        </div>
        <Footer />
    </div>
);

export default Admim;