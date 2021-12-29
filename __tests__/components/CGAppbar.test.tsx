/**
 * @format
 */

import 'react-native';

import React from 'react';
import {Provider} from 'react-native-paper';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import CGAppbar from '../../components/CGAppbar';
import theme from '../../theme/light.theme';

it('renders CGAppbar', () => {
  const tree = renderer.create(
    <Provider theme={theme}>
      <CGAppbar />
    </Provider>,
  );
  expect(tree).toMatchSnapshot();
});
