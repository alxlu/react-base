import { fork } from 'redux-saga/effects';
import appSaga from './containers/App/sagas';

function startSagas(...sagas) {
  return function* rootSaga() {
    yield sagas.map(saga => fork(saga));
  };
}

export default startSagas(appSaga);
