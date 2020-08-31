
import React from 'react';
import Login from '../screens/login';
import { Route, Redirect, Switch } from 'react-router-dom';

export default () => (
    <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route exact path="/login" component={Login} />
        <Route exact path="*" render={() => <Redirect to="/" />} />
    </Switch>
);