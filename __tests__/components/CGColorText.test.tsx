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
import theme from '../../theme/light.theme';

describe('CGColorText', () => {
  test('0.0', () => {
    const colorTextInstance = shallow(<CGColorText value={0} />);
    expect(colorTextInstance.props().children).toEqual('0.0%');
  });
  test('9.567 no postfix', () => {
    const colorTextInstance = shallow(<CGColorText value={9.567} postfix="" />);
    expect(colorTextInstance.props().children).toEqual('9.6');
  });
});
