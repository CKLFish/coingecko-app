import React from 'react';
import {StyleSheet, View} from 'react-native';

import CGLoadingIndicator from './CGLoadingIndicator';

const CGLoading: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <CGLoadingIndicator />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
  },
  inner: {
    alignSelf: 'center',
    flex: 1,
  },
});

export default CGLoading;
