import {AnyAction} from 'redux';
import {put, select, takeLatest} from 'redux-saga/effects';

import {ACTION_TYPES} from '../actions';
import {IRootState} from '../store';

function* addFavourite(action: AnyAction) {
  const rootState: IRootState = yield select();
  if (rootState.preference.favouriteList.indexOf(action.payload) < 1) {
    const newFavouriteList = [
      ...rootState.preference.favouriteList,
      action.payload,
    ];

    yield put({
      type: ACTION_TYPES.USER_PREF.SET_FAVOURITE,
      payload: newFavouriteList,
    });
  }
}

function* delFavourite(action: AnyAction) {
  const rootState: IRootState = yield select();

  const newFavouriteList = [...rootState.preference.favouriteList].filter(
    fav => fav !== action.payload,
  );

  yield put({
    type: ACTION_TYPES.USER_PREF.SET_FAVOURITE,
    payload: newFavouriteList,
  });
}

function* userPrefSaga() {
  yield takeLatest(ACTION_TYPES.USER_PREF.ADD_FAVOURITE, addFavourite);
  yield takeLatest(ACTION_TYPES.USER_PREF.DEL_FAVOURITE, delFavourite);
}

export default userPrefSaga;
