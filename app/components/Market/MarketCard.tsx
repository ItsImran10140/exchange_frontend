import Image from "next/image";
import Link from "next/link";

interface MarketCardProps {
  market: string;
}

export const MarketCard = ({ market }: MarketCardProps) => {
  const [baseAsset] = market.split('_');
  
  return (
    <div 
      className="bg-gray-800 text-white rounded-lg shadow-sm transition-all duration-200 hover:bg-gray-700"
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
}; 