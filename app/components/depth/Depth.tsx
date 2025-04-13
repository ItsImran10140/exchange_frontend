/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import {
  getDepth,
  getTicker,
  getTrades,
} from "../../utils/httpClient";
import { BidTable } from "./BidTable";
import { AskTable } from "./AskTable";
import { SignalingManager } from "@/app/utils/SignalingManager";
import { Ticker } from "@/app/utils/types";

export function Depth({ market }: { market: string }) {
  const [bids, setBids] = useState<[string, string][]>();
  const [asks, setAsks] = useState<[string, string][]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [price, setPrice] = useState<string>();
  const [ticker, setTicker] = useState<Ticker | null>(null);

  useEffect(() => {
    getTicker(market).then(setTicker);
    SignalingManager.getInstance().registerCallback("ticker", (data: Partial<Ticker>) => setTicker(prevTicker => ({
      firstPrice: data?.firstPrice ?? prevTicker?.firstPrice ?? '',
      high: data?.high ?? prevTicker?.high ?? '',
      lastPrice: data?.lastPrice ?? prevTicker?.lastPrice ?? '',
      low: data?.low ?? prevTicker?.low ?? '',
      priceChange: data?.priceChange ?? prevTicker?.priceChange ?? '',
      priceChangePercent: data?.priceChangePercent ?? prevTicker?.priceChangePercent ?? '',
      quoteVolume: data?.quoteVolume ?? prevTicker?.quoteVolume ?? '',
      symbol: data?.symbol ?? prevTicker?.symbol ?? '',
      trades: data?.trades ?? prevTicker?.trades ?? '',
      volume: data?.volume ?? prevTicker?.volume ?? '',
    })), market);
    SignalingManager.getInstance().sendMessage({ "method": "SUBSCRIBE", "params": [`ticker.${market}`] });
    // ========================
    SignalingManager.getInstance().registerCallback(
      "depth",
      (data: any) => {
        setBids((originalBids) => {
          const bidsAfterUpdate = [...(originalBids || [])]
          for (let i = 0; i < bidsAfterUpdate.length; i++) {
            for (let j = 0; j < data.bids.length; j++) {
              if (bidsAfterUpdate[i][0] === data.bids[j][0]) {
                bidsAfterUpdate[i][1] = data.bids[j][1];
                break;
              }
            }
          }
          return bidsAfterUpdate.filter(bid => parseFloat(bid[1]) > 0);
        });

        setAsks((originalAsks) => {
          const asksAfterUpdate = [...(originalAsks || [])];
          for (let i = 0; i < asksAfterUpdate.length; i++) {
            for (let j = 0; j < data.asks.length; j++) {
              if (asksAfterUpdate[i][0] === data.asks[j][0]) {
                asksAfterUpdate[i][1] = data.asks[j][1];
                break;
              }
            }
          }
          return asksAfterUpdate.filter(ask => parseFloat(ask[1]) > 0);
        })

        setIsLoading(false);

      }, `DEPTH.${market}`);

    SignalingManager.getInstance().sendMessage({ "method": "SUBSCRIBE", "params": [`depth.200ms.${market}`] });

    getDepth(market).then((data) => {

      setBids(data.bids.filter(bid => parseFloat(bid[1]) > 0).reverse());
      setAsks(data.asks.filter(ask => parseFloat(ask[1]) > 0));
    });

    getTicker(market).then(t => setPrice(t.lastPrice));
    getTrades(market).then(t => setPrice(t[0].price));
    getDepth(market).then(data => console.log(data))

    return () => {
      SignalingManager.getInstance().deRegisterCallback("ticker", `TICKER-${market}`);
      SignalingManager.getInstance().sendMessage({ "method": "UNSUBSCRIBE", "params": [`ticker.${market}`] });
      // ======================
      SignalingManager.getInstance().sendMessage({ "method": "UNSUBSCRIBE", "params": [`depth.200ms.${market}`] });
      SignalingManager.getInstance().deRegisterCallback("depth", `DEPTH.${market}`);
    }

  }, []);



  return (
    <>
      <TableHeader />
      <div className="w-full p-2 h-[500px] overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {isLoading ? (
          <div className="text-center py-3 text-slate-400 text-sm">Loading order book...</div>
        ) : (
          <>
            {asks && asks.length > 0 ? (

              <AskTable asks={asks.slice(0, 15)} />
            ) : (
              <div className="text-center py-1 text-slate-500 text-xs">No asks available</div>
            )}

            {price && (
              <div className="text-center py-1 font-medium text-white border-y border-slate-800">
                {ticker?.lastPrice}
              </div>
            )}
            {bids && bids.length > 0 ? (
              <BidTable bids={bids.slice(0, 15)} />
            ) : (
              <div className="text-center py-1 text-slate-500 text-xs">No bids available</div>
            )}
          </>
        )}
      </div>
    </>
  );
}

function TableHeader() {
  return (
    <div className="flex p-2 justify-between text-xs">
      <div className="text-white">Price</div>
      <div className="text-slate-500">Size</div>
      <div className="text-slate-500">Total</div>
    </div>
  );
}
