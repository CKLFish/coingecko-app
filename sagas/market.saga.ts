import {AxiosResponse} from 'axios';
import {call, put, takeLatest} from 'redux-saga/effects';

import ACTION_TYPES from '../actions';
import RequestHelper from '../apis/apis';
import {GlobalMarketResponse} from '../interfaces/response';

function* fetchMarketData() {
  try {
    const {data: marketData}: AxiosResponse<GlobalMarketResponse> = yield call(
      RequestHelper.getGlobalMarket,
    );
    yield put({
      type: ACTION_TYPES.MARKET.FETCH_LIST_SUCCESS,
      payload: {
        ...marketData.data,
        // market_cap_percentage: Object.entries(
        //   marketData.data.market_cap_percentage,
        // ).map(([k, v]) => {
        //   return {
        //     name: k.toUpperCase(),
        //     value: v,
        //   };
        // }),
      },
    });
  } catch (error) {
    yield put({
      type: ACTION_TYPES.MARKET.FETCH_LIST_FAIL,
      payload: error,
    });
  }
}

function* marketSaga() {
  yield takeLatest(ACTION_TYPES.MARKET.FETCH_LIST, fetchMarketData);
}

export default marketSaga;
