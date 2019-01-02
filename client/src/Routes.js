import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "./components/AsyncComponent";
import AppliedRoute from "./components/AppliedRoute";

import Login from './containers/Login.js'
import ClientTable from './components/ClientTable.js'
import Register from './containers/Register.js'
import App from './containers/App.js'
import Home from './containers/Home.js'
import registerClient from './components/registerClient.js'
import NotFound from './containers/NotFound';

export default ({ childProps }) =>
  <Switch>
    <Route exact path="/" component={Login} props={childProps} />
    <Route path="/App" component={App} props={childProps} />
    <Route path="/Register" component={Register} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>
;
