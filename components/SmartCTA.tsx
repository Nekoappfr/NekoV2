
import React, { useState, useRef, useEffect } from 'react';
import BookingDropdown from './BookingDropdown';

interface SmartCTAProps {
  onTrigger: () => void;
  onSearchStateChange?: (isOpen: boolean) => void;
  variant?: 'default' | 'transparent';
}

const SmartCTA: React.FC<SmartCTAProps> = ({ onTrigger, onSearchStateChange, variant = 'default' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState('');

  const handleDatesSelected = (start: string, end: string) => {
    setSelectedDates(`${start} → ${end}`);
  };

  const toggleSearch = (open: boolean) => {
    setIsOpen(open);
    if (onSearchStateChange) {
      onSearchStateChange(open);
    }
  };

  return (
    <div className="w-full relative">
      {!isOpen ? (
        <div 
          className={`relative flex items-center transition-all duration-300 cursor-pointer group ${
            variant === 'transparent' 
              ? 'bg-transparent border-none shadow-none p-0' 
              : 'bg-white/95 backdrop-blur-md border border-warm-border rounded-2xl p-1.5 pr-1.5 shadow-xl hover:border-neko-primary/30'
          }`}
          onClick={() => toggleSearch(true)}
        >
          <div className={`flex-1 overflow-hidden ${
            variant === 'transparent' 
              ? 'bg-white rounded-2xl px-4 py-3 border border-warm-border/50 shadow-sm' 
              : 'px-3 py-3'
          }`}>
            <p className="font-refined text-[14px] sm:text-[16px] md:text-[18px] font-semibold text-gray-400 group-hover:text-neko-primary transition-colors whitespace-nowrap">
              Déposer une annonce gratuitement
            </p>
          </div>
          
          <button 
            className={`flex items-center justify-center text-white shadow-lg hover:bg-[#A34D5E] transition-all duration-300 group-hover:scale-105 ${
              variant === 'transparent'
                ? 'w-12 h-12 bg-neko-primary rounded-2xl ml-2'
                : 'w-10 h-10 bg-neko-primary rounded-xl'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              toggleSearch(true);
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      ) : (
        <BookingDropdown 
          onClose={() => toggleSearch(false)} 
          onDatesSelected={handleDatesSelected}
        />
      )}
    </div>
  );
};

export default SmartCTA;
