/* eslint-env jest */

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { browserHistory } from 'react-router';

import reducer from '../reducers';
import mySaga from '../sagas';
import configureStoreDev from '../store/configureStore.dev';
import configureStoreProd from '../store/configureStore.prod';

describe('redux and redux-saga', () => {
  it('successfully creates the store and runs the sagas', () => {
    const sagaMiddleware = createSagaMiddleware();
    expect(sagaMiddleware).toHaveProperty('run');

    const store = createStore(
      reducer(),
      applyMiddleware(sagaMiddleware),
    );
    expect(store).toHaveProperty('dispatch');
    expect(store).toHaveProperty('getState');

    const res = sagaMiddleware.run(mySaga);
    expect(res).toHaveProperty('name', 'rootSaga');
    const state = store.getState();
    expect(state).toEqual(reducer()());
  });

  it('succesfully runs dev store middlware', () => {
    const initialState = {};
    const store = configureStoreDev(initialState, browserHistory);
    expect(store).toHaveProperty('dispatch');
    expect(store).toHaveProperty('getState');
    const state = store.getState();
    expect(state).toEqual(reducer()());
  });

  it('succesfully runs production store middlware', () => {
    const initialState = {};
    const store = configureStoreProd(initialState, browserHistory);
    expect(store).toHaveProperty('dispatch');
    expect(store).toHaveProperty('getState');
    const state = store.getState();
    expect(state).toEqual(reducer()());
  });
});
