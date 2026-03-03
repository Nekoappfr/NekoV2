
import React from 'react';
import { motion } from 'motion/react';
import { User, ShieldCheck, ArrowRight, ChevronLeft } from 'lucide-react';

interface RoleSelectionProps {
  onSelect: (role: 'owner' | 'sitter') => void;
  onBack: () => void;
  intent: 'login' | 'join';
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelect, onBack, intent }) => {
  return (
    <div className="fixed inset-0 z-[200] bg-warm-bg flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-neko-rose/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-neko-rose/10 rounded-full blur-[120px]" />
      </div>

      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-warm-border shadow-sm hover:shadow-md transition-all active:scale-95 group"
      >
        <ChevronLeft className="w-5 h-5 text-warm-text/40 group-hover:text-warm-text transition-colors" />
        <span className="text-[14px] font-bold text-warm-text/60 group-hover:text-warm-text transition-colors">Retour</span>
      </motion.button>

      <div className="max-w-2xl w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* OPTION PROPRIÉTAIRE */}
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => onSelect('owner')}
            className="group relative bg-white border border-warm-border/50 hover:border-neko-rose/30 p-6 md:p-8 rounded-[32px] transition-all duration-500 text-left shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] active:scale-[0.98] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-neko-rose/5 rounded-bl-[80px] -translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
            
            <div className="w-12 h-12 bg-neko-rose/10 rounded-xl flex items-center justify-center text-neko-rose mb-6 group-hover:scale-110 transition-transform duration-500">
              <User className="w-6 h-6" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-[18px] font-bold text-warm-text tracking-tight mb-2">Propriétaire</h3>
              <p className="text-[13px] text-warm-text/40 font-medium leading-relaxed mb-6">
                Je cherche un voisin pour mon chat.
              </p>
              
              <div className="flex items-center gap-2 text-neko-rose font-bold text-[11px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                <span>Choisir</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </motion.button>

          {/* OPTION SITTER */}
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => onSelect('sitter')}
            className="group relative bg-warm-text border border-transparent hover:border-white/10 p-6 md:p-8 rounded-[32px] transition-all duration-500 text-left shadow-xl active:scale-[0.98] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-[80px] -translate-y-full group-hover:translate-y-0 transition-transform duration-700" />

            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500">
              <ShieldCheck className="w-6 h-6" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-[18px] font-bold text-white tracking-tight mb-2">Cat Sitter</h3>
              <p className="text-[13px] text-white/40 font-medium leading-relaxed mb-6">
                Je propose mes services de garde.
              </p>
              
              <div className="flex items-center gap-2 text-white font-bold text-[11px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                <span>Choisir</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </motion.button>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
           <p className="text-[10px] text-warm-text/20 font-bold uppercase tracking-[0.3em]">
             Neko Community — Paris 2026
           </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RoleSelection;
