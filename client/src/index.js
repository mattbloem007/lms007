import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router} from 'react-router-dom';
import Routes from './Routes.js'


ReactDOM.render((
  <Router>
      <Routes />
  </Router>

), document.getElementById('root'));
