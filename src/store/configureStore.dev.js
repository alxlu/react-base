import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import { routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';
import DevTools from '../containers/DevTools';
import createReducer from '../reducers';
import rootEpic from '../epics';

const epicMiddleware = createEpicMiddleware(rootEpic);

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
}

const createEnhancer = browserHistory => compose(
  applyMiddleware(routerMiddleware(browserHistory), epicMiddleware),
  DevTools.instrument(),
  persistState(getDebugSessionKey()),
);

export default function configureStore(initialState, browserHistory) {
  const store = createStore(createReducer(), initialState, createEnhancer(browserHistory));
  if (module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers')));
  }

  return store;
}
