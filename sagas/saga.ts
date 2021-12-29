import {fork} from 'redux-saga/effects';

import cryptoSaga from './crypto.saga';
import marketSaga from './market.saga';
import preferenceSaga from './preference.saga';
import trendSaga from './trend.saga';

function* rootSaga() {
  yield fork(cryptoSaga);
  yield fork(preferenceSaga);
  yield fork(marketSaga);
  yield fork(trendSaga);
}

export default rootSaga;
