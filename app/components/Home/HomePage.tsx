import { BannerCarousel } from "../Banner/BannerCarousel";
import { MarketGrid } from "../Market/MarketGrid";

export const HomePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <BannerCarousel />
      <MarketGrid />
    </main>
  );
}; 