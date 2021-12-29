/**
 * @format
 */

import 'react-native';

import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import CGGlobalMarket from '../../components/CGGlobalMarket';

describe('CGGlobalMarket', () => {
  test('0.0', () => {
    const globalMarketInstance = renderer.create(
      <CGGlobalMarket
        onGoingIcos={10}
        endedIcos={10}
        upcomingIcos={10}
        activeCryptoCurrencies={144}
        totalMarketCap={40}
        marketCapChangedPercentage={50}
        marketCapPercentageList={[
          {
            name: 'a',
            value: 50,
            color: '#666666',
            legendFontColor: '#666666',
            legendFontSize: 14,
          },
          {
            name: 'b',
            value: 50,
            color: '#99ffff',
            legendFontColor: '#99ffff',
            legendFontSize: 14,
          },
        ]}
        currencySign={'$'}
        iconSize={30}
      />,
    );
    expect(globalMarketInstance.toJSON()).toMatchSnapshot();
  });
});
