import React from 'react';
import { motion } from 'motion/react';
import { Search, ShieldCheck, MapPin, Star, Heart, Users } from 'lucide-react';
import SmartCTA from './SmartCTA';
import { PricingTabType } from '../types';

export type HeroVariant = 'editorial' | 'trust-grid' | 'minimal' | 'immersive' | 'bento';

interface HeroProps {
  variant: HeroVariant;
  onViewStateChange: (view: any) => void;
  onSearchStateChange: (active: boolean) => void;
  activePricingTab: PricingTabType;
  onServiceClick: (tab: PricingTabType) => void;
}

const Hero: React.FC<HeroProps> = ({ 
  variant, 
  onViewStateChange, 
  onSearchStateChange, 
  activePricingTab, 
  onServiceClick 
}) => {
  
  const renderEditorial = () => (
    <section className="relative w-full bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-24 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 space-y-8 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-[#C25E72]/10 text-[#C25E72] text-[10px] font-bold uppercase tracking-widest mb-4">
              Communauté Parisienne d'Hôtes
            </span>
            <h1 className="font-hero text-4xl md:text-6xl lg:text-7xl text-[#1C1C1B] leading-[1.1] tracking-tight">
              L'élégance du <br />
              <span className="italic text-[#C25E72]">Cat-Sitting</span> <br />
              à domicile.
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-[#37352F]/60 max-w-lg mx-auto md:mx-0 font-medium"
          >
            Neko connecte les propriétaires de chats exigeants avec des voisins de confiance pour une garde sereine et attentionnée.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md mx-auto md:mx-0"
          >
            <SmartCTA onTrigger={() => onViewStateChange('lead_capture')} onSearchStateChange={onSearchStateChange} />
          </motion.div>

          <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#C25E72]" />
              <span className="text-xs font-bold text-[#1C1C1B]/70 uppercase tracking-wider">Assurance incluse</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#C25E72]" />
              <span className="text-xs font-bold text-[#1C1C1B]/70 uppercase tracking-wider">Voisins vérifiés</span>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative"
        >
          <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1200&auto=format&fit=crop" 
              className="w-full h-full object-cover"
              alt="Elegant cat"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C25E72] flex items-center justify-center text-white font-bold">M</div>
                <div>
                  <p className="text-xs font-bold text-[#1C1C1B]">Marie-Claire, Sitter à Paris 11e</p>
                  <div className="flex gap-0.5 mt-0.5">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-[#C25E72] text-[#C25E72]" />)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#C25E72]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#1C1C1B]/5 rounded-full blur-3xl"></div>
        </motion.div>
      </div>
    </section>
  );

  const renderTrustGrid = () => (
    <section className="relative w-full bg-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center space-y-6 mb-16">
          <h1 className="font-hero text-4xl md:text-5xl text-[#1C1C1B] leading-tight">
            La confiance d'un <span className="text-[#C25E72]">voisinage</span>, <br />
            la sérénité d'un service pro.
          </h1>
          <p className="text-[#37352F]/60 max-w-2xl mx-auto text-lg">
            Rejoignez 5 000+ parisiens qui confient leurs compagnons à des passionnés certifiés près de chez eux.
          </p>
          <div className="max-w-xl mx-auto pt-4">
            <SmartCTA onTrigger={() => onViewStateChange('lead_capture')} onSearchStateChange={onSearchStateChange} />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="aspect-square rounded-2xl overflow-hidden relative group cursor-pointer"
            >
              <img 
                src={`https://picsum.photos/seed/neko-trust-${i}/400/400`} 
                className="w-full h-full object-cover transition-all duration-500"
                alt="Community member"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Heart className="text-white fill-white w-6 h-6" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderMinimal = () => (
    <section className="w-full bg-[#FAFAFA] pt-20 pb-32">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#1C1C1B] rounded-2xl flex items-center justify-center shadow-xl">
              <Search className="text-white w-8 h-8" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[#1C1C1B]">
            Trouvez votre sitter idéal.
          </h1>
          <p className="text-xl text-[#37352F]/50 font-medium">
            Simple, local et sécurisé. Le meilleur du cat-sitting à Paris.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-2 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-[#E9E9E7]"
        >
          <SmartCTA onTrigger={() => onViewStateChange('lead_capture')} onSearchStateChange={onSearchStateChange} />
        </motion.div>

        <div className="flex justify-center gap-12 text-[#37352F]/40 font-bold uppercase tracking-widest text-[10px]">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Tous les arrondissements</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Paiement sécurisé</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            <span>4.9/5 sur Trustpilot</span>
          </div>
        </div>
      </div>
    </section>
  );

  const renderImmersive = () => (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1513245533132-aa7f70582741?q=80&w=2000&auto=format&fit=crop" 
        className="absolute inset-0 w-full h-full object-cover"
        alt="Cozy cat"
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      
      <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center items-start">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-2xl space-y-8"
        >
          <h1 className="font-hero text-5xl md:text-7xl text-white leading-tight">
            Parce qu'ils méritent <br />
            <span className="text-[#C25E72]">le meilleur</span> de Paris.
          </h1>
          <p className="text-xl text-white/80 font-medium">
            Une garde attentionnée, dans le confort de leur foyer ou chez un hôte passionné.
          </p>
          
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-[32px] border border-white/20 shadow-2xl max-w-xl">
            <SmartCTA onTrigger={() => onViewStateChange('lead_capture')} onSearchStateChange={onSearchStateChange} />
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => onViewStateChange('register-sitter')}
              className="px-6 py-3 bg-white text-[#1C1C1B] font-bold rounded-xl hover:bg-[#C25E72] hover:text-white transition-all"
            >
              Devenir Sitter
            </button>
            <button 
              onClick={() => onServiceClick('boarding')}
              className="px-6 py-3 bg-transparent border border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all"
            >
              Voir les services
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );

  const renderBento = () => (
    <section className="w-full bg-[#FAFAFA] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Search Block */}
          <div className="md:col-span-8 bg-white rounded-[40px] p-8 md:p-12 border border-[#E9E9E7] shadow-sm flex flex-col justify-between min-h-[400px]">
            <div className="space-y-4">
              <span className="text-[#C25E72] font-bold uppercase tracking-widest text-xs">Neko App Paris</span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1C1C1B]">
                Le cat-sitting <br /> réinventé.
              </h1>
            </div>
            <div className="mt-8">
              <SmartCTA onTrigger={() => onViewStateChange('lead_capture')} onSearchStateChange={onSearchStateChange} />
            </div>
          </div>

          {/* Trust Block */}
          <div className="md:col-span-4 bg-[#1C1C1B] rounded-[40px] p-8 text-white flex flex-col justify-between">
            <ShieldCheck className="w-12 h-12 text-[#C25E72]" />
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">100% Sécurisé</h3>
              <p className="text-white/60 text-sm">Chaque sitter est vérifié manuellement par notre équipe parisienne.</p>
            </div>
          </div>

          {/* Community Block */}
          <div className="md:col-span-4 bg-[#C25E72] rounded-[40px] p-8 text-white flex flex-col justify-between min-h-[240px]">
            <Users className="w-10 h-10" />
            <div className="space-y-1">
              <h3 className="text-xl font-bold">5 000+ Membres</h3>
              <p className="text-white/80 text-sm">Une communauté active dans tous les arrondissements.</p>
            </div>
          </div>

          {/* Image Block */}
          <div className="md:col-span-8 rounded-[40px] overflow-hidden relative group">
            <img 
              src="https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=1200&auto=format&fit=crop" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="Happy cat"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <p className="text-white font-hero text-2xl italic">"La meilleure décision pour mon chat."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  switch (variant) {
    case 'editorial': return renderEditorial();
    case 'trust-grid': return renderTrustGrid();
    case 'minimal': return renderMinimal();
    case 'immersive': return renderImmersive();
    case 'bento': return renderBento();
    default: return renderEditorial();
  }
};

export default Hero;
