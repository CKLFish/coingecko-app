import React, {useCallback, useEffect} from 'react';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import ACTION_TYPES from '../../actions';
import CGError from '../../components/CGError';
import CGLoading from '../../components/CGLoading';
import CGTrendCard from '../../components/CGTrendCard';
import {CoinData} from '../../interfaces/response';
import {IRootState} from '../../store';

const CryptoTrend = () => {
  const {
    trend: {coins, loading, error},
    preference: {currencySign},
  } = useSelector((rootState: IRootState) => rootState);
  const dispatch = useDispatch();

  const fetchTrendList = useCallback(() => {
    dispatch({
      type: ACTION_TYPES.TREND.FETCH_LIST,
    });
  }, [dispatch]);

  useEffect(() => {
    fetchTrendList();
  }, [fetchTrendList]);

  const onRenderItem: ListRenderItem<CoinData> = ({item: {item}, index}) => {
    return (
      <CGTrendCard
        key={index}
        id={item.id}
        name={item.name}
        imageSrc={item.thumb}
        currencySign={currencySign}
      />
    );
  };

  if (loading) {
    return <CGLoading />;
  }

  if (error) {
    return <CGError onPress={fetchTrendList} />;
  }

  return coins && coins.length > 0 ? (
    <FlatList
      style={styles.container}
      data={coins}
      renderItem={onRenderItem}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  ) : null;
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    padding: 10,
  },
});

export default CryptoTrend;
