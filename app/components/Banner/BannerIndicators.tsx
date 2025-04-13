interface BannerIndicatorsProps {
  count: number;
  currentIndex: number;
  onChange: (index: number) => void;
}

export const BannerIndicators = ({ count, currentIndex, onChange }: BannerIndicatorsProps) => (
  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
    {Array.from({ length: count }).map((_, index) => (
      <button
        key={index}
        onClick={() => onChange(index)}
        className={`w-3 h-3 rounded-full ${
          index === currentIndex ? "bg-white" : "bg-white bg-opacity-50"
        }`}
        aria-label={`Go to banner ${index + 1}`}
      />
    ))}
  </div>
); 