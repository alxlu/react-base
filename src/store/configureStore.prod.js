import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import createReducer from '../reducers';
import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const createEnhancer = browserHistory => (
  applyMiddleware(routerMiddleware(browserHistory), sagaMiddleware)
);

export default function configureStore(initialState, browserHistory) {
  const store = createStore(createReducer(), initialState, createEnhancer(browserHistory));
  sagaMiddleware.run(sagas);
  return store;
}
