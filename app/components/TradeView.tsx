import React, { useEffect, useRef, memo } from 'react';

// TradingView API URL from environment variable with fallback
const TRADINGVIEW_EMBED_URL = process.env.NEXT_PUBLIC_TRADINGVIEW_EMBED_URL || "";
const TRADINGVIEW_SUPPORT_HOST = process.env.NEXT_PUBLIC_TRADINGVIEW_SUPPORT_HOST || "";

function TradingViewWidget({ market }: { market: string }) {
  const container = useRef<HTMLDivElement>(null);
  const getSymbol = (marketName: string) => {
    const symbolMap: Record<string, string> = {
      'BTC_USDC': 'BINANCE:BTCUSDC',
      'ETH_USDC': 'BINANCE:ETHUSDC',
      'SOL_USDC': 'BINANCE:SOLUSDC',
      'ENA_USDC': 'BINANCE:ENAUSDC',
      'LINK_USDC': 'BINANCE:LINKUSDC',
      'WIF_USDC': 'BINANCE:WIFUSDC',
    };
    return symbolMap[marketName] || '';
  };

  useEffect(
    () => {
      if (container.current) {
        container.current.innerHTML = '';
        
        const script = document.createElement("script");
        script.src = TRADINGVIEW_EMBED_URL;
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
          {
            "autosize": true,
            "symbol": "${getSymbol(market)}",
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "allow_symbol_change": false,
            "support_host": "${TRADINGVIEW_SUPPORT_HOST}"
          }`;
        container.current.appendChild(script);
      }
    },
    [market]
  );

  return (
    <div className='h-[500px] w-[100%]'>

    <div className="tradingview-widget-container" ref={container} style={{ height: "500px", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
      <div className="tradingview-widget-copyright"><a href={TRADINGVIEW_SUPPORT_HOST} rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div>
    </div>
    </div>
  );
}

export default memo(TradingViewWidget);

