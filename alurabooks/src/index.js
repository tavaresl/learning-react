import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, IndexRoute } from 'react-router-dom'
import './index.css'
import App from './App';
import Home from './Home'
import AutorBox from './Autor'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/autor" component={ AutorBox } />
          <Route path="/livro" />
        </Switch>
      </App>
    </Router>
  ), document.getElementById('root'));
registerServiceWorker();
