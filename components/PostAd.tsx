import React, { useState, useRef } from 'react';
import { PricingTabType } from '../types';

interface AdForm {
  service: PricingTabType;
  startDate: string;
  endDate: string;
  location: string;
  petName: string;
  description: string;
  photoUrl: string | null;
  photoPosition: { x: number; y: number };
  firstName: string;
  lastName: string;
  contact: string;
}

const PostAd: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<AdForm>({
    service: 'boarding',
    startDate: '',
    endDate: '',
    location: '',
    petName: '',
    description: '',
    photoUrl: null,
    photoPosition: { x: 50, y: 50 },
    firstName: '',
    lastName: '',
    contact: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  // Validations par étape
  const isStep1Valid = formData.startDate !== '' && formData.endDate !== '' && formData.location.trim().length >= 3;
  const isStep2Valid = formData.petName.trim() !== '' && formData.description.trim().length >= 10;
  const isStep3Valid = formData.photoUrl !== null;
  const isStep4Valid = 
    formData.firstName.trim().length >= 2 && 
    formData.lastName.trim().length >= 2 && 
    formData.contact.trim().length >= 5;

  const handleNext = () => {
    if (step === 1 && isStep1Valid) setStep(2);
    else if (step === 2 && isStep2Valid) setStep(3);
    else if (step === 3 && isStep3Valid) setStep(4);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else onBack();
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData({ ...formData, photoUrl: url, photoPosition: { x: 50, y: 50 } });
    }
  };

  // Logique de recentrage manuel (Haut/Bas + Gauche/Droite)
  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!formData.photoUrl) return;
    isDragging.current = true;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    startPos.current = { x: clientX, y: clientY };
  };

  const onDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const deltaX = (clientX - startPos.current.x) / 5;
    const deltaY = (clientY - startPos.current.y) / 5;

    setFormData(prev => ({
      ...prev,
      photoPosition: {
        x: Math.max(0, Math.min(100, prev.photoPosition.x - deltaX)),
        y: Math.max(0, Math.min(100, prev.photoPosition.y - deltaY))
      }
    }));
    startPos.current = { x: clientX, y: clientY };
  };

  const stopDrag = () => {
    isDragging.current = false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStep4Valid) {
      alert(`Bravo ${formData.firstName} ! Votre compte est créé et votre annonce pour ${formData.petName} est publiée.`);
      onBack();
    }
  };

  const stepInfo = [
    { id: 1, label: 'Dates' },
    { id: 2, label: 'Chat' },
    { id: 3, label: 'Photo' },
    { id: 4, label: 'Compte' }
  ];

  const services: { id: PricingTabType; label: string }[] = [
    { id: 'boarding', label: 'Pension' },
    { id: 'visit', label: 'Visite' },
    { id: 'housesitting', label: 'Garde Maison' }
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-white animate-in slide-in-from-bottom duration-500 flex flex-col font-sans select-none overflow-hidden">
      {/* HEADER AFFINE */}
      <div className="px-6 py-3 border-b border-[#E9E9E7] flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <button 
          onClick={handleBack}
          className="p-2 -ml-2 hover:bg-[#F0F0EF] rounded-full transition-all active:scale-90"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1C1C1B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <span className="text-[12px] font-extrabold text-[#1C1C1B] tracking-tight uppercase opacity-60">Neko — Poster une annonce</span>
        <div className="w-8"></div>
      </div>

      {/* BARRE DE PROGRESSION TOP AFFINEE */}
      <div className="px-6 py-2.5 bg-white border-b border-[#F0F0EF] sticky top-[53px] z-10">
        <div className="max-w-xl mx-auto flex items-center gap-1.5">
          {stepInfo.map((s, idx) => (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center gap-1 flex-1">
                <div 
                  className={`h-1.5 w-full rounded-full transition-all duration-700 relative overflow-hidden ${
                    step >= s.id ? 'bg-[#C25E72]' : 'bg-[#F0F0EF]'
                  } ${step === s.id ? 'ring-2 ring-[#C25E72]/10' : ''}`}
                >
                  {step > s.id && (
                    <div className="absolute inset-0 bg-[#C25E72] flex items-center justify-center">
                       <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                  )}
                </div>
                <span className={`text-[8px] font-extrabold uppercase tracking-[0.1em] transition-colors ${
                  step === s.id ? 'text-[#C25E72]' : 'text-[#1C1C1B]/30'
                }`}>
                  {s.label}
                </span>
              </div>
              {idx < stepInfo.length - 1 && (
                <div className={`h-[1px] w-2 mt-[-10px] transition-colors duration-700 ${step > s.id ? 'bg-[#C25E72]' : 'bg-[#F0F0EF]'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden bg-[#FAFAFA]">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          
          {/* STEP 1: LOGISTIQUE */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-400 pb-10 px-6 max-w-xl mx-auto w-full">
              <div className="py-6">
                <h2 className="text-[20px] font-bold text-[#1C1C1B] tracking-tight mb-1">Configurez votre annonce</h2>
                <p className="text-[13px] text-[#37352F]/50 font-medium italic">Où, quand et comment ?</p>
              </div>

              <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6">
                {services.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, service: s.id })}
                    className={`px-5 py-2.5 rounded-lg text-[12px] font-bold whitespace-nowrap transition-all border-2 ${
                      formData.service === s.id 
                        ? 'bg-[#1C1C1B] text-white border-[#1C1C1B] shadow-lg' 
                        : 'bg-white text-[#1C1C1B] border-[#E9E9E7]'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-[#E9E9E7] p-4 shadow-sm group hover:border-[#C25E72]/30 transition-all mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F0F0EF] flex items-center justify-center text-[#1C1C1B]/40 group-hover:text-[#C25E72] transition-all">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] font-bold text-[#1C1C1B]/30 uppercase tracking-widest mb-0.5">Ville ou Quartier</p>
                    <input 
                      type="text" 
                      placeholder="Ex: Paris 11e..." 
                      className="text-[15px] text-[#1C1C1B] bg-transparent outline-none w-full font-bold placeholder:text-[#37352F]/10" 
                      value={formData.location} 
                      onChange={(e) => setFormData({...formData, location: e.target.value})} 
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E9E9E7] divide-y divide-[#F0F0EF] shadow-sm overflow-hidden mb-4">
                <div className="flex items-center gap-4 p-4 hover:bg-[#FAFAFA] transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-[#F0F0EF] flex items-center justify-center text-[#1C1C1B]/40 group-hover:text-[#C25E72] transition-all">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] font-bold text-[#1C1C1B]/30 uppercase tracking-widest mb-0.5">Départ</p>
                    <input type="date" className="text-[15px] text-[#1C1C1B] bg-transparent outline-none w-full font-bold" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} />
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 hover:bg-[#FAFAFA] transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-[#F0F0EF] flex items-center justify-center text-[#1C1C1B]/40 group-hover:text-[#C25E72] transition-all">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] font-bold text-[#1C1C1B]/30 uppercase tracking-widest mb-0.5">Retour</p>
                    <input type="date" className="text-[15px] text-[#1C1C1B] bg-transparent outline-none w-full font-bold" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PET IDENTITY */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-400 pb-10 px-6 max-w-xl mx-auto w-full">
              <div className="py-6">
                <h2 className="text-[20px] font-bold text-[#1C1C1B] tracking-tight mb-1">Portrait de {formData.petName || 'votre chat'}</h2>
                <p className="text-[13px] text-[#37352F]/50 font-medium italic">Racontez-nous son histoire.</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-[#E9E9E7] p-5 shadow-sm">
                  <p className="text-[9px] font-bold text-[#1C1C1B]/30 uppercase tracking-widest mb-1.5">Son prénom</p>
                  <input 
                    type="text" 
                    placeholder="Oscar, Luna..." 
                    className="text-[18px] text-[#1C1C1B] bg-transparent outline-none w-full font-bold" 
                    value={formData.petName} 
                    onChange={(e) => setFormData({...formData, petName: e.target.value})}
                  />
                </div>

                <div className="bg-white rounded-2xl border border-[#E9E9E7] p-5 shadow-sm">
                  <p className="text-[9px] font-bold text-[#1C1C1B]/30 uppercase tracking-widest mb-2">Caractère & Attentes</p>
                  <textarea 
                    rows={6}
                    placeholder="Est-il joueur ? Craintif ? Que doit savoir votre futur sitter ?"
                    className="text-[14px] text-[#1C1C1B] bg-transparent outline-none w-full font-medium leading-relaxed resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PHOTO RECADRAGE */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-400 pb-10 px-6 max-w-xl mx-auto w-full">
              <div className="py-6">
                <h2 className="text-[20px] font-bold text-[#1C1C1B] tracking-tight mb-1">Une photo de la star ?</h2>
                <p className="text-[13px] text-[#37352F]/50 font-medium italic">
                  {formData.photoUrl ? 'Ajustez le cadre en faisant glisser.' : 'Les annonces avec photo sont contactées 3x plus vite.'}
                </p>
              </div>

              <div 
                onMouseDown={startDrag}
                onMouseMove={onDrag}
                onMouseUp={stopDrag}
                onMouseLeave={stopDrag}
                onTouchStart={startDrag}
                onTouchMove={onDrag}
                onTouchEnd={stopDrag}
                className={`relative w-full aspect-square rounded-[32px] border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden group shadow-inner ${
                  formData.photoUrl 
                  ? 'border-transparent bg-[#F0F0EF]' 
                  : 'border-[#E9E9E7] bg-white hover:border-[#C25E72]/30'
                }`}
              >
                {formData.photoUrl ? (
                  <>
                    <img 
                      src={formData.photoUrl} 
                      className={`w-full h-full object-cover transition-transform duration-300 ${isDragging.current ? 'scale-105' : 'scale-100'}`}
                      style={{ 
                        objectPosition: `${formData.photoPosition.x}% ${formData.photoPosition.y}%`,
                        cursor: isDragging.current ? 'grabbing' : 'grab'
                      }} 
                      alt="Preview" 
                      draggable={false}
                    />
                    <div className="absolute top-4 right-4 z-20">
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                        className="bg-white/95 backdrop-blur-md p-3 rounded-lg shadow-lg hover:bg-white transition-all active:scale-95 border border-[#F0F0EF]"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1C1C1B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                      </button>
                    </div>
                    {/* INDICATEUR AFFINE */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-white text-[10px] font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline><polyline points="6 9 12 15 18 9"></polyline></svg>
                      Ajuster la position
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-[#1C1C1B]/20" onClick={() => fileInputRef.current?.click()}>
                    <div className="w-16 h-16 rounded-full bg-[#F5F5F4] flex items-center justify-center text-[#1C1C1B]/30 group-hover:text-[#C25E72] transition-all">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                    </div>
                    <span className="text-[13px] font-bold text-[#1C1C1B]/40 tracking-tight">Cliquer pour ajouter</span>
                  </div>
                )}
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
              </div>
            </div>
          )}

          {/* STEP 4: COMPTE */}
          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-400 pb-10 px-6 max-w-xl mx-auto w-full">
              <div className="py-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#1C1C1B] text-white flex items-center justify-center mx-auto mb-4 shadow-xl ring-4 ring-[#1C1C1B]/5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <h2 className="text-[20px] font-bold text-[#1C1C1B] tracking-tight mb-1">Créez votre compte Neko</h2>
                <p className="text-[13px] text-[#37352F]/50 font-medium italic">Pour finaliser votre annonce et recevoir des réponses.</p>
              </div>

              <div className="bg-white rounded-[24px] border border-[#E9E9E7] p-6 shadow-sm space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-left bg-[#F9F9F8] p-4 rounded-lg border border-[#EDEDEC] focus-within:border-[#C25E72]/30 transition-colors">
                    <p className="text-[9px] font-bold text-[#1C1C1B]/30 uppercase tracking-widest mb-1">Prénom</p>
                    <input 
                      type="text" 
                      placeholder="Amélie" 
                      className="text-[15px] text-[#1C1C1B] bg-transparent outline-none w-full font-bold" 
                      value={formData.firstName} 
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                  <div className="text-left bg-[#F9F9F8] p-4 rounded-lg border border-[#EDEDEC] focus-within:border-[#C25E72]/30 transition-colors">
                    <p className="text-[9px] font-bold text-[#1C1C1B]/30 uppercase tracking-widest mb-1">Nom <span className="text-[#C25E72] lowercase">(Anonyme)</span></p>
                    <input 
                      type="text" 
                      placeholder="Poulain" 
                      className="text-[15px] text-[#1C1C1B] bg-transparent outline-none w-full font-bold" 
                      value={formData.lastName} 
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="text-left bg-[#F9F9F8] p-4 rounded-lg border border-[#EDEDEC] focus-within:border-[#C25E72]/30 transition-colors">
                   <p className="text-[9px] font-bold text-[#1C1C1B]/30 uppercase tracking-widest mb-1.5">Email ou Téléphone</p>
                   <input 
                    type="text" 
                    placeholder="votre@email.fr" 
                    className="text-[16px] text-[#1C1C1B] bg-transparent outline-none w-full font-bold" 
                    value={formData.contact} 
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  />
                </div>
                
                <p className="text-[11px] text-[#37352F]/50 leading-relaxed text-center px-2 font-medium">
                  "Seule l'initiale de votre nom sera affichée. Votre vie privée est notre priorité."
                </p>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER ACTION AFFINE */}
        <div className="p-5 bg-white border-t border-[#E9E9E7] shadow-[0_-10px_30px_rgba(0,0,0,0.04)] z-20">
          <div className="max-w-xl mx-auto">
            {step < 4 ? (
              <button 
                type="button"
                onClick={handleNext}
                disabled={(step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid) || (step === 3 && !isStep3Valid)}
                className={`w-full py-4 rounded-lg text-[14px] font-bold transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 ${
                  ((step === 1 && isStep1Valid) || (step === 2 && isStep2Valid) || (step === 3 && isStep3Valid))
                  ? 'bg-[#1C1C1B] text-white hover:bg-[#C25E72]' 
                  : 'bg-[#F0F0EF] text-[#1C1C1B]/20 cursor-not-allowed'
                }`}
              >
                Suivant
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            ) : (
              <button 
                type="submit"
                disabled={!isStep4Valid}
                className={`w-full py-4 rounded-lg text-[14px] font-bold transition-all shadow-lg active:scale-[0.98] ${
                  isStep4Valid 
                  ? 'bg-[#C25E72] text-white hover:bg-[#A34D5E] shadow-[#C25E72]/20' 
                  : 'bg-[#F0F0EF] text-[#1C1C1B]/20 cursor-not-allowed'
                }`}
              >
                Publier mon annonce
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostAd;