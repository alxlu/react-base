import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default function createReducer() {
  return combineReducers({
    routing: routerReducer,
  });
}
