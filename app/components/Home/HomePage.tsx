import { BannerCarousel } from "../Banner/BannerCarousel";
import { MarketGrid } from "../Market/MarketGrid";

export const HomePage = () => {
  return (
    <main className="flex min-h-screen items-center flex-col px-12">
      <BannerCarousel />
      <MarketGrid />
    </main>
  );
}; 