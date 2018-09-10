import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import configureStore from './store/configureStore';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router} from 'react-router-dom';
import Routes from './Routes.js'
import App from './containers/App'

const store = configureStore();

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>

), document.getElementById('root'));
