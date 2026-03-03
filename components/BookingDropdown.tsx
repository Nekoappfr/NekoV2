
import React, { useState, useMemo } from 'react';
import { X, Camera } from 'lucide-react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../src/utils/cropImage';

type OverlayState = 'search' | 'preview' | 'account' | 'success';
type CareType = 'sitter' | 'home' | 'visits';
type ActiveSection = 'dates' | 'location' | 'pet';
type DateSubTab = 'dates' | 'flexible';

interface BookingDropdownProps {
  onClose: () => void;
  onDatesSelected: (start: string, end: string) => void;
}

const BookingDropdown: React.FC<BookingDropdownProps> = ({ onClose, onDatesSelected }) => {
  const [overlayState, setOverlayState] = useState<OverlayState>('search');
  const [activeSection, setActiveSection] = useState<ActiveSection>('location');
  const [dateSubTab, setDateSubTab] = useState<DateSubTab>('dates');
  
  // Form State
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [address, setAddress] = useState('');
  const [careType, setCareType] = useState<CareType | null>(null);
  const [visitFrequency, setVisitFrequency] = useState<1 | 2>(1);
  const [petName, setPetName] = useState('');
  const [description, setDescription] = useState('');
  const [petPhotos, setPetPhotos] = useState<string[]>([]);
  const [isNeutered, setIsNeutered] = useState(false);
  const [isChipped, setIsChipped] = useState(false);

  // Cropper State
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [croppingIndex, setCroppingIndex] = useState<number | null>(null);

  const today = new Date();
  
  const monthsToRender = useMemo(() => {
    const months = [];
    for (let i = 0; i < 6; i++) {
      months.push(new Date(today.getFullYear(), today.getMonth() + i, 1));
    }
    return months;
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const padding = (firstDay === 0 ? 6 : firstDay - 1);
    const days = [];
    for (let i = 0; i < padding; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  };

  const handleDateClick = (date: Date) => {
    const targetDate = new Date(date);
    targetDate.setHours(0,0,0,0);
    const todayCompare = new Date(today);
    todayCompare.setHours(0,0,0,0);

    if (targetDate < todayCompare) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (date < startDate) {
        setStartDate(date);
      } else {
        setEndDate(date);
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
        onDatesSelected(
          startDate.toLocaleDateString('fr-FR', options),
          date.toLocaleDateString('fr-FR', options)
        );
      }
    }
  };

  const isSelected = (date: Date) => (startDate && date.getTime() === startDate.getTime()) || (endDate && date.getTime() === endDate.getTime());
  const isInRange = (date: Date) => startDate && endDate && date > startDate && date < endDate;

  // Validation Checkers
  const areDatesValid = () => (startDate && endDate) || dateSubTab === 'flexible';
  const isLocationValid = () => address.trim().length > 5 && careType !== null;
  const isPetValid = () => petName.trim().length > 0 && petPhotos.length > 0;

  // Price Estimation Logic
  const priceDetails = useMemo(() => {
    const isFlexible = dateSubTab === 'flexible';
    let nights = 0;
    let days = 0;

    if (startDate && endDate) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      days = nights + 1;
    } else if (isFlexible) {
      nights = 7;
      days = 8;
    }

    let total = 0;
    let label = '';

    if (!careType) {
      total = 0;
      label = nights > 0 ? `${nights} nuit${nights > 1 ? 's' : ''}` : "En attente de dates";
    } else if (careType === 'visits') {
      total = days * visitFrequency * 13;
      label = `${days} jours × ${visitFrequency} visite${visitFrequency > 1 ? 's' : ''}`;
    } else {
      total = nights * 13;
      label = `${nights} nuit${nights > 1 ? 's' : ''}`;
    }
    
    return { total, label };
  }, [startDate, endDate, careType, visitFrequency, dateSubTab]);

  const clearAll = () => {
    setStartDate(null);
    setEndDate(null);
    setAddress('');
    setCareType(null);
    setVisitFrequency(1);
    setPetName('');
    setDescription('');
    setIsNeutered(false);
    setIsChipped(false);
    setActiveSection('dates');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageToCrop(reader.result as string);
        setCroppingIndex(null); // New photo
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const onCropComplete = (_: any, pixels: any) => {
    setCroppedAreaPixels(pixels);
  };

  const saveCroppedImage = async () => {
    if (imageToCrop && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(imageToCrop, croppedAreaPixels, rotation);
        if (croppingIndex !== null) {
          setPetPhotos(prev => {
            const next = [...prev];
            next[croppingIndex] = croppedImage;
            return next;
          });
        } else {
          setPetPhotos(prev => [...prev, croppedImage]);
        }
        setImageToCrop(null);
        setCroppingIndex(null);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const removePhoto = (index: number) => {
    setPetPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (activeSection === 'location' && isLocationValid()) {
      setActiveSection('dates');
    } else if (activeSection === 'dates' && areDatesValid()) {
      setActiveSection('pet');
    } else if (activeSection === 'pet' && isPetValid()) {
      setOverlayState('preview');
    }
  };

  React.useEffect(() => {
    // Timer removed as per user request
  }, [overlayState]);

  const canProceed = useMemo(() => {
    if (activeSection === 'dates') return areDatesValid();
    if (activeSection === 'location') return isLocationValid();
    if (activeSection === 'pet') return isPetValid();
    return false;
  }, [activeSection, startDate, endDate, dateSubTab, address, careType, petName, petPhotos]);

  const renderMonth = (monthDate: Date) => (
    <div key={monthDate.toISOString()} className="mb-6 px-1">
      <h3 className="text-[13px] font-bold capitalize text-[#1C1C1B] mb-3">
        {monthDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
      </h3>
      <div className="grid grid-cols-7 gap-1">
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, idx) => (
          <div key={`${d}-${idx}`} className="text-center text-[10px] font-medium text-[#37352F]/40 pb-2 uppercase tracking-widest">{d}</div>
        ))}
        {getDaysInMonth(monthDate).map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const disabled = new Date(day).setHours(0,0,0,0) < new Date(today).setHours(0,0,0,0);
          const selected = isSelected(day);
          const range = isInRange(day);
          return (
            <div
              key={day.toISOString()}
              onClick={() => !disabled && handleDateClick(day)}
              className={`h-9 flex items-center justify-center text-[12px] font-bold cursor-pointer rounded-full transition-all ${
                selected ? 'bg-[#1C1C1B] text-white shadow-sm' : 
                range ? 'bg-[#F0F0EF] text-[#1C1C1B]' : 
                disabled ? 'text-[#D3D3D3] cursor-default' : 'hover:border hover:border-[#1C1C1B] text-[#1C1C1B]'
              }`}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderDatesTab = () => (
    <div className="animate-in fade-in duration-300">
      <div className="overflow-y-auto max-h-[300px] no-scrollbar mb-2 px-1">
        {monthsToRender.map(m => renderMonth(m))}
      </div>
      <div className="border-t border-[#E9E9E7]/20 pt-2.5 -mx-4 px-4">
        <div className="flex gap-1 overflow-x-auto no-scrollbar py-0.5">
          {['Dates exactes', '± 1 jour', '± 2 jours', '± 3 jours'].map((label, i) => (
            <button
              key={i}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border whitespace-nowrap transition-all bg-white border-[#E9E9E7] hover:border-[#1C1C1B] ${i === 0 ? 'ring-1 ring-[#1C1C1B] border-[#1C1C1B]' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFlexibleTab = () => (
    <div className="animate-in fade-in duration-300 space-y-4 pb-2">
      <div className="space-y-2">
        <h3 className="text-[13px] font-bold text-[#1C1C1B]">Quelle durée ?</h3>
        <div className="flex gap-1.5">
          {['Un week-end', 'Une semaine', 'Un mois'].map((label, idx) => (
            <button
              key={idx}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-bold border transition-all bg-white border-[#E9E9E7] hover:border-[#1C1C1B]`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-[13px] font-bold text-[#1C1C1B]">Quand ?</h3>
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
          {monthsToRender.map((m, i) => (
            <div key={i} className="flex-shrink-0 w-24 aspect-[4/5] rounded-lg border border-[#E9E9E7] bg-white flex flex-col items-center justify-center p-2">
              <span className="text-[11px] font-bold capitalize">{m.toLocaleDateString('fr-FR', { month: 'short' })}</span>
              <span className="text-[9px] text-[#37352F]/40">{m.getFullYear()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (overlayState === 'success') {
    return (
      <div className="fixed inset-0 z-[2000] bg-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
        <div className="text-5xl mb-6">✨</div>
        <h2 className="text-[20px] font-bold text-[#1C1C1B] mb-2 tracking-tight">Annonce publiée !</h2>
        <p className="text-[13px] text-[#37352F]/60 font-medium mb-8">Les sitters ont été prévenus.</p>
        <button onClick={onClose} className="w-full max-w-xs py-3.5 rounded-lg font-bold text-white bg-[#C25E72] hover:bg-[#A34D5E] transition-colors">Retour</button>
      </div>
    );
  }

  if (overlayState === 'preview') {
    return (
      <div className="fixed inset-0 z-[5000] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="bg-white w-full max-w-[400px] rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
          <div className="bg-[#C25E72] p-4 text-center">
            <span className="text-[10px] font-bold text-white/80 uppercase tracking-[0.2em]">Aperçu de votre annonce</span>
          </div>
          <div className="p-6 space-y-6">
            <div className="aspect-[4/3] rounded-2xl bg-gray-100 overflow-hidden relative">
              <img 
                src={petPhotos[0] || "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop"} 
                className="w-full h-full object-cover"
                alt="Preview"
              />
              <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                <span className="text-[10px] font-bold text-[#C25E72] uppercase tracking-wider">{careType === 'visits' ? 'Visites' : careType === 'home' ? 'À domicile' : 'Pension'}</span>
              </div>
              {petPhotos.length > 1 && (
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-md text-white text-[10px] font-bold">
                  +{petPhotos.length - 1} photo{petPhotos.length > 2 ? 's' : ''}
                </div>
              )}
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="text-[20px] font-bold text-[#1C1C1B]">{petName}</h3>
                <span className="text-[18px] font-bold text-[#C25E72]">{priceDetails.total}€</span>
              </div>
              <p className="text-[13px] text-[#37352F]/60 font-medium line-clamp-2 italic">
                "{description || "Pas de description fournie."}"
              </p>
              <div className="pt-4 border-t border-[#E9E9E7] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#F0F0EF] flex items-center justify-center text-[10px]">📍</div>
                  <span className="text-[11px] font-bold text-[#1C1C1B] truncate max-w-[150px]">{address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#F0F0EF] flex items-center justify-center text-[10px]">📅</div>
                  <span className="text-[11px] font-bold text-[#1C1C1B]">
                    {startDate && endDate ? `${startDate.getDate()} - ${endDate.getDate()} ${startDate.toLocaleDateString('fr-FR', { month: 'short' })}` : "Dates flexibles"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 pb-8 space-y-4">
            <button 
              onClick={() => setOverlayState('account')}
              className="w-full py-4 bg-[#C25E72] hover:bg-[#A34D5E] text-white rounded-2xl font-bold text-[15px] transition-all shadow-lg shadow-[#C25E72]/20 border border-white/20 active:scale-[0.98]"
            >
              Publier mon annonce
            </button>
            <button 
              onClick={() => setOverlayState('search')}
              className="w-full text-[12px] font-bold text-[#37352F]/40 uppercase tracking-widest hover:text-[#37352F] transition-colors"
            >
              Modifier
            </button>
          </div>
        </div>
        <style>{`
          @keyframes progress-3s {
            from { width: 0%; }
            to { width: 100%; }
          }
          .animate-progress-3s {
            animation: progress-3s 3s linear forwards;
          }
        `}</style>
      </div>
    );
  }

  if (overlayState === 'account') {
    return (
      <div className="fixed inset-0 z-[5000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300 overflow-hidden">
        <div className="relative bg-white w-full max-w-[420px] rounded-[24px] p-6 md:p-8 shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col">
          <button onClick={() => setOverlayState('search')} className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-[#F0F0EF] transition-colors text-[#1C1C1B]/40">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <h2 className="text-[22px] font-bold text-[#1C1C1B] text-center leading-tight mb-6 max-w-[280px] mx-auto">Inscrivez-vous sur Neko Community</h2>
          <button className="flex items-center justify-center gap-2.5 w-full py-3 bg-[#F2F2F2] hover:bg-[#EAEAEA] rounded-lg font-bold text-[14px] transition-all mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continuer avec Google
          </button>
          <div className="flex items-center gap-3 mb-6"><div className="h-[1px] flex-1 bg-[#E9E9E7]"></div><span className="text-[10px] font-bold text-[#37352F]/30 uppercase">ou</span><div className="h-[1px] flex-1 bg-[#E9E9E7]"></div></div>
          <div className="space-y-4">
            <div className="space-y-1.5"><label className="text-[12px] font-bold text-[#1C1C1B] ml-0.5">Votre adresse e-mail</label>
              <input type="email" placeholder="Ex: amelie@neko.fr" className="w-full h-11 px-4 rounded-lg border border-[#E9E9E7] outline-none text-[14px] font-medium focus:border-[#C25E72]/40 transition-all bg-white" />
            </div>
            <button onClick={() => setOverlayState('success')} className="w-full h-12 bg-[#C25E72] hover:bg-[#A34D5E] text-white rounded-lg font-bold text-[14px] transition-all shadow-lg shadow-[#C25E72]/20">Publier mon annonce</button>
          </div>
          <div className="mt-8 text-center"><p className="text-[13px] text-[#37352F]/60 font-medium">Vous avez déjà un compte ?</p><button className="mt-1 text-[14px] font-bold text-[#C25E72] hover:underline">Connexion</button></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[2000] bg-white flex flex-col animate-in fade-in duration-400 overflow-hidden font-sans shadow-2xl">
      
      {/* HEADER WITH TITLE - SIGNATURE PINK BACKGROUND FOR WHITE TITLE */}
      <div className="p-3.5 flex items-center justify-between bg-[#C25E72] border-b border-black/5 shadow-md">
        <button onClick={onClose} className="p-2.5 rounded-full bg-white/20 border border-white/30 shadow-sm hover:bg-white/30 transition-colors">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        
        <h1 className="text-[13px] md:text-[14px] font-bold text-white tracking-widest uppercase">Déposez votre annonce</h1>
        
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4 pb-28 space-y-5 bg-[#FAFAFA]">
        
        {/* OÙ - SOLID CARD */}
        <div className={`transition-all duration-300 overflow-hidden shadow-sm border ${activeSection === 'location' ? 'bg-white rounded-[24px] border-[#E9E9E7] p-5 shadow-lg' : 'bg-white rounded-xl p-4 flex items-center justify-between border-[#E9E9E7] cursor-pointer hover:border-[#C25E72]/30'}`}
             onClick={() => activeSection !== 'location' && setActiveSection('location')}>
          {activeSection === 'location' ? (
            <>
              <h2 className="text-[11px] font-bold text-[#37352F]/40 mb-4 tracking-[0.1em] uppercase">Où ?</h2>
              <div className="relative mb-3">
                <div className="absolute left-3.5 top-[18px] -translate-y-1/2 text-[#37352F]/30">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Indiquez votre adresse"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E9E9E7] outline-none text-[14px] font-medium bg-white focus:border-[#C25E72]/40 transition-all"
                />
              </div>
              
              <div className="space-y-2 pt-3">
                {[
                  { id: 'sitter', label: 'Pension', icon: '🏡', price: '13€/nuit' },
                  { id: 'home', label: 'À domicile', icon: '🏠', price: '13€/nuit' },
                  { id: 'visits', label: 'Visites', icon: '🚶', price: '13€/visite' }
                ].map((opt) => (
                  <div key={opt.id} className="space-y-2">
                    <button
                      onClick={() => setCareType(opt.id as CareType)}
                      className={`flex items-center gap-4 p-3 rounded-lg border transition-all text-left w-full shadow-sm ${careType === opt.id ? 'border-[#C25E72] bg-[#C25E72]/5 ring-1 ring-[#C25E72]' : 'border-[#E9E9E7] bg-white hover:border-[#1C1C1B]/30'}`}
                    >
                      <div className="w-9 h-9 bg-black/5 rounded-lg flex items-center justify-center text-lg">{opt.icon}</div>
                      <div className="flex-1">
                        <span className="text-[13px] font-bold text-[#1C1C1B]">{opt.label}</span>
                        <p className="text-[10px] text-[#37352F]/40 font-bold uppercase tracking-tight">{opt.price}</p>
                      </div>
                    </button>
                    
                    {opt.id === 'visits' && careType === 'visits' && (
                      <div className="ml-12 pb-3 space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="flex gap-2">
                          {[1, 2].map((num) => (
                            <button
                              key={num}
                              onClick={() => setVisitFrequency(num as 1 | 2)}
                              className={`px-4 py-2 rounded-lg text-[11px] font-bold border transition-all flex flex-col items-center shadow-sm ${
                                visitFrequency === num 
                                  ? 'bg-[#1C1C1B] text-white border-[#1C1C1B]' 
                                  : 'bg-white text-[#37352F] border-[#E9E9E7] hover:border-[#1C1C1B]'
                              }`}
                            >
                              <span>{num} visite{num > 1 ? 's' : ''}</span>
                              <span className={`text-[9px] font-medium ${visitFrequency === num ? 'text-white/70' : 'text-[#37352F]/60'}`}>
                                {num * 13}€/j
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <span className="text-[12px] font-bold text-[#37352F]/40 uppercase tracking-widest">Où</span>
              <span className="text-[13px] font-bold text-[#1C1C1B] truncate max-w-[140px]">{address || "Indiquez votre adresse"}</span>
            </>
          )}
        </div>

        {/* QUAND - SOLID CARD */}
        <div className={`transition-all duration-300 overflow-hidden shadow-sm border ${activeSection === 'dates' ? 'bg-white rounded-[24px] border-[#E9E9E7] p-5 shadow-lg' : 'bg-white rounded-xl p-4 flex items-center justify-between border-[#E9E9E7] cursor-pointer hover:border-[#C25E72]/30'}`}
             onClick={() => activeSection !== 'dates' && setActiveSection('dates')}>
          {activeSection === 'dates' ? (
            <>
              <h2 className="text-[11px] font-bold text-[#37352F]/40 mb-4 tracking-[0.1em] uppercase">Quand ?</h2>
              <div className="bg-[#F0F0EF] p-1 rounded-lg flex mb-5 w-full border border-[#E9E9E7]">
                {['dates', 'flexible'].map((tab) => (
                  <button
                    key={tab}
                    onClick={(e) => { e.stopPropagation(); setDateSubTab(tab as DateSubTab); }}
                    className={`flex-1 py-2 rounded-md text-[11px] font-bold transition-all ${dateSubTab === tab ? 'bg-[#1C1C1B] text-white shadow-sm' : 'text-[#37352F]/40 hover:text-[#37352F]'}`}
                  >
                    {tab === 'dates' ? 'Dates' : 'Flexible'}
                  </button>
                ))}
              </div>
              {dateSubTab === 'dates' ? renderDatesTab() : renderFlexibleTab()}
            </>
          ) : (
            <>
              <span className="text-[12px] font-bold text-[#37352F]/40 uppercase tracking-widest">Quand</span>
              <span className="text-[13px] font-bold text-[#1C1C1B]">{startDate && endDate ? `${startDate.getDate()} - ${endDate.getDate()} ${startDate.toLocaleDateString('fr-FR', { month: 'short' })}` : "Ajouter dates"}</span>
            </>
          )}
        </div>

        {/* VOTRE CHAT - SOLID CARD */}
        <div className={`transition-all duration-300 overflow-hidden shadow-sm border ${activeSection === 'pet' ? 'bg-white rounded-[24px] border-[#E9E9E7] p-5 shadow-lg' : 'bg-white rounded-xl p-4 flex items-center justify-between border-[#E9E9E7] cursor-pointer hover:border-[#C25E72]/30'} ${!isLocationValid() ? 'opacity-50 pointer-events-none' : ''}`}
             onClick={() => isLocationValid() && activeSection !== 'pet' && setActiveSection('pet')}>
          {activeSection === 'pet' ? (
            <>
              <h2 className="text-[11px] font-bold text-[#37352F]/40 mb-4 tracking-[0.1em] uppercase">Votre Chat</h2>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Son prénom"
                  value={petName}
                  onChange={e => setPetName(e.target.value)}
                  className="w-full p-3.5 rounded-lg border border-[#E9E9E7] outline-none font-medium bg-white focus:border-[#C25E72]/40 transition-all text-[14px] shadow-sm"
                />
                <textarea 
                  rows={4}
                  placeholder="Ex: Oscar est un peu timide au début..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full p-4 rounded-lg border border-[#E9E9E7] outline-none font-medium bg-white focus:border-[#C25E72]/40 transition-all resize-none text-[14px] leading-relaxed italic shadow-sm"
                />
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setIsNeutered(!isNeutered)}
                    className={`p-3 rounded-lg border font-bold text-[11px] flex items-center justify-between tracking-tight shadow-sm transition-all ${isNeutered ? 'border-[#1C1C1B] bg-white ring-1 ring-[#1C1C1B]' : 'border-[#E9E9E7] bg-white'}`}
                  >
                    <span className="uppercase tracking-widest text-[#37352F]/60">Castré(e)</span>
                    <div className={`w-4 h-4 rounded-full border-2 transition-all ${isNeutered ? 'bg-[#1C1C1B] border-[#1C1C1B]' : 'border-[#E9E9E7]'}`} />
                  </button>
                  <button 
                    onClick={() => setIsChipped(!isChipped)}
                    className={`p-3 rounded-lg border font-bold text-[11px] flex items-center justify-between tracking-tight shadow-sm transition-all ${isChipped ? 'border-[#1C1C1B] bg-white ring-1 ring-[#1C1C1B]' : 'border-[#E9E9E7] bg-white'}`}
                  >
                    <span className="uppercase tracking-widest text-[#37352F]/60">Pucé(e)</span>
                    <div className={`w-4 h-4 rounded-full border-2 transition-all ${isChipped ? 'bg-[#1C1C1B] border-[#1C1C1B]' : 'border-[#E9E9E7]'}`} />
                  </button>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#37352F]/40 uppercase tracking-widest ml-1">Photos (Obligatoire)</label>
                  
                  {imageToCrop ? (
                    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">
                      <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-[#E9E9E7] bg-[#F5F5F0] shadow-inner">
                        <Cropper
                          image={imageToCrop}
                          crop={crop}
                          zoom={zoom}
                          rotation={rotation}
                          aspect={1}
                          onCropChange={setCrop}
                          onRotationChange={setRotation}
                          onCropComplete={onCropComplete}
                          onZoomChange={setZoom}
                          restrictPosition={true}
                          style={{
                            containerStyle: { background: '#F5F5F0' },
                            cropAreaStyle: { 
                              border: '2px solid white',
                              boxShadow: '0 0 0 9999px rgba(255, 255, 255, 0.5)',
                              borderRadius: '12px'
                            }
                          }}
                        />
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white/80 backdrop-blur-md rounded-full border border-white/20 shadow-sm pointer-events-none">
                          <span className="text-[9px] font-bold text-[#C25E72] uppercase tracking-widest">Cadrage précis</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-4 px-1">
                        <div className="space-y-3">
                          <div className="flex items-center gap-4">
                            <span className="w-12 text-[9px] font-bold text-[#37352F]/40 uppercase">Zoom</span>
                            <input
                              type="range"
                              value={zoom}
                              min={1}
                              max={3}
                              step={0.1}
                              onChange={(e) => setZoom(Number(e.target.value))}
                              className="flex-1 h-1 bg-[#E9E9E7] rounded-full appearance-none cursor-pointer accent-[#C25E72]"
                            />
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="w-12 text-[9px] font-bold text-[#37352F]/40 uppercase">Rotation</span>
                            <input
                              type="range"
                              value={rotation}
                              min={0}
                              max={360}
                              step={1}
                              onChange={(e) => setRotation(Number(e.target.value))}
                              className="flex-1 h-1 bg-[#E9E9E7] rounded-full appearance-none cursor-pointer accent-[#C25E72]"
                            />
                          </div>
                        </div>
                        
                        <div className="flex gap-3 pt-2">
                          <button 
                            onClick={() => setImageToCrop(null)}
                            className="flex-1 py-3 rounded-xl border border-[#E9E9E7] text-[11px] font-bold uppercase tracking-[0.15em] text-[#37352F]/60 hover:bg-gray-50 transition-all active:scale-95"
                          >
                            Annuler
                          </button>
                          <button 
                            onClick={saveCroppedImage}
                            className="flex-1 py-3 rounded-xl bg-[#1C1C1B] text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-black transition-all active:scale-95 shadow-lg shadow-black/10"
                          >
                            Confirmer
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                      <label className="flex-shrink-0 w-20 h-20 rounded-xl border-2 border-dashed border-[#E9E9E7] hover:border-[#C25E72]/40 flex flex-col items-center justify-center cursor-pointer transition-all bg-white">
                        <input type="file" multiple accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                        <span className="text-xl text-[#37352F]/20">+</span>
                        <span className="text-[8px] font-bold text-[#37352F]/30 uppercase">Ajouter</span>
                      </label>
                      {petPhotos.map((photo, idx) => (
                        <div key={idx} className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden relative group shadow-sm cursor-pointer">
                          <img 
                            src={photo} 
                            className="w-full h-full object-cover" 
                            alt="Pet" 
                            onClick={() => {
                              setImageToCrop(photo);
                              setCroppingIndex(idx);
                            }}
                          />
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              removePhoto(idx);
                            }}
                            className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 p-4 bg-white rounded-lg border border-[#E9E9E7] animate-in fade-in slide-in-from-top-2 duration-400 shadow-md">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#37352F]/40 uppercase tracking-[0.2em]">Total estimé</span>
                    <span className="text-[12px] font-medium text-[#37352F]/60 italic">{priceDetails.label}</span>
                  </div>
                  <span className="text-[20px] font-bold text-[#C25E72] tracking-tighter">{priceDetails.total}€</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <span className="text-[12px] font-bold text-[#37352F]/40 uppercase tracking-widest">Chat</span>
              <span className="text-[13px] font-bold text-[#1C1C1B]">{petName || "Détails chat"}</span>
            </>
          )}
        </div>
      </div>

      {/* FOOTER - SOLID CTA BAR */}
      <div className="bg-white border-t border-[#E9E9E7] p-5 px-6 flex items-center justify-between z-[2100] shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
        <button onClick={clearAll} className="text-[12px] font-bold text-[#1C1C1B]/40 uppercase tracking-[0.2em] hover:text-[#1C1C1B] transition-colors">Tout effacer</button>
        <button
          disabled={!canProceed}
          onClick={handleNext}
          className={`px-10 py-3.5 rounded-lg text-white font-bold text-[14px] flex items-center gap-2 transition-all active:scale-95 shadow-lg ${!canProceed ? 'bg-[#C25E72]/40 cursor-not-allowed' : 'bg-[#C25E72] hover:bg-[#A34D5E] shadow-[#C25E72]/20 border border-white/20'}`}
        >
          {activeSection === 'pet' ? 'Terminer' : 'Suivant'}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
};

export default BookingDropdown;
