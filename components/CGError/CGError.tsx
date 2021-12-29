import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';

type Props = {
  onPress?: () => void;
};

const CGError: React.FC<Props> = props => {
  const {onPress: propOnPress} = props;
  const {t} = useTranslation();

  const onPress = useCallback(() => {
    if (propOnPress) {
      propOnPress();
    }
  }, [propOnPress]);

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.centerText}>{t('NETWORK_FETCH_FAIL')}</Text>
        <Button onPress={onPress}>{t('NETWORK_FETCH_RETRY')}</Button>
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
  centerText: {
    textAlign: 'center',
  },
});

export default CGError;
