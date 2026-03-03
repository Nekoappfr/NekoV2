
import React, { useState, useMemo, useRef } from 'react';
import { MOCK_SITTERS } from '../constants';

const StarIconFull = ({ className = "text-[#C25E72]" }: { className?: string }) => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const CheckIcon = ({ className = "text-[#C25E72]" }: { className?: string }) => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const ShieldIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

interface SitterProfileProps {
  sitterId: string | null;
  onBack: () => void;
  onMessageRequest?: () => void;
}

const SitterProfile: React.FC<SitterProfileProps> = ({ sitterId, onBack, onMessageRequest }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [service, setService] = useState<'boarding' | 'visit' | 'housesitting'>('boarding');
  const [visitsPerDay, setVisitsPerDay] = useState<number>(1);
  const bookingCardRef = useRef<HTMLDivElement>(null);

  const scrollToBooking = () => {
    bookingCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // On récupère les données de base du sitter ou Marie par défaut si non trouvé
  const baseSitter = useMemo(() => {
    return MOCK_SITTERS.find(s => s.id === sitterId) || MOCK_SITTERS[0];
  }, [sitterId]);

  const sitter = useMemo(() => ({
    ...baseSitter,
    age: 28,
    neighborhood: baseSitter.location,
    rating: baseSitter.rating,
    reviewsCount: baseSitter.totalBookings || 127,
    repeatClientRate: 92,
    price: baseSitter.priceFrom || 13,
    responseTime: baseSitter.responseTime || "moins de 2h",
    responseRate: 100,
    bio: `Passionnée par les félins depuis mon enfance, j'ai grandi entourée de chats. Aujourd'hui habitant à ${baseSitter.location}, je propose mes services pour chouchouter vos compagnons pendant vos absences. Je suis calme, patiente et très attentive aux signes de stress ou aux besoins spécifiques de chaque animal. \n\nChez moi, c'est comme à la maison : câlins, jeux et respect du rythme de vie de votre chat sont mes priorités. Je travaille à mon domicile, ce qui me permet d'assurer une présence quasi-permanente.`,
    verified: {
      id: true,
      criminalRecord: true,
      address: true,
      interview: true,
      homeVisit: true,
      insurance: true,
      acaced: true
    },
    experience: {
      years: baseSitter.experienceYears || 6,
      animalsCared: baseSitter.totalBookings * 1.5 || 243
    },
    skills: [
      { name: "Médicaments", icon: "💊" },
      { name: "Chatons", icon: "🐾" },
      { name: "Chats d'intérieur", icon: "🐱" },
      { name: "Secours (PSC1)", icon: "🚨" },
      { name: "Nocturnes", icon: "🌙" }
    ],
    details: {
      types: ["Chats", "NAC"],
      maxWeight: "10kg",
      simultaneous: 2,
      garden: false,
      smoker: false,
      children: false,
      otherPets: true,
      flat: "Appartement calme, 45m²"
    },
    photos: [
      baseSitter.image,
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600",
      "https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80&w=600",
      "https://images.unsplash.com/photo-1533733358354-22119bb4a50d?q=80&w=600",
      "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?q=80&w=600"
    ]
  }), [baseSitter]);

  const reviews = useMemo(() => Array.from({ length: 5 }, (_, i) => ({
    id: i,
    name: ["Julie B.", "Marc A.", "Chloe S.", "Antoine P.", "Emma R."][i],
    pet: ["Oscar", "Minouche", "Cachou", "Simba", "Luna"][i],
    date: "Janvier 2026",
    text: [
      `${sitter.name.split(' ')[0]} est une perle. Oscar est d'habitude très timide mais il s'est tout de suite senti à l'aise.`,
      "Tout était parfait. Une personne qui connaît très bien les chats et leurs comportements.",
      "Garde impeccable. Très sérieuse et donne des nouvelles régulièrement.",
      "Simba a passé un super séjour ! Les photos quotidiennes sont un vrai plus.",
      "Une confiance absolue. Luna était ravie et nous aussi. Merci !"
    ][i],
    rating: 5,
    avatar: `https://i.pravatar.cc/150?u=review${sitter.id}${i}`
  })), [sitter]);

  const priceCalculation = useMemo(() => {
    const defaultRes = { total: 0, count: 0, label: '0 nuit', breakdown: `${sitter.price}€ x 0 nuits` };
    if (service === 'visit') {
      defaultRes.label = '0 jour';
      defaultRes.breakdown = `${sitter.price}€ x 0 visite`;
    } else if (service === 'housesitting') {
      defaultRes.label = '0 jour';
      defaultRes.breakdown = `${sitter.price}€ x 0 jour`;
    }

    if (!startDate || !endDate) return defaultRes;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.max(0, Math.round(diffTime / (1000 * 60 * 60 * 24)));

    if (service === 'boarding') {
      const total = diffDays * sitter.price;
      const nightLabel = diffDays <= 1 ? 'nuit' : 'nuits';
      return { total, count: diffDays, label: `${diffDays} ${nightLabel}`, breakdown: `${sitter.price}€ x ${diffDays} ${nightLabel}` };
    } else if (service === 'visit') {
      const daysCount = diffDays + 1;
      const totalUnits = daysCount * visitsPerDay;
      const total = totalUnits * sitter.price;
      const visitLabel = totalUnits <= 1 ? 'visite' : 'visites';
      return { total, count: daysCount, label: `${daysCount} j.`, breakdown: `${sitter.price}€ x ${totalUnits} ${visitLabel}` };
    } else {
      const daysCount = diffDays + 1;
      const total = daysCount * sitter.price;
      const dayLabel = daysCount <= 1 ? 'jour' : 'jours';
      return { total, count: daysCount, label: `${daysCount} ${dayLabel}`, breakdown: `${sitter.price}€ x ${daysCount} ${dayLabel}` };
    }
  }, [startDate, endDate, service, visitsPerDay, sitter.price]);

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-16 overflow-x-hidden">
      {/* HEADER COMPACT */}
      <nav className="sticky top-0 left-0 right-0 bg-[#FAFAFA]/95 backdrop-blur-md border-b border-[#E9E9E7] z-[60] px-4 lg:px-8 py-2.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-[#F0F0EF] rounded-md transition-all active:scale-90">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1C1C1B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </button>
          <div className="flex items-center gap-2.5">
            <img src={sitter.photos[0]} className="w-7 h-7 rounded-full object-cover border border-[#F0F0EF]" alt={sitter.name} />
            <div className="flex flex-col">
              <span className="font-bold text-[12px] text-[#1C1C1B] leading-none">{sitter.name}</span>
              <div className="flex items-center gap-1 mt-0.5"><StarIconFull /><span className="text-[9px] font-bold opacity-40">{sitter.rating}</span></div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={onMessageRequest}
            className="px-3.5 py-1.5 rounded-lg border border-[#1C1C1B] text-[#1C1C1B] font-bold text-[10px] md:text-[11px] hover:bg-[#1C1C1B] hover:text-white transition-all active:scale-95"
          >
            Échanger
          </button>
          <button 
            onClick={scrollToBooking}
            className="btn-primary px-4 md:px-6 py-1.5 md:py-2 text-[10px] md:text-[11px] shadow-sm"
          >
            Réserver
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* COLONNE GAUCHE */}
          <div className="flex-1 space-y-8 w-full">
            
            {/* GALLERY COMPACTE */}
            <section className="space-y-4">
              <div className="grid grid-cols-4 grid-rows-2 gap-1.5 aspect-[21/9] rounded-[24px] overflow-hidden shadow-sm">
                <div className="col-span-2 row-span-2 relative group overflow-hidden">
                  <img src={sitter.photos[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms]" />
                </div>
                {sitter.photos.slice(1, 5).map((photo, i) => (
                  <div key={i} className="bg-[#F0F0EF] overflow-hidden group">
                    <img src={photo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                   <h1 className="text-[20px] md:text-[24px] font-bold text-[#1C1C1B] tracking-tight leading-none">{sitter.name}</h1>
                   <div className="flex items-center gap-1 px-2 py-0.5 bg-[#F0F0EF] rounded-md border border-[#E9E9E7]">
                     <StarIconFull />
                     <span className="text-[10px] font-bold text-[#1C1C1B]">{sitter.rating}</span>
                     <span className="text-[9px] font-medium text-[#1C1C1B]/40">({sitter.reviewsCount})</span>
                   </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-[#37352F]/40 text-[9px] font-bold uppercase tracking-widest pt-1">
                  <span className="flex items-center gap-1.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>{sitter.neighborhood}</span>
                  <span className="flex items-center gap-1.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>{sitter.responseTime}</span>
                  <span className="flex items-center gap-1.5 text-[#C25E72]"><ShieldIcon /> Vérifié</span>
                </div>
              </div>
            </section>

            {/* CERTIFICATION HAUTE DENSITÉ */}
            <section className="bg-white rounded-[24px] border border-[#E9E9E7] p-6 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="space-y-0.5">
                  <h3 className="text-[14px] font-bold tracking-tight text-[#1C1C1B]">Certification Neko</h3>
                  <p className="text-[10px] text-[#37352F]/40 font-medium italic">Sélection rigoureuse par nos experts.</p>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-[#F0F0EF] rounded-md">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#C25E72]"></div>
                   <span className="text-[8px] font-black uppercase tracking-widest text-[#1C1C1B]/40">Garanti</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                {[
                  { label: "Identité vérifiée", checked: sitter.verified.id },
                  { label: "Casier judiciaire", checked: sitter.verified.criminalRecord },
                  { label: "Adresse confirmée", checked: sitter.verified.address },
                  { label: "Entretien Neko", checked: sitter.verified.interview },
                  { label: "Visite domicile", checked: sitter.verified.homeVisit },
                  { label: "Assurance RC Pro", checked: sitter.verified.insurance },
                ].map((v, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-md border flex items-center justify-center ${
                      v.checked ? 'bg-[#C25E72]/5 border-[#C25E72]/20 text-[#C25E72]' : 'bg-[#F0F0EF] border-transparent text-[#1C1C1B]/20'
                    }`}>
                      {v.checked ? <CheckIcon className="text-[#C25E72]" /> : <ShieldIcon className="w-2.5 h-2.5" />}
                    </div>
                    <span className={`text-[11px] font-bold tracking-tight transition-colors ${v.checked ? 'text-[#1C1C1B]' : 'text-[#37352F]/30'}`}>
                      {v.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* BIO & INFOS */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-[16px] font-bold text-[#1C1C1B] tracking-tight">Mon histoire</h2>
                <div className="bg-white rounded-[20px] border border-[#E9E9E7] p-5 shadow-sm">
                  <p className="text-[13px] text-[#37352F]/70 leading-relaxed font-medium whitespace-pre-wrap">
                    {sitter.bio}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-[16px] font-bold text-[#1C1C1B] tracking-tight">Infos clés</h2>
                <div className="bg-white rounded-[20px] border border-[#E9E9E7] p-5 shadow-sm space-y-4">
                   <div className="space-y-0.5">
                     <p className="text-[8px] font-bold text-[#1C1C1B]/30 uppercase tracking-[0.1em]">Habitat</p>
                     <p className="text-[12px] font-bold text-[#1C1C1B] leading-tight">{sitter.details.flat}</p>
                   </div>
                   <div className="space-y-0.5">
                     <p className="text-[8px] font-bold text-[#1C1C1B]/30 uppercase tracking-[0.1em]">Espèces</p>
                     <p className="text-[12px] font-bold text-[#1C1C1B] leading-tight">{sitter.details.types.join(', ')}</p>
                   </div>
                </div>
              </div>
            </section>

            {/* AVIS HORIZONTAL COMPACT */}
            <section className="space-y-4 overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#E9E9E7] pb-3">
                <h2 className="text-[16px] font-bold text-[#1C1C1B] tracking-tight">Avis clients ({sitter.reviewsCount})</h2>
                <div className="text-[10px] font-bold text-[#C25E72] uppercase tracking-widest bg-[#C25E72]/5 px-2 py-0.5 rounded-md border border-[#C25E72]/10">Top Sitter</div>
              </div>
              
              <div className="horizontal-scroll-container no-scrollbar -mx-4 px-4 flex gap-3.5 overflow-x-auto snap-x snap-mandatory py-1">
                {reviews.map((r) => (
                  <div key={r.id} className="flex-shrink-0 w-[240px] md:w-[280px] bg-white rounded-[20px] border border-[#E9E9E7] p-4 shadow-sm space-y-3 snap-start group">
                    <div className="flex items-center gap-2.5">
                      <img src={r.avatar} className="w-8 h-8 rounded-md object-cover border border-[#E9E9E7] transition-all" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[12px] truncate leading-none mb-1">{r.name}</p>
                        <p className="text-[8px] text-[#37352F]/30 font-bold uppercase tracking-widest truncate">{r.pet} • {r.date}</p>
                      </div>
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        <StarIconFull />
                        <span className="text-[10px] font-bold">{r.rating}</span>
                      </div>
                    </div>
                    <p className="text-[12px] text-[#37352F]/70 font-medium italic leading-relaxed line-clamp-3">"{r.text}"</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* SIDEBAR RÉSERVATION PROFESSIONNELLE */}
          <aside className="w-full lg:w-[320px] lg:sticky lg:top-20 space-y-4">
            
            <div ref={bookingCardRef} className="bg-white rounded-[24px] border border-[#1C1C1B] p-5 shadow-lg relative scroll-mt-24">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#1C1C1B] text-white rounded-md text-[8px] font-black uppercase tracking-widest shadow-md">
                Dispo ce weekend
              </div>

              <div className="flex items-center justify-between mb-6 mt-3">
                <div>
                  <p className="text-[8px] font-bold text-[#37352F]/30 uppercase tracking-widest">À partir de</p>
                  <p className="text-[24px] font-bold text-[#1C1C1B] tracking-tighter leading-none">{sitter.price}€<span className="text-[12px] text-[#37352F]/20 font-medium ml-0.5">/nuit</span></p>
                </div>
                <div className="w-9 h-9 bg-[#F0F0EF] rounded-md flex items-center justify-center text-[#C25E72] border border-[#E9E9E7]">
                   <ShieldIcon className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2.5 mb-5">
                <div className="flex gap-1 p-1 bg-[#F0F0EF] rounded-md border border-[#E9E9E7]">
                  <button 
                    onClick={() => setService('boarding')}
                    className={`flex-1 py-2 rounded-md text-[8px] font-black uppercase tracking-tight transition-all ${service === 'boarding' ? 'bg-white text-[#1C1C1B] shadow-sm' : 'text-[#37352F]/40'}`}
                  >
                    Boarding
                  </button>
                  <button 
                    onClick={() => setService('visit')}
                    className={`flex-1 py-2 rounded-md text-[8px] font-black uppercase tracking-tight transition-all ${service === 'visit' ? 'bg-white text-[#1C1C1B] shadow-sm' : 'text-[#37352F]/40'}`}
                  >
                    Visits
                  </button>
                  <button 
                    onClick={() => setService('housesitting')}
                    className={`flex-1 py-2 rounded-md text-[8px] font-black uppercase tracking-tight transition-all ${service === 'housesitting' ? 'bg-white text-[#1C1C1B] shadow-sm' : 'text-[#37352F]/40'}`}
                  >
                    Sitting
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  <div className="bg-[#FAFAFA] p-3 rounded-lg border border-[#E9E9E7]">
                    <p className="text-[7px] font-bold text-[#1C1C1B]/30 uppercase tracking-widest mb-1">Arrivée</p>
                    <input type="date" className="w-full bg-transparent font-bold text-[11px] text-[#1C1C1B] outline-none" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                  </div>
                  <div className="bg-[#FAFAFA] p-3 rounded-lg border border-[#E9E9E7]">
                    <p className="text-[7px] font-bold text-[#1C1C1B]/30 uppercase tracking-widest mb-1">Départ</p>
                    <input type="date" className="w-full bg-transparent font-bold text-[11px] text-[#1C1C1B] outline-none" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="bg-[#F9F9F8] rounded-lg p-3 mb-5 border border-[#EDEDEC]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-medium text-[#37352F]/60">Sous-total</span>
                  <span className="text-[10px] font-bold text-[#1C1C1B]/30 tabular-nums">{priceCalculation.breakdown}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#EDEDEC] mt-1.5">
                  <span className="text-[12px] font-bold text-[#1C1C1B]">Total</span>
                  <span className="text-[15px] font-bold text-[#C25E72] tabular-nums">{priceCalculation.total}€</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <button className="btn-primary w-full py-2.5 text-[12px] shadow-sm active:scale-95 transition-all">
                  Réserver {priceCalculation.total > 0 && `· ${priceCalculation.total}€`}
                </button>
                <button onClick={onMessageRequest} className="w-full py-2 border border-[#1C1C1B] text-[#1C1C1B] rounded-lg font-bold text-[11px] hover:bg-[#F0F0EF] transition-all flex items-center justify-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  Échanger
                </button>
              </div>

              <div className="mt-5 pt-4 border-t border-[#F0F0EF] flex items-center justify-around opacity-40">
                <div className="flex flex-col items-center">
                   <p className="text-[12px] font-bold text-[#1C1C1B]">100%</p>
                   <p className="text-[7px] font-bold uppercase tracking-widest mt-0.5">Sûr</p>
                </div>
                <div className="w-[1px] h-6 bg-[#F0F0EF]"></div>
                <div className="flex flex-col items-center">
                   <p className="text-[12px] font-bold text-[#1C1C1B]">Free</p>
                   <p className="text-[7px] font-bold uppercase tracking-widest mt-0.5">Meet</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SitterProfile;
