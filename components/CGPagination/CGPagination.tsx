import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';

type CGPaginationProps = {
  page: number;
  maxPage: number;
  onPageChange?: (newPage: number) => void;
};

const CGPagination: React.FC<CGPaginationProps> = props => {
  const {page, maxPage, onPageChange: propOnPageChange} = props;

  const onPageChange = useCallback(
    (newPage: number) => {
      if (propOnPageChange) {
        propOnPageChange(newPage);
      }
    },
    [propOnPageChange],
  );

  const onBackToFirstPage = useCallback(() => {
    onPageChange(0);
  }, [onPageChange]);

  const onBackToPrevPage = useCallback(() => {
    if (page > 0) {
      onPageChange(page - 1);
    }
  }, [onPageChange, page]);

  const onGoToNextPage = useCallback(() => {
    if (page < maxPage) {
      onPageChange(page + 1);
    }
  }, [onPageChange, page, maxPage]);

  const onGoToLastPage = useCallback(() => {
    onPageChange(maxPage);
  }, [onPageChange, maxPage]);

  return maxPage ? (
    <View style={styles.container}>
      <IconButton
        icon="page-first"
        onPress={onBackToFirstPage}
        disabled={page <= 0}
      />
      <IconButton
        icon="chevron-left"
        onPress={onBackToPrevPage}
        disabled={page < 1}
      />
      <Text style={styles.text}>{`${page + 1}/${maxPage + 1}`}</Text>
      <IconButton
        icon="chevron-right"
        onPress={onGoToNextPage}
        disabled={page >= maxPage}
      />
      <IconButton
        icon="page-last"
        onPress={onGoToLastPage}
        disabled={page >= maxPage}
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    flex: 1,
    textAlign: 'center',
  },
});

export default CGPagination;
