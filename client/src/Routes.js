import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "./components/AsyncComponent";
import AppliedRoute from "./components/AppliedRoute";

import App from './containers/App.js'
import NotFound from './containers/NotFound';

export default ({ childProps }) =>
  <Switch>
    <Route exact path="/" component={App} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>
;
