import React from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, StyleSheet, View} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {AbstractChartConfig} from 'react-native-chart-kit/dist/AbstractChart';
import {PieChartProps} from 'react-native-chart-kit/dist/PieChart';
import {Card, Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {TextUtil} from '../../Utils';
import CGColorText from '../CGColorText';

export type MarketCapPercentageList = {
  value: number;
  name: string;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
};

export type CGGlobalMarketProps = {
  onGoingIcos: number;
  endedIcos: number;
  upcomingIcos: number;
  activeCryptoCurrencies: number;
  iconSize: number;
  currencySign?: string;
  totalMarketCap: number;
  marketCapPercentageList: MarketCapPercentageList[];
  marketCapChangedPercentage: number;
  marketCapPercantageChartProps?: Partial<PieChartProps>;
};

const defaultChartConfig: AbstractChartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
};

const CGGlobalMarket: React.FC<CGGlobalMarketProps> = props => {
  const {
    onGoingIcos,
    endedIcos,
    upcomingIcos,
    activeCryptoCurrencies,
    totalMarketCap,
    marketCapPercentageList,
    marketCapChangedPercentage,
    marketCapPercantageChartProps,
    currencySign = '',
    iconSize = 30,
  } = props;
  const {chartConfig, ...otherChartProps} = marketCapPercantageChartProps || {};
  const {t} = useTranslation();

  return (
    <View>
      <View style={[styles.row, styles.flex]}>
        <Card style={[styles.flex, styles.sharpCorner]}>
          <Card.Title
            title={`${onGoingIcos}`}
            subtitle={t('CRYPTO_MARKET_ICO_ONGOING')}
            left={() => (
              <MaterialCommunityIcons name="file-clock" size={iconSize} />
            )}
          />
        </Card>
        <Card style={[styles.flex, styles.sharpCorner]}>
          <Card.Title
            title={`${endedIcos}`}
            subtitle={t('CRYPTO_MARKET_ICO_ENDED')}
            left={() => (
              <MaterialCommunityIcons name="file-check" size={iconSize} />
            )}
          />
        </Card>
      </View>
      <View style={[styles.row, styles.flex]}>
        <Card style={[styles.flex, styles.sharpCorner]}>
          <Card.Title
            title={`${upcomingIcos}`}
            subtitle={t('CRYPTO_MARKET_ICO_UPCOMING')}
            left={() => (
              <MaterialCommunityIcons name="file-plus" size={iconSize} />
            )}
          />
        </Card>
        <Card style={[styles.flex, styles.sharpCorner]}>
          <Card.Title
            title={activeCryptoCurrencies}
            subtitle={t('CRYPTO_MARKET_ACTIVE_CRYPTO')}
            left={() => (
              <MaterialCommunityIcons name="bitcoin" size={iconSize} />
            )}
          />
        </Card>
      </View>
      <Card style={styles.sharpCorner}>
        <Card.Title
          title={`${currencySign}${
            totalMarketCap
              ? TextUtil.formatCurrency(totalMarketCap)
              : t('EMPTY_PLACEHOLDER')
          }`}
          subtitle={`${t('CRYPTO_MARKET_TOTAL_MARKET_CAP')}`}
          left={() => <MaterialCommunityIcons name="cash" size={iconSize} />}
          right={() =>
            marketCapChangedPercentage ? (
              <CGColorText value={marketCapChangedPercentage} />
            ) : (
              <Text>{t('EMPTY_PLACEHOLDER')}</Text>
            )
          }
        />
      </Card>
      <Card style={styles.sharpCorner}>
        <Card.Title title={t('CRYPTO_MARKET_PIECHART_TITLE')} />
        {marketCapPercentageList ? (
          <PieChart
            width={Dimensions.get('window').width}
            height={220}
            backgroundColor={'transparent'}
            paddingLeft={'14'}
            chartConfig={{
              ...defaultChartConfig,
              ...chartConfig,
            }}
            {...otherChartProps}
            data={marketCapPercentageList}
            accessor={'value'}
          />
        ) : null}
      </Card>
    </View>
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

export default CGGlobalMarket;
