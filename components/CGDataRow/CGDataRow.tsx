import React from 'react';
import {Image, ImageStyle, StyleSheet, ViewProps} from 'react-native';
import {DataTable} from 'react-native-paper';

import {TextUtil} from '../../Utils';
import ColorText from '../CGColorText';
import CGFavouriteButton, {
  FavouritebuttonProps,
} from '../CGFavouriteButton/CGFavouriteButton';

export enum DataRowColumnType {
  CURRENCY,
  PERCENTAGE,
  FAVOURITE,
  TEXT,
  IMAGE,
}

interface DataRowColumnProps extends ViewProps {
  type: DataRowColumnType;
  value?: number | string;
  uri?: string;
  numeric?: boolean;
}

type DataRowProps = {
  id: string;
  columns: DataRowColumnProps[];
  favouriteButtonProps?: FavouritebuttonProps;
  imageStyle?: ImageStyle;
};

const CGDataRow: React.FC<DataRowProps> = props => {
  const {id, favouriteButtonProps, columns, imageStyle = styles.icon} = props;

  return (
    <DataTable.Row key={id}>
      {columns.map((col, index) => {
        const {type, value, uri, ...otherProps} = col;
        switch (type) {
          case DataRowColumnType.FAVOURITE:
            return (
              <DataTable.Cell key={`${id}_col${index}`} {...otherProps}>
                <CGFavouriteButton {...favouriteButtonProps} />
              </DataTable.Cell>
            );
          case DataRowColumnType.PERCENTAGE:
            return (
              <DataTable.Cell key={`${id}_col${index}`} {...otherProps}>
                <ColorText value={Number(value)} />
              </DataTable.Cell>
            );
          case DataRowColumnType.CURRENCY:
            return (
              <DataTable.Cell key={`${id}_col${index}`} {...otherProps}>
                {TextUtil.formatCurrency(Number(value))}
              </DataTable.Cell>
            );
          case DataRowColumnType.IMAGE:
            return (
              <DataTable.Cell key={`${id}_col${index}`} {...otherProps}>
                <Image source={{uri}} style={imageStyle} />
              </DataTable.Cell>
            );
          case DataRowColumnType.TEXT:
          default:
            return (
              <DataTable.Cell key={`${id}_col${index}`} {...otherProps}>
                {col.value}
              </DataTable.Cell>
            );
        }
      })}
    </DataTable.Row>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 20,
    width: 20,
  },
});

export default CGDataRow;
