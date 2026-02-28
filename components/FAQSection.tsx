
import React, { useState } from 'react';

const FAQDoodle = () => (
  <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
    <circle cx="50" cy="45" r="18" stroke="#1C1C1B" strokeWidth="1.2" strokeDasharray="4 2" />
    <path d="M65 60L80 75" stroke="#1C1C1B" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M45 40L55 50" stroke="#C25E72" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
    <path d="M55 40L45 50" stroke="#C25E72" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
  </svg>
);

const FAQItem = ({ q, a }: { q: string, a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-warm-border last:border-0">
      <button 
        onClick={() => setOpen(!open)} 
        className="w-full py-8 flex items-center justify-between text-left group transition-all"
      >
        <span className="text-[20px] md:text-[24px] font-bold text-warm-text group-hover:text-neko-primary transition-colors duration-500 tracking-tight">
          {q}
        </span>
        <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-warm-paper transition-all duration-500 ${open ? 'rotate-45 bg-neko-primary/10' : ''}`}>
          <span className={`text-[24px] font-light leading-none ${open ? 'text-neko-primary' : 'text-warm-text/40'}`}>+</span>
        </div>
      </button>
      {open && (
        <div className="pb-10 animate-in fade-in slide-in-from-top-6 duration-500">
          <p className="text-[18px] text-warm-text/60 leading-relaxed font-medium max-w-[700px]">
            {a}
          </p>
        </div>
      )}
    </div>
  );
};

const FAQSection: React.FC = () => {
  return (
    <section className="pt-24 pb-0 border-t border-warm-border">
      <div className="flex flex-col md:flex-row gap-16 md:gap-32">
        <div className="w-full md:w-1/3">
          <FAQDoodle />
          <h2 className="text-[32px] md:text-[48px] font-bold text-warm-text leading-tight mb-8 tracking-tight">
            Questions <br /> Fréquentes
          </h2>
          <p className="text-[18px] text-warm-text/50 font-medium leading-relaxed">
            Tout ce que vous devez savoir sur la communauté Neko et la sécurité.
          </p>
        </div>
        
        <div className="flex-1">
          <div className="space-y-0">
            <FAQItem 
              q="Comment fonctionne Neko ?" 
              a="Neko fonctionne en vous permettant de poster une annonce détaillée des besoins spécifiques de votre chat. Les sitters locaux vérifiés postulent directement, vous permettant de choisir le match parfait via notre plateforme sécurisée." 
            />
            <FAQItem 
              q="Comment les sitters sont-ils vérifiés ?" 
              a="Notre processus rigoureux comprend la vérification de l'identité, un entretien personnel et des visites obligatoires à domicile pour s'assurer que chaque résidence de sitter répond à nos normes de sécurité élevées." 
            />
            <FAQItem 
              q="Que se passe-t-il s'il arrive quelque chose à mon chat ?" 
              a="Chaque sitter suit votre protocole d'urgence spécifique. Nous fournissons une ligne d'assistance vétérinaire 24h/24 et 7j/7 et avançons tous les frais médicaux si nécessaire, protégés par notre garantie de sécurité de 1M€." 
            />
            <FAQItem 
              q="La rencontre est-elle obligatoire ?" 
              a="Oui, nous la recommandons fortement. Elle est gratuite et vous permet de voir comment votre chat réagit au sitter avant de confirmer toute réservation." 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
