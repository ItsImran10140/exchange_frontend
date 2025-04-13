import { useState, useEffect, useCallback } from "react";
import { BannerSlide } from "./BannerSlide";
import { NavigationButtons } from "./NavigationButtons";
import { BannerIndicators } from "./BannerIndicators";
import { BANNER_INTERVAL, banners } from "../../constants/home";

export const BannerCarousel = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  
  const nextBanner = useCallback(() => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  }, []);
  
  const prevBanner = useCallback(() => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  }, []);
  
  useEffect(() => {
    const timer = setInterval(nextBanner, BANNER_INTERVAL);
    return () => clearInterval(timer);
  }, [nextBanner]);

  return (
    <div className="w-full max-w-4xl mb-12 relative overflow-hidden rounded-lg">
      <div className="relative h-80 w-full">
        {banners.map((banner, index) => (
          <BannerSlide
            key={banner.image}
            banner={banner}
            index={index}
            isActive={index === currentBanner}
          />
        ))}
        
        <NavigationButtons onPrev={prevBanner} onNext={nextBanner} />
        
        <BannerIndicators
          count={banners.length}
          currentIndex={currentBanner}
          onChange={setCurrentBanner}
        />
      </div>
    </div>
  );
}; 