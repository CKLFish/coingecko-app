/**
 * @format
 */

import 'react-native';

import {shallow} from 'enzyme';
import React from 'react';
import {Provider} from 'react-native-paper';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import CGColorText from '../../components/CGColorText';
import CGDataRow from '../../components/CGDataRow';
import {DataRowColumnType} from '../../components/CGDataRow/CGDataRow';
import theme from '../../theme/light.theme';

describe('CGDataRow', () => {
  test('it should render dataRow with Fav button only ', () => {
    const dataRow = renderer.create(
      <Provider theme={theme}>
        <CGDataRow id={'a'} columns={[{type: DataRowColumnType.FAVOURITE}]} />
      </Provider>,
    );
    expect(dataRow).toMatchSnapshot();
  });
  test('it should render dataRow with default Text only ', () => {
    const dataRow = renderer.create(
      <Provider theme={theme}>
        <CGDataRow
          id={'a'}
          columns={[{value: 0, type: DataRowColumnType.TEXT}]}
        />
      </Provider>,
    );
    expect(dataRow).toMatchSnapshot();
  });
  test('it should render dataRow with Percentage, currency and Image ', () => {
    const dataRow = renderer.create(
      <Provider theme={theme}>
        <CGDataRow
          id={'a'}
          columns={[
            {
              uri: 'https://assets.coingecko.com/coins/images/19153/thumb/dobo.png?1640080606',
              type: DataRowColumnType.IMAGE,
            },
            {
              value: 500,
              type: DataRowColumnType.CURRENCY,
            },
            {
              value: 60.67,
              type: DataRowColumnType.PERCENTAGE,
            },
          ]}
        />
      </Provider>,
    );
    expect(dataRow).toMatchSnapshot();
  });
});
