import {createReducer} from '@reduxjs/toolkit';

import {ACTIONS} from '../actions';
import {CoinsResponseData} from '../interfaces/response';

export type CryptoState = {
  coinsDict: {
    [key: number]: CoinsResponseData[];
  };
  filteredCoinsList: CoinsResponseData[];
  pageIndex: number;
  loading: boolean;
  error?: any;
};

const cryptoReducer = createReducer<CryptoState>(
  {
    pageIndex: 1,
    coinsDict: {1: []},
    filteredCoinsList: [],
    loading: false,
    error: undefined,
  },
  builder => {
    builder.addCase(ACTIONS.CRYPTO.FETCH_LIST, state => {
      state.loading = true;
    });
    builder.addCase(ACTIONS.CRYPTO.FETCH_LIST_SUCCESS, (state, action) => {
      state.coinsDict = {
        ...state.coinsDict,
        [action.payload.index]: action.payload.list,
      };
      state.pageIndex = action.payload.index;
      state.loading = false;
    });
    builder.addCase(ACTIONS.CRYPTO.FETCH_LIST_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // builder.addDefaultCase((state, action) => {});
  },
);

export default cryptoReducer;
