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
import CGFavouriteButton from '../../components/CGFavouriteButton';
import theme from '../../theme/light.theme';

describe('CGFavouriteButton', () => {
  test('withCallback', () => {
    const favouriteButtonInstance = renderer.create(
      <CGFavouriteButton
        onPressAddToFavourite={() => {}}
        onPressRemoveFavourite={() => {}}
      />,
    );
    expect(favouriteButtonInstance.toJSON()).toMatchSnapshot();
  });
  test('favourite', () => {
    const favouriteButtonInstance = renderer.create(
      <CGFavouriteButton favourite={true} />,
    );
    expect(favouriteButtonInstance.toJSON()).toMatchSnapshot();
  });
  test('non-favourite', () => {
    const favouriteButtonInstance = renderer.create(
      <CGFavouriteButton favourite={false} />,
    );
    expect(favouriteButtonInstance.toJSON()).toMatchSnapshot();
  });
});
