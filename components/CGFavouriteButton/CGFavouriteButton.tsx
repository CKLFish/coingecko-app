import React, {useCallback} from 'react';
import {GestureResponderEvent} from 'react-native';
import {useTheme} from 'react-native-paper';
import {IconButtonProps} from 'react-native-vector-icons/Icon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export interface FavouritebuttonProps
  extends Omit<IconButtonProps, 'color' | 'name'> {
  favourite?: boolean;
  onPressAddToFavourite?: (event: GestureResponderEvent) => void;
  onPressRemoveFavourite?: (event: GestureResponderEvent) => void;
}

const CGFavouriteButton: React.FC<FavouritebuttonProps> = props => {
  const {
    favourite,
    size,
    onPressRemoveFavourite: propOnPressRemoveFavourite,
    onPressAddToFavourite: propOnPressAddToFavourite,
    ...otherProps
  } = props;
  const {colors} = useTheme();

  const onPressAddToFavourite = useCallback(
    (event: GestureResponderEvent) => {
      if (propOnPressAddToFavourite) {
        propOnPressAddToFavourite(event);
      }
    },
    [propOnPressAddToFavourite],
  );

  const onPressRemoveFavourite = useCallback(
    (event: GestureResponderEvent) => {
      if (propOnPressRemoveFavourite) {
        propOnPressRemoveFavourite(event);
      }
    },
    [propOnPressRemoveFavourite],
  );

  return favourite ? (
    <MaterialCommunityIcons
      {...otherProps}
      name="heart-minus"
      size={size}
      color={colors.favourite}
      onPress={onPressRemoveFavourite}
    />
  ) : (
    <MaterialCommunityIcons
      {...otherProps}
      name="heart-plus-outline"
      size={size}
      onPress={onPressAddToFavourite}
    />
  );
};

export default CGFavouriteButton;
