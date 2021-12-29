import {AxiosResponse} from 'axios';
import {call, put, takeLatest} from 'redux-saga/effects';

import ACTION_TYPES from '../actions';
import RequestHelper from '../apis/apis';
import {TrendResponse} from '../interfaces/response';

function* fetchTrendData() {
  try {
    const {
      data: {coins},
    }: AxiosResponse<TrendResponse> = yield call(RequestHelper.getTrends);

    yield put({
      type: ACTION_TYPES.TREND.FETCH_LIST_SUCCESS,
      payload: coins,
    });
  } catch (error) {
    yield put({
      type: ACTION_TYPES.TREND.FETCH_LIST_FAIL,
      payload: error,
    });
  }
}

function* trendSaga() {
  yield takeLatest(ACTION_TYPES.TREND.FETCH_LIST, fetchTrendData);
}

export default trendSaga;
