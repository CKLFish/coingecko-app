import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {LineChartProps} from 'react-native-chart-kit/dist/line-chart/LineChart';
import {Card, Paragraph, Title} from 'react-native-paper';

import RequestHelper from '../../apis/apis';
import sample from '../../samples/sample.json';
import {TextUtil} from '../../Utils';
import ColorText from '../CGColorText';

type TrendCardProps = {
  id: string;
  name: string;
  imageSrc?: string;
  currencySign?: string;
  chartProps?: Partial<LineChartProps>;
};

const CGTrendCard: React.FC<TrendCardProps> = props => {
  const {id, name, imageSrc, currencySign, chartProps} = props;
  const {chartConfig, ...otherChartProps} = chartProps || {};
  const [priceTimes, setPriceTimes] = useState<{
    prices: number[];
    times: string[];
  }>({
    prices: sample.trend.prices,
    times: sample.trend.times.map(item => `${item}`),
  });
  const [changes, setChanges] = useState(0);
  const {t} = useTranslation();

  useEffect(() => {
    RequestHelper.getCoinMarketData(id, {vs_currency: 'usd', days: '1'}).then(
      marketData => {
        const newPrices = marketData.prices.map(item => item[1]);
        const newTimes = marketData.prices.map(item => `${item[0]}`);
        setPriceTimes({
          prices: newPrices,
          times: newTimes,
        });
      },
    );
    RequestHelper.getCoin(id, {market_data: true}).then(coinData => {
      setChanges(coinData.market_data.price_change_percentage_24h);
    });
  }, [id]);

  const lastPrice = _.last(priceTimes.prices);

  return (
    <Card style={styles.roundCorner}>
      <Card.Content>
        <View style={styles.row}>
          <Image source={{uri: imageSrc}} style={styles.icon} />
          <Title style={styles.title}>{name}</Title>
          <ColorText value={Number(changes)} />
        </View>
        <Paragraph>
          {lastPrice
            ? `${currencySign}${TextUtil.formatCurrency(lastPrice, undefined, {
                minimumFractionDigits: 6,
              })}`
            : t('EMPTY_PLACEHOLDER')}
        </Paragraph>
        {priceTimes.times && priceTimes.prices ? (
          <LineChart
            bezier
            style={styles.chart}
            withShadow={true}
            withDots={false}
            withVerticalLines={false}
            withHorizontalLines={false}
            withHorizontalLabels={false}
            width={Dimensions.get('window').width - 50}
            height={90}
            {...otherChartProps}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 2,
              color: (opacity = 1) =>
                Number(changes) > 0
                  ? `rgba(0, 255, 0, ${opacity})`
                  : Number(changes) === 0
                  ? `rgba(128, 128, 128, ${opacity})`
                  : `rgba(255,0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              strokeWidth: 2,
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
              ...chartConfig,
            }}
            data={{
              labels: priceTimes.times,
              datasets: [
                {
                  data: priceTimes.prices,
                },
              ],
            }}
          />
        ) : null}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  chart: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingRight: 0,
    paddingLeft: 0,
  },
  roundCorner: {
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    paddingLeft: 10,
    flex: 1,
  },
  icon: {
    height: 20,
    width: 20,
  },
});

export default CGTrendCard;
