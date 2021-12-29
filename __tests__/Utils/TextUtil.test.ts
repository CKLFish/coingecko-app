import {TextUtil} from '../../Utils';

describe('TextUtils', () => {
  test('formatCurrency', () => {
    expect(TextUtil.formatCurrency(2000)).toEqual('2,000.00');
  });
  test('formatPercentage', () => {
    expect(TextUtil.formatPercentage(45.678, 1)).toEqual('45.7');
    expect(TextUtil.formatPercentage(45.789, 2)).toEqual('45.79');
  });
});

// yarn test --findRelatedTests '/Users/cklfish/Projects/coingecko/__tests__/Utils/TextUtil.test.ts'
