
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, Star, MapPin, ShieldCheck, CheckCircle2, 
  Zap, Calendar, Heart, Minus, Plus, MessageCircle, Info,
  Clock, Award, Shield, Check, ChevronRight, Camera, Stethoscope, Phone
} from 'lucide-react';

interface NewSitterProfileProps {
  sitterId: string | null;
  onBack: () => void;
  onContact?: () => void;
}

const NewSitterProfile: React.FC<NewSitterProfileProps> = ({ sitterId, onBack, onContact }) => {
  const [petCount, setPetCount] = useState(1);
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [selectedService, setSelectedService] = useState('Garde à domicile');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentAccIndex, setCurrentAccIndex] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200",
    "https://images.unsplash.com/photo-1513584684031-ad36af394880?q=80&w=1200"
  ];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const calculateTotal = () => {
    const prices: Record<string, number> = {
      'Garde à domicile': 13,
      'Garde chez vous': 13,
      'House Sitting': 0
    };
    const basePrice = prices[selectedService] || 13;
    const nights = (startDate && endDate) ? Math.max(1, Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))) : 4;
    const subtotal = basePrice * nights * petCount;
    const serviceFee = 0;
    const insuranceFee = 0;
    return {
      basePrice,
      nights,
      subtotal,
      serviceFee,
      insuranceFee,
      total: subtotal
    };
  };

  const pricing = calculateTotal();

  return (
    <div className="min-h-screen bg-warm-bg font-sans text-warm-text pb-20">
      {/* Sticky Header for Mobile/UX */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-warm-border px-6 md:px-12 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={onBack} 
              className="p-2.5 hover:bg-warm-paper rounded-full transition-all active:scale-90 border border-warm-border shadow-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex flex-col">
              <span className="text-[16px] font-bold tracking-tight leading-none">Profil de Lucas B.</span>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neko-olive animate-pulse" />
                <span className="text-[11px] text-warm-text/40 font-bold uppercase tracking-wider">Paris 11e • Disponible</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2.5 px-6 py-2.5 rounded-[18px] border border-warm-border hover:bg-warm-paper transition-all font-bold text-[14px] tracking-tight">
              <Heart className="w-4 h-4" />
              Favoris
            </button>
            <button 
              onClick={onContact}
              className="px-8 py-2.5 bg-neko-rose text-white rounded-[18px] font-bold text-[14px] shadow-xl shadow-neko-rose/20 hover:scale-105 active:scale-95 transition-all tracking-tight"
            >
              Contacter
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 items-start">
          
          {/* Main Column (Left) */}
          <div className="space-y-16">
            
            {/* 1. Hero Section */}
            <motion.section 
              id="hero" 
              className="space-y-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Photo Carousel */}
              <div className="relative h-[60vh] w-full rounded-[48px] overflow-hidden shadow-2xl shadow-black/5 group border border-warm-border">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    alt={`Sitter photo ${currentImageIndex + 1}`}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Navigation Arrows */}
                <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={prevImage}
                    className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border border-white/20 flex items-center justify-center text-warm-text shadow-xl hover:scale-110 active:scale-95 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border border-white/20 flex items-center justify-center text-warm-text shadow-xl hover:scale-110 active:scale-95 transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        currentImageIndex === i 
                          ? 'w-8 bg-white shadow-lg' 
                          : 'w-1.5 bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>

                {/* Counter Badge */}
                <div className="absolute top-8 right-8 px-4 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white text-[11px] font-bold tracking-widest uppercase">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>

              {/* Sitter Info Card */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="flex-1 text-center md:text-left">
                  <div className="space-y-4">
                    <div className="flex flex-col items-center md:items-start gap-6">
                      <div className="flex flex-wrap items-baseline justify-center md:justify-start gap-4 md:gap-6">
                        <h1 className="text-[32px] md:text-[48px] font-bold tracking-tighter leading-none text-warm-text">Lucas B.</h1>
                        <span className="text-[18px] md:text-[24px] font-bold text-warm-text/20 tracking-tight">Paris 11e</span>
                      </div>
                      
                      <div className="flex items-center gap-1 p-1.5 bg-white border border-warm-border rounded-[24px] shadow-sm">
                        <div className="flex items-center gap-2 px-4 py-2.5 bg-neko-rose/5 text-neko-rose rounded-[18px]">
                          <ShieldCheck className="w-4 h-4" />
                          <span className="text-[11px] font-bold uppercase tracking-[0.1em]">Profil Vérifié</span>
                        </div>
                        <div className="h-6 w-px bg-warm-border mx-3" />
                        <div className="flex items-center gap-6 px-4">
                          <div className="flex items-center gap-2.5">
                            <Star className="w-5 h-5 text-neko-rose fill-neko-rose" />
                            <span className="text-[14px] font-bold text-warm-text">4.9</span>
                            <span className="text-[14px] text-warm-text/30 font-semibold">(124 avis)</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <Zap className="w-5 h-5 text-neko-olive/70" />
                            <span className="text-[14px] font-bold text-warm-text/60">Réponse en 1h</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* 2. Confiance & Vérifications (Concise) */}
            <motion.section 
              id="trust" 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'Pièce d\'identité', icon: <ShieldCheck className="w-4 h-4 text-neko-olive" /> },
                  { label: 'Casier judiciaire', icon: <CheckCircle2 className="w-4 h-4 text-neko-olive" /> },
                  { label: 'Email', icon: <Zap className="w-4 h-4 text-neko-rose fill-neko-rose" /> },
                  { label: 'Téléphone', icon: <Zap className="w-4 h-4 text-neko-rose fill-neko-rose" /> },
                ].map((item, i) => (
                  <div key={i} className="px-4 py-2 rounded-full bg-warm-paper border border-warm-border flex items-center gap-2 text-[13px] font-bold">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* 3. À propos (Editorial Style) */}
            <motion.section 
              id="about" 
              className="space-y-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-baseline justify-between border-b border-warm-border pb-6">
                <h2 className="text-[24px] font-bold tracking-tight text-warm-text">À propos de Lucas</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-16">
                <div className="space-y-8">
                  <p className="text-[17px] text-warm-text/90 leading-relaxed font-medium tracking-tight">
                    Passionné par les animaux depuis mon plus jeune âge, j'ai grandi entouré de chats et de chiens. 
                    Aujourd'hui, je propose mes services de pet sitting pour offrir à vos compagnons tout l'amour et l'attention qu'ils méritent en votre absence. 
                  </p>
                  <p className="text-[15px] text-warm-text/60 leading-relaxed font-medium">
                    Je suis quelqu'un de calme, patient et très attentif aux besoins spécifiques de chaque animal. 
                    Que ce soit pour une garde à mon domicile ou des visites chez vous, je m'adapte au rythme de votre animal pour qu'il se sente en totale confiance.
                    <br /><br />
                    Mon appartement est entièrement sécurisé et j'ai l'habitude de gérer des animaux avec des besoins médicaux ou des tempéraments anxieux. Je vous enverrai des photos et des nouvelles quotidiennes pour que vous puissiez voyager l'esprit tranquille !
                  </p>
                </div>
                <div className="space-y-8">
                  <div className="p-8 rounded-[40px] bg-warm-paper border border-warm-border space-y-8">
                    <h3 className="text-[11px] font-bold text-warm-text/30 uppercase tracking-[0.2em]">Compétences clés</h3>
                    <div className="flex flex-wrap gap-2.5">
                      {['Premiers secours', 'Médicaments', 'Animaux anxieux', 'Seniors', 'Expérience 5 ans', 'Français/Anglais'].map((tag, i) => (
                        <span key={i} className="px-4 py-2 bg-white text-warm-text/70 rounded-[14px] text-[12px] font-bold border border-warm-border shadow-sm hover:border-neko-rose/30 transition-all cursor-default">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* 4. Services proposés (Modern Horizontal Bar) */}
            <motion.section 
              id="services" 
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-baseline justify-between border-b border-warm-border pb-6">
                <h2 className="text-[24px] font-bold tracking-tight text-warm-text">Services proposés</h2>
              </div>
              <div className="flex flex-col md:flex-row gap-3 p-3 bg-white border border-warm-border rounded-[40px] shadow-sm overflow-hidden">
                {[
                  { name: 'Garde à domicile', icon: '🏠', desc: 'Chez le sitter' },
                  { name: 'Garde chez vous', icon: '🏡', desc: 'Visites' },
                  { name: 'House Sitting', icon: '☀️', desc: 'Longue durée' },
                ].map((service, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedService(service.name)}
                    className={`flex-1 flex items-center justify-center md:justify-start gap-5 px-8 py-5 rounded-[30px] transition-all relative group ${
                      selectedService === service.name 
                        ? 'bg-neko-rose text-white shadow-2xl shadow-neko-rose/20' 
                        : 'hover:bg-warm-paper text-warm-text/60'
                    }`}
                  >
                    <span className={`text-3xl transition-transform duration-500 ${selectedService === service.name ? 'scale-110' : 'group-hover:scale-110 grayscale opacity-40'}`}>
                      {service.icon}
                    </span>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-[14px] leading-tight whitespace-nowrap tracking-tight">{service.name}</span>
                      <span className={`text-[11px] font-bold uppercase tracking-[0.15em] mt-0.5 ${selectedService === service.name ? 'text-white/60' : 'text-warm-text/30'}`}>
                        {service.desc}
                      </span>
                    </div>
                    {selectedService === service.name && (
                      <motion.div 
                        layoutId="serviceGlow"
                        className="absolute inset-0 bg-white/10 rounded-[30px]"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.section>

            {/* 5. Avis clients (Premium Layout) */}
            <motion.section 
              id="reviews" 
              className="space-y-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-baseline justify-between border-b border-warm-border pb-6">
                <h2 className="text-[24px] font-bold tracking-tight text-warm-text">Avis clients</h2>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-neko-rose fill-neko-rose" />
                  <span className="text-[16px] font-bold text-warm-text">4.9</span>
                  <span className="text-[16px] text-warm-text/30 font-semibold">(124 avis)</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-16">
                {/* Rating Summary */}
                <div className="space-y-8">
                  <div className="p-10 rounded-[48px] bg-warm-paper border border-warm-border flex flex-col items-center text-center space-y-6">
                    <span className="text-[56px] font-bold tracking-tighter leading-none text-warm-text">4.9</span>
                    <div className="flex gap-2 text-neko-rose">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} size={28} fill="currentColor" />)}
                    </div>
                    <p className="text-[14px] font-bold text-warm-text/40 uppercase tracking-[0.2em]">Note moyenne</p>
                    <div className="flex flex-wrap justify-center gap-2.5 pt-4">
                      {['Ponctualité', 'Attentionné', 'Réactif', 'Bienveillant', 'Sérieux'].map((tag, i) => (
                        <span key={i} className="px-3 py-1.5 bg-white border border-warm-border rounded-xl text-[11px] font-bold text-neko-olive uppercase tracking-wider shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review List */}
                <div className="space-y-6">
                  {[1, 2].map(i => (
                    <div key={i} className="group p-8 rounded-[40px] bg-white border border-warm-border space-y-6 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-5 items-center">
                          <div className="relative">
                            <img 
                              src={`https://i.pravatar.cc/100?u=rev${i}`} 
                              referrerPolicy="no-referrer"
                              className="w-14 h-14 rounded-2xl object-cover border border-warm-border shadow-sm" 
                              alt="Reviewer"
                            />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-neko-olive border-2 border-white flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-[16px] text-warm-text">{['Julie B.', 'Marc A.'][i-1]}</span>
                            <span className="text-[12px] text-warm-text/40 font-medium">Janvier 2024 • Garde à domicile</span>
                          </div>
                        </div>
                        <div className="flex gap-0.5 text-neko-rose">
                          {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                        </div>
                      </div>
                      <p className="text-[15px] text-warm-text/70 leading-relaxed font-medium italic">
                        "Super expérience avec Lucas ! Il a été très attentif à mon chat Oscar qui est d'habitude très timide. 
                        J'ai reçu des photos tous les jours, ce qui m'a beaucoup rassurée. Je recommande vivement !"
                      </p>
                    </div>
                  ))}
                  <button className="w-full py-4 rounded-[24px] border-2 border-warm-border text-warm-text/40 font-bold text-[14px] hover:border-warm-text/20 hover:text-warm-text/60 transition-all">
                    Afficher les 122 autres avis
                  </button>
                </div>
              </div>
            </motion.section>

            {/* 6. Le logement (Carousel) */}
            <motion.section 
              id="accommodation" 
              className="space-y-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-baseline justify-between border-b border-warm-border pb-6">
                <h2 className="text-[24px] font-bold tracking-tight text-warm-text">Le logement</h2>
              </div>
              
              <div className="relative aspect-video rounded-[48px] overflow-hidden shadow-2xl group border border-warm-border">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentAccIndex}
                    src={[
                      "https://images.unsplash.com/photo-1513584684031-ad36af394880?q=80&w=1200",
                      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200",
                      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200"
                    ][currentAccIndex]}
                    alt="Accommodation"
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Navigation */}
                <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => setCurrentAccIndex((prev) => (prev - 1 + 3) % 3)}
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-warm-text shadow-lg hover:scale-110 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setCurrentAccIndex((prev) => (prev + 1) % 3)}
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-warm-text shadow-lg hover:scale-110 transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentAccIndex(i)}
                      className={`h-1 rounded-full transition-all ${
                        currentAccIndex === i ? 'w-6 bg-white' : 'w-1 bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { label: '45m²', icon: '🏢' },
                  { label: 'Pas d\'ext.', icon: '🚫' },
                  { label: 'Calme', icon: '🤫' },
                  { label: '1 chat', icon: '🐱' },
                  { label: 'Non fum.', icon: '🚭' },
                  { label: 'Sans enf.', icon: '👶' }
                ].map((feature, i) => (
                  <div key={i} className="px-3 py-1 rounded-full bg-white border border-warm-border flex items-center gap-1.5 group hover:border-neko-rose/30 transition-all">
                    <span className="text-xs group-hover:scale-110 transition-transform">{feature.icon}</span>
                    <span className="text-[11px] font-bold text-warm-text/60">{feature.label}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* 7. Disponibilités (Designed Calendar) */}
            <motion.section 
              id="availability" 
              className="space-y-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
               <div className="flex items-baseline justify-between border-b border-warm-border pb-6">
                <h2 className="text-[24px] font-bold tracking-tight text-warm-text">Disponibilités</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-16 items-start">
                <div className="bg-white border border-warm-border rounded-[48px] p-12 shadow-sm">
                  <div className="flex justify-between items-center mb-12">
                    <button className="w-12 h-12 flex items-center justify-center hover:bg-warm-paper rounded-full transition-all border border-warm-border active:scale-90"><ChevronLeft size={20} /></button>
                    <span className="font-bold text-[18px] text-warm-text tracking-tight">Mars 2024</span>
                    <button className="w-12 h-12 flex items-center justify-center hover:bg-warm-paper rounded-full transition-all border border-warm-border rotate-180 active:scale-90"><ChevronLeft size={20} /></button>
                  </div>
                  <div className="grid grid-cols-7 gap-4 text-center">
                    {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((d, idx) => (
                      <span key={`${d}-${idx}`} className="text-[12px] text-warm-text/30 font-bold uppercase tracking-[0.25em] mb-6">{d}</span>
                    ))}
                    {Array.from({ length: 31 }, (_, i) => {
                      const day = i + 1;
                      const isAvailable = day % 3 !== 0;
                      const isToday = day === 15;
                      return (
                        <div key={i} className={`
                          aspect-square flex items-center justify-center rounded-[18px] text-[16px] font-bold transition-all relative group
                          ${isToday ? 'bg-neko-rose text-white shadow-2xl shadow-neko-rose/30 z-10' : ''}
                          ${!isToday && isAvailable ? 'bg-neko-olive text-white shadow-lg shadow-neko-olive/20 cursor-pointer hover:scale-105' : ''}
                          ${!isAvailable ? 'text-warm-text/20 cursor-not-allowed line-through opacity-30' : ''}
                        `}>
                          {day}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="space-y-10 pt-6">
                  <div className="p-8 rounded-[40px] bg-neko-rose/5 border border-neko-rose/20 space-y-4">
                    <div className="flex items-center gap-3 text-neko-rose">
                      <Info size={18} />
                      <span className="text-[14px] font-bold uppercase tracking-wider">Note importante</span>
                    </div>
                    <p className="text-[14px] text-warm-text/60 leading-relaxed font-medium">
                      Lucas est très demandé les week-ends. Nous vous conseillons de réserver au moins 2 semaines à l'avance.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* 8. En chiffres (Modern Single Line) */}
            <motion.section 
              id="stats" 
              className="space-y-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
               <div className="flex items-baseline justify-between border-b border-warm-border pb-6">
                <h2 className="text-[24px] font-bold tracking-tight text-warm-text">En quelques chiffres</h2>
              </div>
              <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-6 p-10 bg-white border border-warm-border rounded-[48px] shadow-sm">
                {[
                  { label: 'Avis positifs', value: '124', icon: <Star className="w-5 h-5 text-neko-rose" /> },
                  { label: 'Taux de réponse', value: '100%', icon: <Zap className="w-5 h-5 text-neko-olive" /> },
                  { label: 'Années d\'exp.', value: '5 ans', icon: <Award className="w-5 h-5 text-neko-rose" /> },
                  { label: 'Clients fidèles', value: '42', icon: <Heart className="w-5 h-5 text-neko-rose fill-neko-rose" /> },
                ].map((stat, i) => (
                  <React.Fragment key={i}>
                    <div className="flex flex-col items-center md:items-start gap-2 flex-1">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-warm-paper">
                          {stat.icon}
                        </div>
                        <span className="text-[24px] font-bold tracking-tighter text-warm-text">{stat.value}</span>
                      </div>
                      <span className="text-[11px] font-bold text-warm-text/30 uppercase tracking-[0.2em]">{stat.label}</span>
                    </div>
                    {i < 3 && <div className="hidden md:block w-px h-12 bg-warm-border" />}
                  </React.Fragment>
                ))}
              </div>
            </motion.section>

          </div>

          {/* Sidebar Column (Right) - Sticky Widget on Desktop */}
          <aside className="space-y-8 lg:sticky lg:top-[100px] mt-12 lg:mt-0">
            
            {/* Booking Widget */}
            <div className="p-10 rounded-[48px] bg-white border border-warm-border shadow-2xl shadow-black/5 space-y-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2.5 bg-neko-rose" />
                            <div className="space-y-2">
                <h2 className="text-[22px] font-bold tracking-tight">Réserver avec Lucas</h2>
                <p className="text-[14px] text-warm-text/40 font-semibold tracking-tight">Paiement sécurisé via Neko</p>
              </div>
              
              <div className="space-y-8">
                {/* Service Selection */}
                <div className="space-y-3">
                  <label className="text-[11px] font-bold text-warm-text/30 uppercase tracking-[0.25em]">Service</label>
                  <div className="relative">
                    <select 
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full p-5 pl-14 rounded-[24px] bg-warm-paper border border-warm-border font-bold text-[14px] outline-none focus:border-neko-rose transition-all appearance-none cursor-pointer shadow-sm"
                    >
                      <option value="Garde à domicile">🏠 Garde à domicile — 13€/nuit</option>
                      <option value="Garde chez vous">🏡 Garde chez vous — 13€/nuit</option>
                      <option value="House Sitting">☀️ House Sitting — Gratuit</option>
                    </select>
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronRight className="w-6 h-6 text-warm-text/20 rotate-90" />
                    </div>
                  </div>
                </div>

                {/* Dates Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-warm-text/30 uppercase tracking-[0.25em]">Arrivée</label>
                    <div className="relative group">
                      <input 
                        type="date" 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full p-5 rounded-[24px] bg-warm-paper border border-warm-border font-bold text-[14px] outline-none focus:border-neko-rose transition-all cursor-pointer shadow-sm" 
                      />
                      <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-text/40 pointer-events-none group-focus-within:text-neko-rose transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-warm-text/30 uppercase tracking-[0.25em]">Départ</label>
                    <div className="relative group">
                      <input 
                        type="date" 
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full p-5 rounded-[24px] bg-warm-paper border border-warm-border font-bold text-[14px] outline-none focus:border-neko-rose transition-all cursor-pointer shadow-sm" 
                      />
                      <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-text/40 pointer-events-none group-focus-within:text-neko-rose transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Pet Counter */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-5 rounded-[24px] bg-warm-paper border border-warm-border shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                        <span className="text-xl">🐾</span>
                      </div>
                      <span className="font-bold text-[15px] tracking-tight">Nombre d'animaux</span>
                    </div>
                    <div className="flex items-center gap-5">
                      <button 
                        onClick={() => setPetCount(Math.max(1, petCount - 1))}
                        className="w-10 h-10 rounded-full bg-white border border-warm-border flex items-center justify-center hover:bg-warm-paper transition-all active:scale-90 shadow-sm"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-bold text-[18px] w-5 text-center">{petCount}</span>
                      <button 
                        onClick={() => setPetCount(Math.min(4, petCount + 1))}
                        className="w-10 h-10 rounded-full bg-white border border-warm-border flex items-center justify-center hover:bg-warm-paper transition-all active:scale-90 shadow-sm"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Recap */}
              <div className="p-8 rounded-[32px] bg-warm-paper/50 border border-warm-border space-y-5">
                <div className="flex justify-between text-[15px] font-semibold">
                  <span className="text-warm-text/60">{pricing.basePrice}€ x {pricing.nights} {pricing.nights > 1 ? 'nuits' : 'nuit'}</span>
                  <span className="font-bold">{pricing.subtotal}€</span>
                </div>
                <div className="pt-5 border-t border-warm-border flex justify-between items-baseline">
                  <span className="font-bold text-[18px] tracking-tight">Total</span>
                  <span className="font-bold text-[28px] text-warm-text tracking-tighter">{pricing.total}€</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button 
                  onClick={onContact}
                  className="w-full py-6 bg-neko-rose text-white font-bold text-[18px] rounded-[28px] shadow-2xl shadow-neko-rose/20 hover:scale-[1.02] active:scale-[0.98] transition-all tracking-tight"
                >
                  Contacter Lucas
                </button>
                <button className="w-full py-5 border-2 border-neko-rose/20 text-neko-rose font-bold text-[16px] rounded-[28px] flex items-center justify-center gap-3 hover:bg-neko-rose/5 transition-all tracking-tight">
                  <Heart className="w-6 h-6" />
                  Ajouter aux favoris
                </button>
              </div>

              {/* Guarantees */}
              <div className="space-y-6 pt-8 border-t border-warm-border">
                {[
                  { icon: <Shield className="w-6 h-6 text-blue-500" />, text: 'Paiement 100% sécurisé' },
                  { icon: <Camera className="w-6 h-6 text-warm-text/40" />, text: 'Photos & mises à jour quotidiennes' },
                  { 
                    icon: <Stethoscope className="w-6 h-6 text-neko-rose" />, 
                    text: 'Vétérinaire référent',
                    subtext: 'Clinique VetParis, 12 rue des Chats, 0.4km'
                  },
                  { icon: <Phone className="w-6 h-6 text-neko-olive" />, text: 'Support 7j/7 disponible' },
                ].map((g, i) => (
                  <div key={i} className="flex gap-5 items-start text-[14px] font-bold text-warm-text/70">
                    <div className="mt-0.5 p-2.5 rounded-2xl bg-warm-paper border border-warm-border">
                      {g.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="leading-tight tracking-tight">{g.text}</span>
                      {g.subtext && <span className="text-[12px] font-semibold text-warm-text/40 leading-tight mt-1.5">{g.subtext}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </main>
    </div>
  );
};

export default NewSitterProfile;
