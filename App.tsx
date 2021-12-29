import './wdyr';
import './i18n';

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';

import Router from './routes';
import {store} from './store';
import lightTheme from './theme/light.theme';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      up: string;
      down: string;
      unchange: string;
      favourite: string;
    }
  }
  namespace ReactNavigation {
    interface RootParamList {}
  }
}

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <PaperProvider theme={lightTheme}>
        <SafeAreaView style={styles.container} pointerEvents="box-none">
          {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
          <Router />
        </SafeAreaView>
      </PaperProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default App;
