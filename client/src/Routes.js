import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "./components/AsyncComponent";
import AppliedRoute from "./components/AppliedRoute";

import App from './containers/App.js'
import Home from './containers/Home.js'
import registerClient from './components/registerClient.js'
import NotFound from './containers/NotFound';

export default ({ childProps }) =>
  <Switch>
    <Route exact path="/" component={App} props={childProps} />
    <Route path="/createClient" component={registerClient} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>
;
