import { MarketCard } from "./MarketCard";
import { markets } from "../../constants/home";

export const MarketGrid = () => (
  <>
    <h1 className="text-2xl font-bold mb-6">Markets</h1>
    <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
      {markets.map((market) => (
        <MarketCard key={market} market={market} />
      ))}
    </div>
  </>
); 