
import React from 'react';
import { PricingTabType } from '../types';

const PriceIconDropIn = () => (
  <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 70C30 70 35 45 50 45C65 45 70 70 70 70" stroke="#1C1C1B" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="50" cy="50" r="20" stroke="#1C1C1B" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
    <path d="M45 55L50 60L60 50" stroke="#C25E72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PriceIconBoarding = () => (
  <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 75V45L50 30L70 45V75" stroke="#1C1C1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="45" y="60" width="10" height="15" stroke="#1C1C1B" strokeWidth="1" strokeDasharray="2 1" />
  </svg>
);

const PriceIconSitting = () => (
  <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 50C40 47 43 45 45 45C47 45 50 47 50 50C50 55 40 60 40 60" fill="#C25E72" fillOpacity="0.05" stroke="#C25E72" strokeWidth="1.5" strokeOpacity="0.6" />
    <circle cx="70" cy="30" r="4" stroke="#1C1C1B" strokeWidth="1" />
  </svg>
);

interface Plan {
  tabLabel: string;
  title: string;
  price: string;
  unit: string;
  desc: string;
  icon: React.ReactNode;
  cta: string;
  popular?: boolean;
}

interface PricingSectionProps {
  activeTab: PricingTabType;
  setActiveTab: (tab: PricingTabType) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ activeTab, setActiveTab }) => {
  const plans: Record<PricingTabType, Plan> = {
    boarding: { 
      tabLabel: "Garde chez le pet-sitter",
      title: "Famille d'accueil", 
      price: "13€", 
      unit: "nuit", 
      desc: "Votre chat séjourne chez un voisin passionné. Une ambiance chaleureuse et familiale pour des vacances en toute sérénité.",
      icon: <PriceIconBoarding />,
      cta: "Choisir la Garde",
      popular: true
    },
    visit: { 
      tabLabel: "Visites",
      title: "Visites à domicile", 
      price: "13€", 
      unit: "visite", 
      desc: "Un voisin vient jouer, nourrir et câliner votre chat directement chez vous. Idéal pour les chats qui préfèrent rester dans leur environnement familier.",
      icon: <PriceIconDropIn />,
      cta: "Choisir les Visites"
    },
    housesitting: { 
      tabLabel: "Home Sitting",
      title: "Home Sitting", 
      price: "Gratuit*", 
      unit: "jour", 
      desc: "Le sitter s'installe chez vous pendant votre absence. Votre chat garde ses habitudes et votre maison est surveillée.",
      icon: <PriceIconSitting />,
      cta: "Choisir le Home Sitting"
    }
  };

  const currentPlan = plans[activeTab];

  return (
    <section id="pricing" className="py-16 scroll-mt-24">
      <div className="text-center mb-16">
        <h2 className="text-[32px] md:text-[48px] font-bold text-warm-text leading-tight tracking-tight">
          Tarifs transparents
        </h2>
        <p className="text-[18px] text-warm-text/50 font-medium mt-4">
          Aucun frais caché, tout est inclus
        </p>
      </div>

      <div className="flex p-1.5 bg-warm-paper rounded-full mb-20 max-w-fit mx-auto border border-warm-border">
        {(Object.keys(plans) as PricingTabType[]).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-8 md:px-10 py-4 rounded-full text-[14px] md:text-[15px] font-bold transition-all duration-500 ${
              activeTab === key 
                ? 'bg-white text-warm-text shadow-xl' 
                : 'text-warm-text/40 hover:text-warm-text/70'
            }`}
          >
            {plans[key].tabLabel}
          </button>
        ))}
      </div>
      
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex flex-col items-center text-center">
          <div className="mb-12 w-24 h-24 bg-white rounded-[24px] border border-warm-border shadow-2xl flex items-center justify-center">
            {currentPlan.icon}
          </div>
          
          <div className="space-y-8 max-w-2xl">
            <div className="space-y-3">
              <h3 className="text-[28px] md:text-[36px] font-bold text-warm-text leading-tight tracking-tight">
                {currentPlan.title} — {currentPlan.price}
              </h3>
              <div className="flex items-center justify-center gap-4">
                <span className="text-[16px] text-warm-text/50 font-medium">/{currentPlan.unit}</span>
                {currentPlan.popular && (
                  <span className="text-[12px] font-bold text-neko-primary uppercase tracking-widest bg-neko-primary/5 px-4 py-1.5 rounded-full border border-neko-primary/10">Recommandé</span>
                )}
              </div>
            </div>
            
            <p className="text-[18px] md:text-[20px] text-warm-text/60 font-medium leading-relaxed">
              {currentPlan.desc}
            </p>
            
            <div className="pt-8 flex justify-center">
              <button className="btn-primary">
                {currentPlan.cta}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
