import React from 'react';

const QuoteDoodle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-10 mb-4 group-hover:opacity-30 transition-opacity">
    <path d="M8 10C8 10 7 12 7 14M16 10C16 10 15 12 15 14" stroke="#1C1C1B" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="6" cy="10" r="4" stroke="#1C1C1B" strokeWidth="1.2" strokeDasharray="2 2" />
    <circle cx="18" cy="10" r="4" stroke="#1C1C1B" strokeWidth="1.2" strokeDasharray="2 2" />
  </svg>
);

const HeartDoodle = () => (
  <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="30" width="40" height="45" rx="4" stroke="#1C1C1B" strokeWidth="1.2" strokeDasharray="3 3" />
    <path d="M30 75V85L45 75" stroke="#1C1C1B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M40 50C40 47 43 45 45 45C47 45 50 47 50 50C50 55 40 60 40 60C40 60 30 55 30 50C30 47 33 45 35 45C37 45 40 47 40 50Z" fill="#C25E72" fillOpacity="0.05" stroke="#C25E72" strokeWidth="1.2" strokeOpacity="0.3" />
    <path d="M35 55L37 57L45 53" stroke="#1C1C1B" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
  </svg>
);

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Neko changed how I travel. Knowing Luna is with a neighbor who truly cares makes all the difference.",
    author: "Sarah L.",
    cat: "Luna",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: 2,
    quote: "Found the perfect sitter in 5 minutes. The meet & greet was so reassuring for my anxious Charlie.",
    author: "Thomas D.",
    cat: "Charlie",
    avatar: "https://i.pravatar.cc/150?u=thomas"
  },
  {
    id: 3,
    quote: "Professional, safe and so easy. My cat Oscar was so relaxed when I came back home.",
    author: "Elena R.",
    cat: "Oscar",
    avatar: "https://i.pravatar.cc/150?u=elena"
  },
  {
    id: 4,
    quote: "The best community in Paris. Verified neighbors who are actual cat lovers, not just sitters.",
    author: "Marc A.",
    cat: "Max",
    avatar: "https://i.pravatar.cc/150?u=marc"
  }
];

const OwnerTestimonials: React.FC = () => {
  return (
    <div className="space-y-48 py-16">
      {/* Minimalist Testimonials Section */}
      <div className="flex flex-col">
        <div className="flex items-center gap-8 mb-20">
          <h2 className="text-[32px] md:text-[48px] font-bold text-warm-text leading-tight tracking-tight">
            Paroles de voisins
          </h2>
          <div className="h-[1px] flex-1 bg-warm-border"></div>
        </div>
        
        <div className="horizontal-scroll-container no-scrollbar -mx-6 px-6 gap-12 md:gap-24">
          {TESTIMONIALS.map((t) => (
            <div 
              key={t.id} 
              className="flex-shrink-0 w-[300px] md:w-[420px] flex flex-col group transition-all"
            >
              <div className="flex-1">
                <QuoteDoodle />
                <p className="text-[22px] md:text-[28px] font-bold text-warm-text/90 leading-relaxed mb-10 group-hover:text-warm-text transition-colors duration-500 tracking-tight">
                  "{t.quote}"
                </p>
              </div>
              
              <div className="flex items-center gap-5 pt-10 border-t border-warm-border">
                <img 
                  src={t.avatar} 
                  className="w-12 h-12 rounded-full border border-warm-border object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" 
                  alt={t.author} 
                />
                <div className="flex flex-col">
                  <span className="text-[16px] font-bold text-warm-text leading-tight">{t.author}</span>
                  <span className="text-[14px] font-medium text-warm-text/40">Propriétaire de {t.cat}</span>
                </div>
              </div>
            </div>
          ))}
          <div className="min-w-[10px] md:min-w-[40px] h-full flex-shrink-0"></div>
        </div>
      </div>

      {/* Advisor Section Style */}
      <div className="pt-12">
        <h2 className="text-[32px] md:text-[48px] font-bold text-warm-text leading-tight tracking-tight mb-20">
          Une question ?
        </h2>
        
        <div className="flex flex-col md:flex-row items-start gap-12 md:gap-24">
          <div className="flex-shrink-0 opacity-40 hover:opacity-100 transition-all duration-700">
            <HeartDoodle />
          </div>
          <div className="flex-1 space-y-10">
            <p className="text-[24px] md:text-[32px] text-warm-text/70 font-bold leading-relaxed max-w-[600px] tracking-tight">
              Notre équipe vous répond en quelques heures. <br className="hidden md:block" />
              Nous sommes de vraies personnes, passionnées par les chats.
            </p>
            <button className="bg-white border-2 border-warm-text hover:bg-warm-text hover:text-white text-warm-text text-[16px] font-bold px-12 py-5 rounded-lg transition-all duration-300 active:scale-95 shadow-2xl">
              Nous contacter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerTestimonials;