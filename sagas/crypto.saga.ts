// import crypto from '../reducers/crypto';
import {AxiosResponse} from 'axios';
import {AnyAction} from 'redux';
import {call, put, takeLatest} from 'redux-saga/effects';

import ACTION_TYPES from '../actions';
import RequestHelper from '../apis/apis';
import {CoinsResponseData} from '../interfaces/response';

function* fetchCryptoCurrencies(action: AnyAction) {
  try {
    const pageIndex = action.pageIndex ?? 0;
    const {data: coinsData}: AxiosResponse<CoinsResponseData[]> = yield call(
      RequestHelper.getCoinsByPage,
      pageIndex,
    );
    yield put({
      type: ACTION_TYPES.CRYPTO.FETCH_LIST_SUCCESS,
      payload: {
        list: coinsData,
        index: pageIndex,
      },
    });
  } catch (error) {
    yield put({
      type: ACTION_TYPES.CRYPTO.FETCH_LIST_FAIL,
      payload: error,
    });
  }
}

function* cryptoSaga() {
  yield takeLatest(ACTION_TYPES.CRYPTO.FETCH_LIST, fetchCryptoCurrencies);
}

export default cryptoSaga;
