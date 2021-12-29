import {configureStore} from '@reduxjs/toolkit';
import MMKVStorage from 'react-native-mmkv-storage';
import {combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import crypto, {CryptoState} from '../reducers/crypto.reducer';
import market, {MarketState} from '../reducers/market.reducer';
import preference, {UserPreferenceState} from '../reducers/preference.reducer';
import trend, {TrendState} from '../reducers/trend.reducer';
import rootSaga from '../sagas';

export interface IRootState {
  crypto: CryptoState;
  preference: UserPreferenceState;
  market: MarketState;
  trend: TrendState;
}

const sagaMiddleware = createSagaMiddleware();

const storage = new MMKVStorage.Loader().initialize();

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    whitelist: ['perference'],
  },
  combineReducers({
    crypto,
    preference,
    market,
    trend,
  }),
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
