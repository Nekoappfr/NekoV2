
import React from 'react';
import { MOCK_SITTERS, StarIcon, PinIcon, ShieldIcon } from '../constants';

interface SitterListProps {
  onSitterClick?: (id: string) => void;
}

const SitterList: React.FC<SitterListProps> = ({ onSitterClick }) => {
  return (
    <div className="w-full">
      <div className="horizontal-scroll-container no-scrollbar py-2 gap-2.5 md:gap-8 lg:gap-10">
        {MOCK_SITTERS.map((sitter) => (
          <div 
            key={sitter.id} 
            onClick={() => onSitterClick?.(sitter.id)}
            className="flex-shrink-0 snap-start w-[200px] md:w-[300px] flex flex-col group cursor-pointer"
          >
            
            <div className="flex items-center justify-between w-full mb-4 px-2">
              <div className="flex items-center gap-3 truncate mr-1">
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-warm-paper flex items-center justify-center border border-warm-border flex-shrink-0">
                  <ShieldIcon />
                </div>
                <span className="text-[18px] md:text-[20px] font-bold text-warm-text tracking-tight truncate">
                  {sitter.name}
                </span>
              </div>
              <div className="flex items-center gap-1.5 opacity-60">
                <StarIcon />
                <span className="text-[14px] font-bold text-warm-text leading-[1.33]">{sitter.rating}</span>
              </div>
            </div>

            <div className="relative w-full h-[220px] md:h-[400px] rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 bg-warm-paper mb-6">
              <img 
                src={sitter.image} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms] ease-out" 
                alt={sitter.name} 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-warm-text/40 via-transparent to-transparent opacity-40 group-hover:opacity-60"></div>
              
              <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 z-10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 bg-white/40 backdrop-blur-md px-4 py-1.5 rounded-full flex-shrink-0 border border-white/20">
                  <span className="text-[11px] font-bold text-white leading-[1.33] uppercase tracking-widest">
                    {sitter.isVerified ? 'Vérifié' : 'Voisin'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col px-2 space-y-3">
              <div>
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <span className="text-warm-text text-[16px] md:text-[18px] font-bold leading-tight tracking-tight flex items-center gap-2 truncate">
                    <PinIcon /> {sitter.location}
                  </span>
                  <span className="text-warm-text text-[16px] md:text-[18px] font-extrabold">
                    {sitter.priceFrom}€
                  </span>
                </div>
                <p className="text-warm-text/60 text-[15px] font-medium leading-relaxed italic line-clamp-2">
                  "{sitter.review.text}"
                </p>
              </div>
              
              <div className="flex items-center gap-4 pt-4 border-t border-warm-border">
                <div className="flex -space-x-2.5">
                  {[1,2,3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=rev${sitter.id}${i}`} className="w-6 h-6 rounded-full border-2 border-white shadow-md" />
                  ))}
                </div>
                <span className="text-[12px] font-bold text-warm-text/40 uppercase tracking-widest">
                  {sitter.totalBookings} avis
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className="min-w-[20px] md:min-w-[60px] h-full flex-shrink-0"></div>
      </div>
    </div>
  );
};

export default SitterList;
