import RequestHelper from '../../apis/apis';
import {booleanToString, optionsToQuery} from '../../apis/apis';

describe('APIs', () => {
  test('booleanToString', () => {
    expect(booleanToString(true)).toEqual('true');
    expect(booleanToString(false)).toEqual('false');
  });
  test('optionsToQuery', () => {
    expect(optionsToQuery({})).toEqual('');
    expect(optionsToQuery({hello: 'a'})).toEqual('?hello=a');
    expect(optionsToQuery({hello: 'a', oh: 'my'})).toEqual('?hello=a&oh=my');
  });
  test('RequestHelper | getCoins should return 50 records', async () => {
    // expect.assertions(50);
    const response = await RequestHelper.getCoinsByPage(1);
    expect(response.data.length).toEqual(50);
  });
    test('RequestHelper | getTrends should return 7 records', async () => {
    // expect.assertions(50);
    const response = await RequestHelper.getTrends();
    expect(response.data.coins.length).toEqual(7);
  });
  test('RequestHelper | getCoinMarketData should return 7 records', async () => {
    // expect.assertions(50);
    const response = await RequestHelper.getGlobalMarket();
  });
});

// yarn test --findRelatedTests '/Users/cklfish/Projects/coingecko/__tests__/Utils/TextUtil.test.ts'
