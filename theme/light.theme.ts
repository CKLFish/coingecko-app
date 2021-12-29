import {DefaultTheme} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // # For Up / Down / Unchanged
    up: 'green',
    down: 'red',
    unchange: 'grey',
    favourite: 'red',
  },
};

export default theme;
