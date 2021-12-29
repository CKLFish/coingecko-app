import {createReducer} from '@reduxjs/toolkit';

import {ACTIONS} from '../actions/action';

export type UserPreferenceState = {
  favouriteList: string[];
  currency: string;
  currencySign: string;
};

const userPreferenceReducer = createReducer<UserPreferenceState>(
  {
    favouriteList: [],
    currency: 'USD',
    currencySign: '$',
  },
  builder => {
    builder.addCase(ACTIONS.USER_PREF.SET_FAVOURITE, (state, action) => {
      state.favouriteList = [...action.payload];
    });
    // builder.addDefaultCase((state, action) => {});
  },
);

export default userPreferenceReducer;
