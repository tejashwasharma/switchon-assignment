
import React from 'react';
import Dashboard from '../screens/dashboard';
import { Route, Switch, Redirect } from 'react-router-dom';
import Pending from '../screens/pending';
import Approved from '../screens/approved';
import Rejected from '../screens/rejected';

export default () => (
    <Switch>
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/pending" component={Pending} />
        <Route exact path="/approved" component={Approved} />
        <Route exact path="/rejected" component={Rejected} />
        <Route exact path="*" render={() => <Redirect to="/" />} />
    </Switch>
);