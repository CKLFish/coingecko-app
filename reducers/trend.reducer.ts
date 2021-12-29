import {createReducer} from '@reduxjs/toolkit';

import {ACTIONS} from '../actions';
import {Coin} from '../interfaces/response';

export type TrendState = {
  coins: Coin[];
  loading: boolean;
  error?: any;
};

const trendReducer = createReducer<TrendState>(
  {
    coins: [],
    loading: true,
    error: undefined,
  },
  builder => {
    builder.addCase(ACTIONS.TREND.FETCH_LIST, state => {
      state.loading = true;
    });
    builder.addCase(ACTIONS.TREND.FETCH_LIST_SUCCESS, (state, action) => {
      state.coins = action.payload;
      state.loading = false;
    });
    builder.addCase(ACTIONS.TREND.FETCH_LIST_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
);
export default trendReducer;
