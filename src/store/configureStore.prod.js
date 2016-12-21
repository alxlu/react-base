import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'react-router-redux';
import createReducer from '../reducers';
import rootEpic from '../epics';

const epicMiddleware = createEpicMiddleware(rootEpic);

const createEnhancer = browserHistory => (
  applyMiddleware(routerMiddleware(browserHistory), epicMiddleware)
);

export default function configureStore(initialState, browserHistory) {
  const store = createStore(createReducer(), initialState, createEnhancer(browserHistory));
  return store;
}
