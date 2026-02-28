
import React from 'react';

interface RoleSelectionProps {
  onSelect: (role: 'owner' | 'sitter') => void;
  onBack: () => void;
  intent: 'login' | 'join';
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelect, onBack, intent }) => {
  return (
    <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-6 animate-in slide-in-from-bottom duration-500 overflow-hidden">
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 p-3 rounded-full hover:bg-[#F0F0EF] transition-all active:scale-90"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1C1C1B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>

      <div className="max-w-xl w-full space-y-10">
        <header className="text-center space-y-2">
          <h1 className="text-[22px] md:text-[28px] font-bold text-[#1C1C1B] tracking-tight">
            {intent === 'login' ? 'Heureux de vous revoir' : 'Bienvenue chez Neko'}
          </h1>
          <p className="text-[14px] text-[#37352F]/40 font-medium italic">
            Choisissez votre profil pour continuer
          </p>
        </header>

        <div className="bg-[#F0F0EF] p-2 rounded-[28px] space-y-2">
          {/* OPTION PROPRIÉTAIRE */}
          <button 
            onClick={() => onSelect('owner')}
            className="w-full group bg-white border border-transparent hover:border-[#C25E72]/20 p-6 rounded-[24px] transition-all duration-300 flex items-center gap-6 text-left shadow-sm active:scale-[0.98]"
          >
            <div className="w-12 h-12 bg-[#F0F0EF] rounded-xl flex items-center justify-center group-hover:bg-[#C25E72]/10 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C25E72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-[16px] font-bold text-[#1C1C1B] tracking-tight leading-none mb-1">Propriétaire de chat</h3>
              <p className="text-[12px] text-[#37352F]/50 font-medium leading-tight">Je cherche un voisin de confiance pour mon chat.</p>
            </div>
            <div className="text-[#1C1C1B]/10 group-hover:text-[#C25E72] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </button>

          {/* OPTION SITTER */}
          <button 
            onClick={() => onSelect('sitter')}
            className="w-full group bg-white border border-transparent hover:border-[#1C1C1B]/20 p-6 rounded-[24px] transition-all duration-300 flex items-center gap-6 text-left shadow-sm active:scale-[0.98]"
          >
            <div className="w-12 h-12 bg-[#F0F0EF] rounded-xl flex items-center justify-center group-hover:bg-[#1C1C1B]/10 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1C1C1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2.83 0 0 1 0 2.83 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-[16px] font-bold text-[#1C1C1B] tracking-tight leading-none mb-1">Cat Sitter</h3>
              <p className="text-[12px] text-[#37352F]/50 font-medium leading-tight">Je souhaite proposer mes services aux voisins.</p>
            </div>
            <div className="text-[#1C1C1B]/10 group-hover:text-[#1C1C1B] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </button>
        </div>

        <div className="text-center pt-4">
           <p className="text-[11px] text-[#37352F]/30 font-bold uppercase tracking-widest leading-relaxed px-12">
             Neko Community © 2026 — Paris
           </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
