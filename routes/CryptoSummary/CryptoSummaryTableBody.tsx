import React, {useCallback} from 'react';
import {ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import ACTION_TYPES from '../../actions';
import CGDataRow, {
  DataRowColumnType,
} from '../../components/CGDataRow/CGDataRow';
import CGError from '../../components/CGError';
import CGLoading from '../../components/CGLoading';
import {CoinsResponseData} from '../../interfaces/response';
import {IRootState} from '../../store';
import CryptoSummaryTableBodyEmpty from './CryptoSummaryTableBodyEmpty';

const CryptoSummaryTableBody: React.FC<{
  data: CoinsResponseData[];
  loading?: boolean;
  error?: any;
  onErrorRetry?: () => void;
}> = props => {
  const {data, loading, error, onErrorRetry} = props;
  const {favouriteList} = useSelector(
    (rootState: IRootState) => rootState.preference,
  );
  const dispatch = useDispatch();

  const onPressAddToFavourite = useCallback(
    (coinId: string) => () => {
      dispatch({
        type: ACTION_TYPES.USER_PREF.ADD_FAVOURITE,
        payload: coinId,
      });
    },
    [dispatch],
  );

  const onPressRemoveFavourite = useCallback(
    (coinId: string) => () => {
      dispatch({
        type: ACTION_TYPES.USER_PREF.DEL_FAVOURITE,
        payload: coinId,
      });
    },
    [dispatch],
  );

  const renderDataRow = (coin: CoinsResponseData) => {
    return (
      <CGDataRow
        key={coin.id}
        id={coin.id}
        columns={[
          {
            type: DataRowColumnType.FAVOURITE,
          },
          {
            type: DataRowColumnType.TEXT,
            value: coin.market_data.market_cap_rank,
          },
          {
            type: DataRowColumnType.TEXT,
            value: coin.symbol.toUpperCase(),
          },

          {
            type: DataRowColumnType.IMAGE,
            uri: coin.image.thumb,
          },
          {
            type: DataRowColumnType.CURRENCY,
            value: coin.market_data.current_price.usd,
            numeric: true,
          },
          {
            type: DataRowColumnType.PERCENTAGE,
            value: coin.market_data.price_change_percentage_1h_in_currency.usd,
            numeric: true,
          },
        ]}
        favouriteButtonProps={{
          onPressAddToFavourite: onPressAddToFavourite(coin.id),
          onPressRemoveFavourite: onPressRemoveFavourite(coin.id),
          size: 20,
          favourite: favouriteList.indexOf(coin.id) > -1,
        }}
      />
    );
  };

  if (loading) {
    return <CGLoading />;
  }

  if (error) {
    return <CGError onPress={onErrorRetry} />;
  }

  if (data.length === 0) {
    return <CryptoSummaryTableBodyEmpty />;
  }

  return <ScrollView>{data.map(coin => renderDataRow(coin))}</ScrollView>;
};

export default CryptoSummaryTableBody;
