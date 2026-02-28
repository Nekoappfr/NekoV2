import React from 'react';
import { MOCK_LISTINGS } from '../constants';
import PetCard from './PetCard';

const Carousel: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="horizontal-scroll-container no-scrollbar py-2 gap-2.5 md:gap-8 lg:gap-10">
        {MOCK_LISTINGS.map((listing) => (
          <PetCard 
            key={listing.id} 
            listing={listing} 
          />
        ))}
        {/* Spacer for consistent end-of-scroll padding */}
        <div className="min-w-[20px] md:min-w-[60px] h-full flex-shrink-0"></div>
      </div>
    </div>
  );
};

export default Carousel;