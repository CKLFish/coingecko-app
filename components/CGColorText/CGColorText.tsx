import React from 'react';
import {Text, TextProps} from 'react-native';
import {useTheme} from 'react-native-paper';

import {TextUtil} from '../../Utils';

interface ColorTextProps extends Omit<TextProps, 'children'> {
  value: number;
  prefix?: string;
  postfix?: string;
}

const ColorText: React.FC<ColorTextProps> = props => {
  const {value, postfix = '%', prefix = '', style} = props;
  const {colors} = useTheme();

  return (
    <Text
      style={[
        {
          color:
            value > 0 ? colors.up : value === 0 ? colors.unchange : colors.down,
        },
        style,
      ]}>
      {`${prefix}${TextUtil.formatPercentage(value)}${postfix}`}
    </Text>
  );
};

export default ColorText;
