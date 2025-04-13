'use client';

import Link from "next/link";
import Image from "next/image";

const markets = [
  "BTC_USDC",
  "ETH_USDC",
  "SOL_USDC",
  "ENA_USDC",
  "LINK_USDC",
  "WIF_USDC",
];

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Markets</h1>
      <div className="grid grid-cols-2 gap-4">
        {markets.map((market) => {
          const [baseAsset] = market.split('_');
          return (
            <div 
              className="bg-gray-800 text-white rounded-lg shadow-sm transition-all duration-200 hover:bg-gray-700" 
              key={market}
            >
              <Link 
                href={`/trade/${market}`}
                className="block p-4 font-medium text-center flex items-center justify-center gap-2"
              >
                <Image 
                  src={`/${baseAsset}.png`} 
                  alt={baseAsset}
                  width={24}
                  height={24}
                />
                {market}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
