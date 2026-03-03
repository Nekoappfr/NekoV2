
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, Star, MapPin, ShieldCheck, CheckCircle2, 
  Zap, Calendar, Heart, Minus, Plus, MessageCircle, Info,
  Clock, Award, Shield, Check, ChevronRight
} from 'lucide-react';

interface NewSitterProfileProps {
  sitterId: string | null;
  onBack: () => void;
}

const NewSitterProfile: React.FC<NewSitterProfileProps> = ({ sitterId, onBack }) => {
  const [petCount, setPetCount] = useState(1);
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [selectedService, setSelectedService] = useState('Garde à domicile');

  return (
    <div className="min-h-screen bg-warm-bg font-sans text-warm-text pb-20">
      {/* Sticky Header for Mobile/UX */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-warm-border px-4 md:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack} 
              className="p-2 hover:bg-warm-paper rounded-full transition-all active:scale-90"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold leading-none">Profil de Lucas B.</span>
              <span className="text-[11px] text-warm-text/40 font-medium mt-1">Paris 11e • Disponible</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl border border-warm-border hover:bg-warm-paper transition-all font-bold text-[13px]">
              <Heart className="w-4 h-4" />
              Favoris
            </button>
            <button className="px-5 py-2 bg-neko-rose text-white rounded-xl font-bold text-[13px] shadow-lg shadow-neko-rose/20 hover:scale-105 active:scale-95 transition-all">
              Contacter
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">
          
          {/* Main Column (Left) */}
          <div className="space-y-16">
            
            {/* 1. Hero Section */}
            <section id="hero" className="space-y-8">
              {/* Photo Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 aspect-square md:aspect-[16/9] rounded-[32px] overflow-hidden shadow-2xl shadow-black/5">
                <div className="md:col-span-2 relative group overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200" 
                    alt="Main" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[5000ms] ease-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="hidden md:grid grid-rows-2 gap-3">
                   <div className="relative group overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600" alt="Thumb 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                   </div>
                   <div className="relative group overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600" alt="Thumb 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                       <span className="text-white font-bold text-[14px]">Voir tout</span>
                     </div>
                   </div>
                </div>
              </div>

              {/* Sitter Info Card */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                <div className="flex-1 text-center md:text-left space-y-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                      <h1 className="text-[32px] md:text-[40px] font-bold tracking-tight leading-none">Lucas B.</h1>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-neko-rose/10 text-neko-rose rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <Award className="w-3 h-3" /> Star Sitter
                        </span>
                        <span className="px-3 py-1 bg-neko-olive/10 text-neko-olive rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <ShieldCheck className="w-3 h-3" /> Vérifié
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-warm-text/50 font-medium text-[14px]">
                      <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-neko-rose" /> Paris 11e</span>
                      <span className="flex items-center gap-2"><Star className="w-4 h-4 text-neko-rose fill-neko-rose" /> 4.9 (124 avis)</span>
                      <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-neko-olive" /> Réponse en 1h</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Confiance & Vérifications (Concise) */}
            <section id="trust" className="space-y-4">
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
            </section>

            {/* 3. À propos (Moved up and fully visible) */}
            <section id="about" className="space-y-6">
              <h2 className="text-[24px] font-bold tracking-tight">À propos de Lucas</h2>
              <div className="bg-white rounded-[32px] border border-warm-border p-8 space-y-6 shadow-sm">
                <p className="text-[16px] text-warm-text/70 leading-relaxed font-medium transition-all duration-500">
                  Passionné par les animaux depuis mon plus jeune âge, j'ai grandi entouré de chats et de chiens. 
                  Aujourd'hui, je propose mes services de pet sitting pour offrir à vos compagnons tout l'amour et l'attention qu'ils méritent en votre absence. 
                  Je suis quelqu'un de calme, patient et très attentif aux besoins spécifiques de chaque animal. 
                  Que ce soit pour une garde à mon domicile ou des visites chez vous, je m'adapte au rythme de votre animal pour qu'il se sente en totale confiance.
                  <br /><br />
                  Mon appartement est entièrement sécurisé et j'ai l'habitude de gérer des animaux avec des besoins médicaux ou des tempéraments anxieux. Je vous enverrai des photos et des nouvelles quotidiennes pour que vous puissiez voyager l'esprit tranquille !
                </p>
                
                <div className="flex flex-wrap gap-2 pt-4 border-t border-warm-border">
                  {['Premiers secours', 'Médicaments', 'Animaux anxieux', 'Seniors', 'Expérience 5 ans', 'Français/Anglais'].map((tag, i) => (
                    <span key={i} className="px-4 py-2 bg-warm-paper text-warm-text/60 rounded-xl text-[12px] font-bold border border-warm-border">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* 4. Services proposés (Concise) */}
            <section id="services" className="space-y-6">
              <h2 className="text-[24px] font-bold tracking-tight">Services proposés</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { name: 'Garde à domicile', price: '15€', icon: '🏠' },
                  { name: 'Garde chez vous', price: '18€', icon: '🏡' },
                  { name: 'Garderie journée', price: '12€', icon: '☀️' },
                  { name: 'Promenade', price: '10€', icon: '🚶' },
                ].map((service, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedService(service.name)}
                    className={`p-4 rounded-2xl border-2 text-center transition-all group ${
                      selectedService === service.name 
                        ? 'border-neko-rose bg-neko-rose/5' 
                        : 'border-warm-border bg-white hover:border-warm-text/20'
                    }`}
                  >
                    <span className="text-2xl block mb-2">{service.icon}</span>
                    <h3 className="font-bold text-[13px] mb-1 line-clamp-1">{service.name}</h3>
                    <span className="font-bold text-[14px] text-neko-rose">{service.price}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* 5. Avis clients */}
            <section id="reviews" className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-[24px] font-bold tracking-tight">Avis clients</h2>
                <button className="text-neko-rose font-bold text-[14px] hover:underline">Voir les 124 avis</button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-12 items-center bg-warm-paper rounded-[32px] p-8 border border-warm-border">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[64px] font-bold tracking-tighter leading-none">4.9</span>
                  <div className="flex gap-1 text-neko-rose">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="currentColor" />)}
                  </div>
                  <span className="text-[12px] font-bold text-warm-text/40 uppercase tracking-widest">Note globale</span>
                </div>
                <div className="flex-1 w-full space-y-3">
                  {[5, 4, 3, 2, 1].map(stars => (
                    <div key={stars} className="flex items-center gap-4">
                      <span className="text-[12px] font-bold w-4">{stars}</span>
                      <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: stars === 5 ? '92%' : stars === 4 ? '6%' : '1%' }}
                          className="h-full bg-neko-rose" 
                        />
                      </div>
                      <span className="text-[12px] font-bold text-warm-text/40 w-8">{stars === 5 ? '114' : stars === 4 ? '8' : '2'}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="p-8 rounded-[32px] bg-white border border-warm-border space-y-4 hover:shadow-xl hover:shadow-black/5 transition-all">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4 items-center">
                        <img 
                          src={`https://i.pravatar.cc/100?u=rev${i}`} 
                          className="w-12 h-12 rounded-2xl object-cover border border-warm-border" 
                          alt="Reviewer"
                        />
                        <div className="flex flex-col">
                          <span className="font-bold text-[16px]">{['Julie B.', 'Marc A.'][i-1]}</span>
                          <span className="text-[12px] text-warm-text/40 font-medium">Janvier 2024 • Garde à domicile</span>
                        </div>
                      </div>
                      <div className="flex text-neko-rose">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                      </div>
                    </div>
                    <p className="text-[15px] text-warm-text/70 leading-relaxed font-medium italic">
                      "Super expérience avec Lucas ! Il a été très attentif à mon chat Oscar qui est d'habitude très timide. 
                      J'ai reçu des photos tous les jours, ce qui m'a beaucoup rassurée. Je recommande vivement !"
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. Le logement */}
            <section id="accommodation" className="space-y-6">
              <h2 className="text-[24px] font-bold tracking-tight">Le logement</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 aspect-video rounded-[32px] overflow-hidden shadow-lg">
                <div className="md:col-span-2">
                  <img src="https://images.unsplash.com/photo-1513584684031-ad36af394880?q=80&w=800" alt="Living room" className="w-full h-full object-cover" />
                </div>
                <div className="hidden md:grid grid-rows-2 gap-3">
                  <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=400" alt="Bedroom" className="w-full h-full object-cover" />
                  <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=400" alt="Kitchen" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-8 bg-warm-paper rounded-[32px] border border-warm-border">
                {[
                  { label: 'Appartement 45m²', icon: '🏢' },
                  { label: 'Pas d\'extérieur', icon: '🚫' },
                  { label: 'Quartier calme', icon: '🤫' },
                  { label: '1 chat résident', icon: '🐱' },
                  { label: 'Non fumeur', icon: '🚭' },
                  { label: 'Pas d\'enfants', icon: '👶' }
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-[14px] font-bold">
                    <span className="text-xl">{feature.icon}</span>
                    <span>{feature.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 7. Disponibilités */}
            <section id="availability" className="space-y-6">
              <h2 className="text-[24px] font-bold tracking-tight">Disponibilités</h2>
              <div className="max-w-md bg-white border border-warm-border rounded-[32px] p-8 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <button className="p-2 hover:bg-warm-paper rounded-full transition-colors"><ChevronLeft size={20} /></button>
                  <span className="font-bold text-[18px]">Mars 2024</span>
                  <button className="p-2 hover:bg-warm-paper rounded-full transition-colors rotate-180"><ChevronLeft size={20} /></button>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center">
                  {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(d => <span key={d} className="text-[11px] text-warm-text/30 font-bold uppercase tracking-widest mb-2">{d}</span>)}
                  {Array.from({ length: 31 }, (_, i) => {
                    const day = i + 1;
                    const isAvailable = day % 3 !== 0;
                    const isToday = day === 15;
                    return (
                      <div key={i} className={`
                        aspect-square flex items-center justify-center rounded-xl text-[14px] font-bold transition-all
                        ${isToday ? 'bg-neko-rose text-white shadow-lg shadow-neko-rose/30' : ''}
                        ${!isToday && isAvailable ? 'hover:bg-warm-paper cursor-pointer' : ''}
                        ${!isAvailable ? 'opacity-20 line-through' : ''}
                      `}>
                        {day}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-8 flex gap-6 pt-6 border-t border-warm-border">
                  <div className="flex items-center gap-2 text-[12px] font-bold">
                    <div className="w-3 h-3 rounded-full bg-warm-paper border border-warm-border"></div>
                    <span className="text-warm-text/60">Disponible</span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px] font-bold">
                    <div className="w-3 h-3 rounded-full bg-warm-text/10 line-through"></div>
                    <span className="text-warm-text/30">Indisponible</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 8. En chiffres (Concise) */}
            <section id="stats" className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Avis', value: '124', icon: <Star className="w-4 h-4 text-neko-rose" /> },
                  { label: 'Réponse', value: '100%', icon: <Zap className="w-4 h-4 text-neko-olive" /> },
                  { label: 'Exp.', value: '5 ans', icon: <Award className="w-4 h-4 text-neko-rose" /> },
                  { label: 'Fidélité', value: '42', icon: <Heart className="w-4 h-4 text-neko-rose fill-neko-rose" /> },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white border border-warm-border flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-warm-paper flex items-center justify-center flex-shrink-0">
                      {stat.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[16px] font-bold leading-none">{stat.value}</span>
                      <span className="text-[10px] font-bold text-warm-text/40 uppercase tracking-widest mt-1">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar Column (Right) - Sticky Widget */}
          <aside className="hidden lg:block sticky top-24 space-y-6">
            
            {/* Booking Widget */}
            <div className="p-8 rounded-[40px] bg-white border-2 border-warm-text shadow-2xl shadow-black/5 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-neko-rose" />
              
              <div className="space-y-1">
                <h2 className="text-[24px] font-bold tracking-tight">Réserver avec Lucas</h2>
                <p className="text-[13px] text-warm-text/40 font-medium">Paiement sécurisé via Neko</p>
              </div>
              
              <div className="space-y-6">
                {/* Service Selection */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-warm-text/30 uppercase tracking-[0.2em]">Service</label>
                  <select 
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-warm-paper border border-warm-border font-bold text-[15px] outline-none focus:border-neko-rose transition-colors appearance-none cursor-pointer"
                  >
                    <option>Garde à domicile</option>
                    <option>Garde chez vous</option>
                    <option>Garderie journée</option>
                    <option>Promenade</option>
                  </select>
                </div>

                {/* Dates Selection */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-warm-text/30 uppercase tracking-[0.2em]">Arrivée</label>
                    <div className="relative">
                      <input type="date" className="w-full p-4 rounded-2xl bg-warm-paper border border-warm-border font-bold text-[13px] outline-none focus:border-neko-rose transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-warm-text/30 uppercase tracking-[0.2em]">Départ</label>
                    <div className="relative">
                      <input type="date" className="w-full p-4 rounded-2xl bg-warm-paper border border-warm-border font-bold text-[13px] outline-none focus:border-neko-rose transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Pet Counter */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-warm-text/30 uppercase tracking-[0.2em]">Nombre d'animaux</label>
                  <div className="flex items-center justify-between p-2 rounded-2xl bg-warm-paper border border-warm-border">
                    <button 
                      onClick={() => setPetCount(Math.max(1, petCount - 1))}
                      className="w-10 h-10 rounded-xl bg-white border border-warm-border flex items-center justify-center hover:bg-warm-paper transition-colors active:scale-90"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-bold text-[18px]">{petCount}</span>
                    <button 
                      onClick={() => setPetCount(petCount + 1)}
                      className="w-10 h-10 rounded-xl bg-white border border-warm-border flex items-center justify-center hover:bg-warm-paper transition-colors active:scale-90"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Recap */}
              <div className="p-6 rounded-3xl bg-warm-paper border border-warm-border space-y-3">
                <div className="flex justify-between text-[14px]">
                  <span className="text-warm-text/60 font-medium">15€ x 3 nuits</span>
                  <span className="font-bold">45€</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-warm-text/60 font-medium">Frais de service</span>
                  <span className="font-bold">5€</span>
                </div>
                <div className="pt-3 border-t border-warm-border flex justify-between items-baseline">
                  <span className="font-bold text-[18px]">Total</span>
                  <span className="font-bold text-[24px] text-neko-rose">50€</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full py-5 bg-neko-rose text-white font-bold text-[18px] rounded-[24px] shadow-xl shadow-neko-rose/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Réserver maintenant
                </button>
                <button className="w-full py-4 border-2 border-warm-text text-warm-text font-bold text-[15px] rounded-[24px] flex items-center justify-center gap-2 hover:bg-warm-paper transition-all">
                  <MessageCircle className="w-5 h-5" />
                  Envoyer un message
                </button>
              </div>

              {/* Guarantees */}
              <div className="space-y-4 pt-4 border-t border-warm-border">
                {[
                  { icon: <ShieldCheck className="w-5 h-5 text-neko-olive" />, text: 'Paiement 100% sécurisé' },
                  { icon: <Zap className="w-5 h-5 text-neko-rose fill-neko-rose" />, text: 'Photos quotidiennes garanties' },
                  { icon: <Shield className="w-5 h-5 text-neko-olive" />, text: 'Assurance vétérinaire incluse' },
                ].map((g, i) => (
                  <div key={i} className="flex gap-3 items-center text-[13px] font-bold text-warm-text/60">
                    {g.icon}
                    <span>{g.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Help Card */}
            <div className="p-6 rounded-[32px] bg-neko-olive text-white space-y-4">
              <h3 className="font-bold text-[18px]">Besoin d'aide ?</h3>
              <p className="text-[13px] opacity-80 leading-relaxed">Notre équipe d'experts est là pour vous accompagner dans votre recherche.</p>
              <button className="w-full py-3 bg-white text-neko-olive font-bold rounded-xl text-[13px] hover:bg-white/90 transition-colors">
                Contacter le support
              </button>
            </div>

          </aside>

        </div>
      </main>
    </div>
  );
};

export default NewSitterProfile;
