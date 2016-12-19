import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import App from './containers/App';
import Home from './containers/Home';
import TestPage from './containers/TestPage';

const store = configureStore({}, browserHistory);

const history = syncHistoryWithStore(browserHistory, store);

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="foo" component={TestPage} />
  </Route>
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root'),
);

if (process.env.NODE_ENV !== 'production') {
  const showDevTools = require('./showDevTools').default;
  showDevTools(store);
}
