import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import ACTION_TYPES from '../../actions';
import CGError from '../../components/CGError';
import CGGlobalMarket, {
  MarketCapPercentageList,
} from '../../components/CGGlobalMarket/CGGlobalMarket';
import CGLoading from '../../components/CGLoading';
import {IRootState} from '../../store';
import {NumberUtil} from '../../Utils';

const CryptoGlobalMarket: React.FC = () => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const {
    market: {
      market_cap_percentage,
      market_cap_change_percentage_24h_usd,
      total_market_cap,
      active_cryptocurrencies,
      ended_icos,
      ongoing_icos,
      upcoming_icos,
      loading,
      error,
    },
    preference: {currencySign},
  } = useSelector((rootState: IRootState) => rootState);
  const [marketCapPercentageList, setMarketCapPercentageList] = useState<
    MarketCapPercentageList[]
  >([]);

  useEffect(() => {
    if (market_cap_percentage) {
      const newMarketCapPercentageList = Object.entries(
        market_cap_percentage,
      ).map(([k, v]) => {
        return {
          name: k.toUpperCase(),
          value: v,
          color: `rgba(${NumberUtil.randomBetween(
            0,
            255,
          )}, ${NumberUtil.randomBetween(0, 255)}, ${NumberUtil.randomBetween(
            0,
            255,
          )}, 1)`,
          legendFontColor: colors.text,
          legendFontSize: 14,
        };
      });
      setMarketCapPercentageList(newMarketCapPercentageList);
    }
  }, [market_cap_percentage, colors]);

  const fetchMarketList = useCallback(() => {
    dispatch({
      type: ACTION_TYPES.MARKET.FETCH_LIST,
    });
  }, [dispatch]);

  useEffect(() => {
    fetchMarketList();
  }, [fetchMarketList]);

  if (loading) {
    return <CGLoading />;
  }

  if (error) {
    return <CGError onPress={fetchMarketList} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CGGlobalMarket
        upcomingIcos={upcoming_icos}
        endedIcos={ended_icos}
        onGoingIcos={ongoing_icos}
        activeCryptoCurrencies={active_cryptocurrencies}
        currencySign={currencySign}
        totalMarketCap={total_market_cap?.usd}
        marketCapPercentageList={marketCapPercentageList}
        marketCapChangedPercentage={market_cap_change_percentage_24h_usd}
        iconSize={30}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  flex: {
    flex: 1,
  },
  sharpCorner: {
    borderRadius: 0,
  },
  row: {
    flexDirection: 'row',
  },
});

export default CryptoGlobalMarket;
