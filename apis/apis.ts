import axios, {AxiosInstance} from 'axios';

import {CoinsResponseData, GlobalMarketResponse} from '../interfaces/response';
// import CoinGecko from 'coingecko-api';

type CoinMarketDataOptions = {
  vs_currency?: string;
  days?: string;
  interval?: 'daily';
};

type CoinDataOptions = {
  tickers?: boolean;
  market_data?: boolean;
  community_data?: boolean;
  developer_data?: boolean;
  sparkline?: boolean;
};

const booleanToString = (status: any) => {
  if (typeof status === 'boolean') {
    return status.toString();
  }
  return status;
};

const optionsToQuery = (options: Object | undefined) => {
  if (!options || Object.keys(options).length === 0) {
    return '';
  }
  return (
    '?' +
    Object.entries(options)
      .map(itemKey => `${itemKey[0]}=${booleanToString(itemKey[1])}`)
      .join('&')
  );
};

class RequestHelper {
  private static coinGeckoClient: AxiosInstance = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3',
  });
  public static coinsPageIndex = 0;
  public static coinsPageMax = 0;

  public static getAllCoins = async () => {
    await this.getCoinsByPage(1);
    const allCoinsPageResponse = await Promise.all(
      Array.from(Array(this.coinsPageMax)).map(async coinPageIndex => {
        return RequestHelper.getCoinsByPage(coinPageIndex);
      }),
    );
    // console.log('allCoinsPageResponse:: ', allCoinsPageResponse);
    return allCoinsPageResponse;
  };
  public static getCoinsByPage = async (pageIndex: number = 0) => {
    const coinsResponse = await this.coinGeckoClient.get<CoinsResponseData[]>(
      `/coins?page=${pageIndex + 1}`,
      {},
    );
    // console.log(coinsResponse.headers.total);
    if (coinsResponse.headers.total && coinsResponse.headers['per-page']) {
      this.coinsPageMax =
        Math.ceil(
          Number(coinsResponse.headers.total) /
            Number(coinsResponse.headers['per-page']),
        ) - 1;
      // console.log('coinPageMax', this.coinsPageMax, this.coinsPageIndex);
    }
    // console.log('COIN:: ', coinsResponse.data);
    return coinsResponse;
  };

  public static getTrends = async () => {
    const trendsResponse = await this.coinGeckoClient.get(
      '/search/trending',
      {},
    );
    // console.log('trending:: ', trendsResponse);
    return trendsResponse;
  };

  public static getCoinMarketData = async (
    coinId: string,
    options?: CoinMarketDataOptions,
  ) => {
    const coinMarketResponse = await this.coinGeckoClient.get(
      `/coins/${coinId}/market_chart` + optionsToQuery(options),
      {},
    );
    // console.log('coinMarketResponse:: ', coinMarketResponse);
    return coinMarketResponse.data;
  };

  public static getCoin = async (coinId: string, options?: CoinDataOptions) => {
    const coinResponse = await this.coinGeckoClient.get(
      `/coins/${coinId}` + optionsToQuery(options),
      {},
    );
    // console.log('coinResponse:: ', coinResponse);
    return coinResponse.data;
  };

  public static getGlobalMarket = async () => {
    const globalMarketResponse =
      await this.coinGeckoClient.get<GlobalMarketResponse>('/global', {});
    // console.log('globalMarketResponse:: ', globalMarketResponse);
    return globalMarketResponse;
  };
}

export default RequestHelper;
