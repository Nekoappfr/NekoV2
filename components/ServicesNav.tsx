
import React from 'react';
import { PricingTabType } from '../types';

const MicroBoarding = () => (
  <svg width="12" height="12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-current transition-transform duration-500 group-active:scale-110">
    <path d="M20 80H80M40 80V65H60V80M40 65C40 60 45 58 50 58C55 58 60 60 60 65" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MicroVisits = () => (
  <svg width="12" height="12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-current transition-transform duration-500 group-active:scale-110">
    <path d="M35 85V30C35 30 40 25 65 30V85" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="42" cy="58" r="5" fill="currentColor"/>
  </svg>
);

const MicroSitting = () => (
  <svg width="12" height="12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-current transition-transform duration-500 group-active:scale-110">
    <path d="M30 80V20H70V80M30 50H70" stroke="currentColor" strokeWidth="10" strokeLinecap="round" opacity="0.6"/>
    <path d="M50 20V80" stroke="currentColor" strokeWidth="10" strokeLinecap="round"/>
  </svg>
);

interface ServicesNavProps {
  onServiceClick: (tab: PricingTabType) => void;
  activeTab: PricingTabType;
}

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const FootprintsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 16v-2.38C4 11.5 5.88 9 8 9a4 4 0 0 1 7 0c2.12 0 4 2.5 4 4.62V16" />
    <path d="M1.42 10.59a2.14 2.14 0 0 1 0-3.02 2.14 2.14 0 0 1 3.03 0" />
    <path d="M3 14.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5Z" />
    <path d="M21 14.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5Z" />
    <path d="M19.58 10.59a2.14 2.14 0 0 1 0-3.02 2.14 2.14 0 0 1 3.03 0" />
    <path d="M12 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    <path d="M12 19v-5" />
    <path d="M8 19v-2" />
    <path d="M16 19v-2" />
  </svg>
);

const SofaIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
    <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M4 18v2" />
    <path d="M20 18v2" />
    <path d="M12 4v9" />
  </svg>
);

const ServicesNav: React.FC<ServicesNavProps> = ({ onServiceClick, activeTab }) => {
  const services = [
    { id: 'boarding', label: 'Hébergement', icon: <HomeIcon />, description: 'Chez le sitter' },
    { id: 'visit', label: 'Visites', icon: <FootprintsIcon />, description: 'À votre domicile' },
    { id: 'housesitting', label: 'Garderie', icon: <SofaIcon />, description: 'Présence journée' },
  ];

  return (
    <div className="w-full py-6 md:py-10">
      <div className="flex flex-row items-center justify-center gap-2 md:gap-6 px-2 md:px-4">
        {services.map((service) => {
          const isActive = activeTab === service.id;
          return (
            <button
              key={service.id}
              onClick={() => onServiceClick(service.id as PricingTabType)}
              className={`relative flex flex-col items-start text-left p-3 md:p-5 min-w-[100px] md:min-w-[180px] rounded-xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-white shadow-[0_8px_20px_rgba(194,94,114,0.08)] ring-1 ring-[#C25E72]/20' 
                  : 'bg-transparent hover:bg-white/40 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2 md:mb-3">
                <div className={`transition-all duration-300 ${isActive ? 'text-[#C25E72] scale-110' : 'text-[#37352F]/40 group-hover:text-[#37352F]/70'}`}>
                  {service.icon}
                </div>
                {isActive && (
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#C25E72] animate-pulse" />
                )}
              </div>
              
              <div className="space-y-0.5">
                <span className={`block text-[11px] md:text-[14px] font-bold tracking-tight transition-colors ${isActive ? 'text-[#1C1C1B]' : 'text-[#37352F]/80'}`}>
                  {service.label}
                </span>
                <span className={`block text-[9px] md:text-[11px] font-medium transition-colors ${isActive ? 'text-[#C25E72]' : 'text-[#37352F]/40'}`}>
                  {service.description}
                </span>
              </div>

              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-[2px] md:h-[3px] bg-[#C25E72] rounded-t-xl" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesNav;
