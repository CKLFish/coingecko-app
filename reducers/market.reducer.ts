import {createReducer} from '@reduxjs/toolkit';

import {ACTIONS} from '../actions';
import {GlobalMarketData} from '../interfaces/response';

export interface MarketState extends Partial<GlobalMarketData> {
  loading: boolean;
  error?: any;
}

const marketReducer = createReducer<MarketState>(
  {
    loading: true,
  },
  builder => {
    builder.addCase(ACTIONS.MARKET.FETCH_LIST, state => {
      state.loading = true;
    });
    builder.addCase(ACTIONS.MARKET.FETCH_LIST_SUCCESS, (state, action) => {
      state.loading = false;
      state.active_cryptocurrencies = action.payload.active_cryptocurrencies;
      state.ended_icos = action.payload.ended_icos;
      state.market_cap_change_percentage_24h_usd =
        action.payload.market_cap_change_percentage_24h_usd;
      state.market_cap_percentage = action.payload.market_cap_percentage;
      state.markets = action.payload.markets;
      state.ongoing_icos = action.payload.ongoing_icos;
      state.total_market_cap = action.payload.total_market_cap;
      state.total_volume = action.payload.total_volume;
      state.upcoming_icos = action.payload.upcoming_icos;
    });
    builder.addCase(ACTIONS.MARKET.FETCH_LIST_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // builder.addDefaultCase((state, action) => {});
  },
);

export default marketReducer;
