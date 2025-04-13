interface NavigationButtonsProps {
  onPrev: () => void;
  onNext: () => void;
}

export const NavigationButtons = ({ onPrev, onNext }: NavigationButtonsProps) => (
  <div className="absolute inset-0 flex items-center justify-between p-4">
    <button 
      onClick={onPrev}
      className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75"
      aria-label="Previous banner"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button 
      onClick={onNext}
      className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75"
      aria-label="Next banner"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
); 