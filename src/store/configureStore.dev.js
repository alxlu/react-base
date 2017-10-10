import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import DevTools from '../containers/DevTools';
import createReducer from '../reducers';
import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
  return matches && matches.length > 0 ? matches[1] : null;
}

const createEnhancer = browserHistory =>
  compose(
    applyMiddleware(routerMiddleware(browserHistory), sagaMiddleware),
    DevTools.instrument(),
    persistState(getDebugSessionKey()),
  );

export default function configureStore(initialState, browserHistory) {
  const store = createStore(createReducer(), initialState, createEnhancer(browserHistory));
  sagaMiddleware.run(sagas);
  if (module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers')));
  }

  return store;
}
