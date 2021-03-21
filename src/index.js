import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './index.css';
import Header from './pages/main_page/Header';

import Login from './pages/login/Login';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
        <Switch>
          <Route path="/login" component={Login}/>
        </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);