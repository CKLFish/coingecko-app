import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {DataTable, TextInput, useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';

import ACTION_TYPES from '../../actions';
import RequestHelper from '../../apis/apis';
import CGPagination from '../../components/CGPagination/CGPagination';
import {CoinsResponseData} from '../../interfaces/response';
import {IRootState} from '../../store';
import CryptoSummaryTableBody from './CryptoSummaryTableBody';

const CryptoSummary: React.FC<{}> = () => {
  const {colors} = useTheme();
  // const [fetchInterval, setFetchInterval] = useState(10000);
  const [filteredListPerPage, setFilteredPageList] = useState<
    CoinsResponseData[]
  >([]);
  const [hasFilter, setHasFilter] = useState(false);
  const {
    crypto: {coinsDict, loading, pageIndex, error},
    preference: {currency, currencySign},
  } = useSelector((rootState: IRootState) => {
    // console.log('rootState:: ', rootState);
    return rootState;
  });
  const dispatch = useDispatch();
  const {t} = useTranslation();

  useEffect(() => {
    dispatch({
      type: ACTION_TYPES.CRYPTO.FETCH_LIST,
    });
  }, [dispatch]);

  const onPageChange = (newPage: number = pageIndex) => {
    dispatch({
      type: ACTION_TYPES.CRYPTO.FETCH_LIST,
      pageIndex: newPage,
    });
  };

  const onChangeFilterText = useCallback(
    (newValue: string) => {
      const newFilteredList = coinsDict[pageIndex].filter(
        ({id, name, symbol}) => {
          return (
            id.indexOf(newValue) > -1 ||
            name.indexOf(newValue) > -1 ||
            symbol.indexOf(newValue) > -1
          );
        },
      );
      setFilteredPageList(newFilteredList);
      setHasFilter(newValue !== '');
    },
    [coinsDict, pageIndex],
  );

  return (
    <View style={styles.flex}>
      <TextInput
        style={{}}
        placeholder={t('CRYPTO_SUMMARY_SEARCH_PLACEHOLDER')}
        left={<TextInput.Icon name="magnify" color="black" />}
        onChangeText={onChangeFilterText}
      />

      <DataTable style={styles.flex}>
        <DataTable.Header>
          <DataTable.Title>
            <MaterialCommunityIcons
              name="heart"
              size={20}
              color={colors.favourite}
            />
          </DataTable.Title>
          <DataTable.Title
          // sortDirection="ascending"
          >
            {t('CRYPTO_SUMMARY_TABLE_HEADER_INDEX')}
          </DataTable.Title>
          <DataTable.Title
          // sortDirection="ascending"
          >
            {t('CRYPTO_SUMMARY_TABLE_HEADER_NAME')}
          </DataTable.Title>
          <DataTable.Title>
            {t('CRYPTO_SUMMARY_TABLE_HEADER_ICON')}
          </DataTable.Title>
          <DataTable.Title
            // sortDirection="ascending"
            numeric>
            {`${currency} ${currencySign}`}
          </DataTable.Title>
          <DataTable.Title
            // sortDirection="ascending"
            numeric>
            {t('CRYPTO_SUMMARY_TABLE_HEADER_PERCENTAGE_CHANGE_1H')}
          </DataTable.Title>
          {/* <DataTable.Title numeric>24h</DataTable.Title>
          <DataTable.Title numeric>7d</DataTable.Title> */}
        </DataTable.Header>
        <CryptoSummaryTableBody
          loading={loading}
          error={error}
          onErrorRetry={onPageChange}
          data={hasFilter ? filteredListPerPage : coinsDict[pageIndex]}
        />
        {hasFilter ? null : (
          <CGPagination
            maxPage={RequestHelper.coinsPageMax}
            page={pageIndex}
            onPageChange={onPageChange}
          />
        )}
        {/* {!hasFilter ? (
          <View>
            {RequestHelper.coinsPageMax ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <IconButton
                  icon="page-first"
                  onPress={() => {
                    onPageChange(0);
                  }}
                  disabled={pageIndex <= 0}
                />
                <IconButton
                  icon="chevron-left"
                  onPress={() => {
                    if (pageIndex > 0) {
                      onPageChange(pageIndex - 1);
                    }
                  }}
                  disabled={pageIndex < 1}
                />
                <Text style={{flex: 1, textAlign: 'center'}}>{`${
                  pageIndex + 1
                }/${RequestHelper.coinsPageMax + 1}`}</Text>
                <IconButton
                  icon="chevron-right"
                  onPress={() => {
                    if (pageIndex < RequestHelper.coinsPageMax) {
                      onPageChange(pageIndex + 1);
                    }
                  }}
                  disabled={pageIndex >= RequestHelper.coinsPageMax}
                />
                <IconButton
                  icon="page-last"
                  onPress={() => {
                    onPageChange(RequestHelper.coinsPageMax);
                  }}
                  disabled={pageIndex >= RequestHelper.coinsPageMax}
                />
              </View>
            ) : null}
          </View>
        ) : null} */}
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default CryptoSummary;
