import React from 'react';

const GuaranteeDoodle1 = () => (
  <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
    <path d="M50 20L80 35V65L50 80L20 65V35L50 20Z" stroke="#1C1C1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
    <path d="M40 50L47 57L60 43" stroke="#1C1C1B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GuaranteeDoodle2 = () => (
  <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
    <circle cx="35" cy="50" r="15" stroke="#1C1C1B" strokeWidth="1.5" strokeDasharray="4 2"/>
    <circle cx="65" cy="50" r="15" stroke="#C25E72" strokeWidth="1.5" strokeOpacity="0.4"/>
    <path d="M45 50H55" stroke="#1C1C1B" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const GuaranteeDoodle3 = () => (
  <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
    <path d="M25 40C25 40 30 25 50 25C70 25 75 40 75 40V65" stroke="#1C1C1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="42" y="45" width="16" height="12" rx="2" fill="#C25E72" fillOpacity="0.05" stroke="#C25E72" strokeWidth="1" strokeOpacity="0.4"/>
  </svg>
);

const TrustBar: React.FC = () => {
  const guarantees = [
    { 
      Illustration: GuaranteeDoodle1,
      title: 'Profils certifiés',
      desc: 'Chaque sitter est vérifié manuellement (identité, domicile et antécédents).'
    },
    { 
      Illustration: GuaranteeDoodle2,
      title: 'Rencontre gratuite',
      desc: 'Rencontrez votre sitter gratuitement avant de confirmer votre réservation.'
    },
    { 
      Illustration: GuaranteeDoodle3,
      title: 'Remboursement intégral',
      desc: 'Remboursement total en cas d\'annulation de dernière minute.'
    }
  ];

  return (
    <div className="py-8">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-[32px] md:text-[48px] font-bold text-warm-text leading-tight tracking-tight">
          La Garantie Sérénité
        </h2>
        <p className="text-[18px] text-warm-text/50 font-medium mt-4">
          Confiance et sécurité avant tout
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
        {guarantees.map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center group">
            <div className="mb-8 relative flex items-center justify-center w-20 h-20 rounded-[24px] bg-warm-paper border border-warm-border shadow-sm group-hover:border-neko-primary/30 transition-all duration-500">
               <item.Illustration />
            </div>
            
            <div className="space-y-4 px-4">
              <h3 className="text-[20px] md:text-[22px] font-bold text-warm-text leading-tight group-hover:text-neko-primary transition-colors duration-500">
                {item.title}
              </h3>
              <p className="text-[16px] text-warm-text/60 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBar;