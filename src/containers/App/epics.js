import { delay } from 'rxjs/operator/delay';
import { mapTo } from 'rxjs/operator/mapTo';
import { filter } from 'rxjs/operator/filter';
import { LOCATION_CHANGE } from 'react-router-redux';

const appEpic = (action$, store) => (
  action$::filter(action => action.type === LOCATION_CHANGE)
    ::delay(1000)
    ::mapTo({ type: 'PONG' })
);

export default appEpic;
