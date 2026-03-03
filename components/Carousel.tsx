import React from 'react';
import { MOCK_LISTINGS } from '../constants';
import PetCard from './PetCard';

interface CarouselProps {
  onListingClick: (id: string) => void;
}

const Carousel: React.FC<CarouselProps> = ({ onListingClick }) => {
  return (
    <div className="relative w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {MOCK_LISTINGS.map((listing) => (
          <PetCard 
            key={listing.id} 
            listing={listing} 
            onClick={() => onListingClick(listing.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;