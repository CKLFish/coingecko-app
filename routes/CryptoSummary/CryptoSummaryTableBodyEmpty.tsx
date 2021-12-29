import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CryptoSummaryTableBodyEmpty = () => {
  const {t} = useTranslation();
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <MaterialCommunityIcons
          name="file-search"
          size={30}
          color={colors.text}
        />
        <Text style={{color: colors.text}}>
          {t('CRYPTO_SUMMARY_TABLE_FILTER_NO_MATCH')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default CryptoSummaryTableBodyEmpty;
