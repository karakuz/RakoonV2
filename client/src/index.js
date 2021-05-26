import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Main from './pages/main_page/Main';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Main />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();

export default Main;