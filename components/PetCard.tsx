
import React from 'react';
import { PetListing } from '../types';
import { PinIcon, StarIcon } from '../constants';

interface PetCardProps {
  listing: PetListing;
  onClick: () => void;
}

const PetCard: React.FC<PetCardProps> = ({ listing, onClick }) => {
  const getServiceLabel = (type: string) => {
    switch (type) {
      case 'BOARDING': return 'garde chez le pet sitter';
      case 'house sitting': return 'house sitting';
      case 'drop in visits': return 'Visites';
      default: return type.toLowerCase();
    }
  };

  const applicantAvatars = Array.from({ length: Math.min(listing.responsesCount, 4) }, (_, i) => 
    `https://i.pravatar.cc/150?u=applicant${listing.id}${i}`
  );

  return (
    <div 
      className="flex-shrink-0 snap-start w-[180px] md:w-[280px] flex flex-col group cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between w-full mb-4 px-2">
        <div className="flex items-center gap-3 truncate mr-1">
          <img 
            src={listing.ownerAvatars[0]} 
            className="w-6 h-6 md:w-7 md:h-7 rounded-full object-cover border border-warm-border transition-all duration-500" 
            alt={listing.ownerName}
          />
          <span className="text-[16px] md:text-[18px] font-bold text-warm-text tracking-tight truncate">
            {listing.ownerName}
          </span>
        </div>
        <div className="flex items-center gap-1.5 opacity-60">
          <StarIcon />
          <span className="text-[14px] font-bold text-warm-text leading-[1.33]">{listing.rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="relative w-full h-[200px] md:h-[360px] rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 bg-warm-paper mb-6">
        <img 
          src={listing.image} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms] ease-out" 
          alt={listing.petName} 
        />
        
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 flex flex-col gap-2">
          <div className="px-2.5 md:px-4 py-1 md:py-1.5 bg-white/40 backdrop-blur-md border border-white/20 rounded-full shadow-sm w-fit">
            <span className="text-[8.5px] md:text-[11px] font-bold text-warm-text uppercase tracking-widest whitespace-nowrap">
              {getServiceLabel(listing.serviceType)}
            </span>
          </div>
        </div>

        {/* Overlay gradient plus sombre pour le texte blanc */}
        <div className="absolute inset-0 bg-gradient-to-t from-warm-text/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity pointer-events-none"></div>
        
        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10">
          <h3 
            className="text-[20px] md:text-[28px] font-bold leading-tight tracking-tight drop-shadow-md"
            style={{ color: 'white' }}
          >
            {listing.petName}
          </h3>
        </div>
      </div>

      <div className="flex flex-col px-2 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-warm-text text-[16px] md:text-[18px] font-bold leading-tight tracking-tight flex items-center gap-2 truncate">
            <PinIcon /> {listing.location}
          </span>
        </div>
        <div className="text-warm-text/50 text-[14px] md:text-[15px] font-bold tracking-tight leading-tight truncate">
          {listing.startDate.split('2026')[0]}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-warm-border">
          <div className="flex -space-x-2.5 overflow-hidden">
            {applicantAvatars.map((avatar, i) => (
              <img 
                key={i}
                src={avatar} 
                className="inline-block h-6 w-6 md:h-7 md:w-7 rounded-full ring-2 ring-white object-cover" 
                alt="applicant" 
              />
            ))}
            {listing.responsesCount > 4 && (
              <div className="h-6 w-6 md:h-7 md:w-7 rounded-full ring-2 ring-white bg-warm-paper flex items-center justify-center text-[11px] font-bold text-warm-text/40 leading-[1.33]">
                +{listing.responsesCount - 4}
              </div>
            )}
          </div>
          <span className="text-[10px] md:text-[12px] font-bold text-warm-text/40 uppercase tracking-wider whitespace-nowrap ml-2">
            {listing.responsesCount} candidats
          </span>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
