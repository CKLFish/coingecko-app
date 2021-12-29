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
import CGError from '../../components/CGError';
import theme from '../../theme/light.theme';

describe('CGError', () => {
  test('withOutonPress', () => {
    const errorInstance = renderer.create(<CGError />);
    expect(errorInstance.toJSON()).toMatchSnapshot();
  });
  test('withOnPress', () => {
    const errorInstance = renderer.create(<CGError onPress={() => {}} />);
    expect(errorInstance.toJSON()).toMatchSnapshot();
  });
});
