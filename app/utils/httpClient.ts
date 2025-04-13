import { Depth, KLine, Ticker, Trade } from "./types";

const BASE_URL = "/api/v1";

const fetchWithErrorHandling = async (url: string, options = {}) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  
  return await response.json();
};

export async function getTicker(market: string): Promise<Ticker> {
  const tickers = await getTickers();
  const ticker = tickers.find((t) => t.symbol === market);
  if (!ticker) {
    throw new Error(`No ticker found for ${market}`);
  }
  return ticker;
}

export async function getTickers(): Promise<Ticker[]> {
  return fetchWithErrorHandling('/tickers');
}

export async function getDepth(market: string): Promise<Depth> {
  const data = await fetchWithErrorHandling(`/depth?symbol=${market}`);
  console.log(data);
  return data;
}

export async function getTrades(market: string): Promise<Trade[]> {
  return fetchWithErrorHandling(`/trades?symbol=${market}`);
}

export async function getKlines(
  market: string,
  interval: string,
  startTime: number,
  endTime: number
): Promise<KLine[]> {
  const data: KLine[] = await fetchWithErrorHandling(
    `/klines?symbol=${market}&interval=${interval}&startTime=${startTime}&endTime=${endTime}`
  );
  return data.sort((x, y) => (Number(x.end) < Number(y.end) ? -1 : 1));
}

export async function getMarkets(): Promise<any[]> {
  return fetchWithErrorHandling('/markPrices');
}
