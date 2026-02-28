import React from 'react';

const CatDoodle1 = () => (
  <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
    <path d="M30 70C30 70 35 40 50 40C65 40 70 70 70 70" stroke="#1C1C1B" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M40 42L35 30L45 38" stroke="#1C1C1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M60 42L65 30L55 38" stroke="#1C1C1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="43" cy="55" r="1.5" fill="#1C1C1B"/>
    <circle cx="57" cy="55" r="1.5" fill="#1C1C1B"/>
    <rect x="25" y="75" width="50" height="15" rx="2" stroke="#1C1C1B" strokeWidth="1" strokeDasharray="3 3"/>
  </svg>
);

const CatDoodle2 = () => (
  <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
    <circle cx="55" cy="45" r="20" stroke="#1C1C1B" strokeWidth="1.5" strokeDasharray="4 2"/>
    <path d="M70 60L85 75" stroke="#1C1C1B" strokeWidth="2" strokeLinecap="round"/>
    <path d="M30 65C30 65 32 45 42 45" stroke="#1C1C1B" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CatDoodle3 = () => (
  <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
    <path d="M20 70C20 70 25 45 40 45C55 45 60 70 60 70" stroke="#1C1C1B" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="35" y="25" width="30" height="30" rx="6" stroke="#1C1C1B" strokeWidth="1.2" strokeDasharray="3 3"/>
  </svg>
);

const HowItWorks: React.FC = () => {
  const steps = [
    { 
      Illustration: CatDoodle1,
      title: 'Déposer une annonce',
      desc: 'Postez votre demande gratuitement. Dates, habitudes et préférences de votre chat.'
    },
    { 
      Illustration: CatDoodle2,
      title: 'Étudier les profils',
      desc: 'Recevez des messages de voisins vérifiés et passionnés dans votre quartier.'
    },
    { 
      Illustration: CatDoodle3,
      title: 'Rencontrer et réserver',
      desc: 'Rencontrez votre match, réservez en toute sérénité et profitez de vos vacances.'
    }
  ];

  return (
    <div className="w-full">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <h2 className="text-[32px] md:text-[48px] font-bold text-warm-text leading-tight mb-6 tracking-tight">
          Comment ça marche
        </h2>
        <p className="text-[18px] md:text-[20px] text-warm-text/60 font-medium leading-relaxed">
          Neko est la première communauté de pet sitting de confiance entre voisins à Paris.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-start text-left group bg-white border border-warm-border rounded-[32px] p-10 shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="mb-8 relative flex items-center justify-center w-16 h-16 rounded-[20px] bg-warm-paper group-hover:bg-neko-primary/10 transition-colors duration-500">
               <step.Illustration />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-[20px] md:text-[22px] font-bold text-warm-text leading-tight group-hover:text-neko-primary transition-colors duration-500">
                {step.title}
              </h3>
              <p className="text-[16px] text-warm-text/60 leading-relaxed font-medium">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;