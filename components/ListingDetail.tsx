
import React from 'react';
import { motion } from 'motion/react';
import { MOCK_LISTINGS } from '../constants';
import { 
  ChevronLeft, MapPin, Calendar, Clock, Shield, 
  MessageSquare, Heart, Star, Info, CheckCircle2,
  ChevronRight, Share2, Flag
} from 'lucide-react';

interface ListingDetailProps {
  listingId: string | null;
  onBack: () => void;
}

const ListingDetail: React.FC<ListingDetailProps> = ({ listingId, onBack }) => {
  const listing = MOCK_LISTINGS.find(l => l.id === listingId) || MOCK_LISTINGS[0];

  return (
    <div className="min-h-screen bg-warm-bg font-sans text-warm-text pb-20">
      {/* Sticky Header */}
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
              <span className="text-[14px] font-bold leading-none">Annonce de {listing.ownerName}</span>
              <span className="text-[11px] text-warm-text/40 font-medium mt-1">{listing.location} • {listing.startDate}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-warm-paper rounded-full transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-warm-paper rounded-full transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">
          
          {/* Main Column (Left) */}
          <div className="space-y-12">
            
            {/* 1. Hero Image & Gallery */}
            <section className="space-y-6">
              <div className="relative aspect-square md:aspect-[16/9] rounded-[40px] overflow-hidden shadow-2xl shadow-black/5 group">
                <img 
                  src={listing.image} 
                  alt={listing.petName} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[5000ms] ease-out" 
                />
                <div className="absolute top-6 left-6 px-5 py-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-xl border border-white/20">
                  <span className="text-[11px] font-bold text-neko-rose uppercase tracking-[0.15em] flex items-center gap-2">
                    <div className="w-2 h-2 bg-neko-rose rounded-full animate-pulse" />
                    {listing.serviceType === 'BOARDING' ? 'Garde chez le sitter' : 'Visite à domicile'}
                  </span>
                </div>
                <button className="absolute bottom-6 right-6 px-6 py-3 bg-black/60 backdrop-blur-md text-white rounded-2xl text-[13px] font-bold hover:bg-black/80 transition-all">
                  Voir les 8 photos
                </button>
              </div>

              {/* Title & Stats */}
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-2">
                    <h2 className="text-[40px] md:text-[56px] font-bold text-warm-text leading-[0.9] tracking-tighter">
                      {listing.petName}
                    </h2>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-warm-text/50 font-medium text-[15px]">
                      <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-neko-rose" /> {listing.location}</span>
                      <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-neko-rose" /> {listing.startDate}</span>
                      <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-neko-rose" /> Publié il y a 2h</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-warm-paper rounded-[24px] border border-warm-border">
                    <div className="flex flex-col items-end">
                      <span className="text-[20px] font-bold leading-none">{listing.rating}</span>
                      <span className="text-[10px] font-bold text-warm-text/30 uppercase tracking-widest mt-1">Note hôte</span>
                    </div>
                    <div className="flex text-neko-rose">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className={`w-4 h-4 ${i <= Math.floor(listing.rating) ? 'fill-current' : 'opacity-20'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Description */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <h3 className="text-[24px] font-bold tracking-tight">À propos de {listing.petName}</h3>
                <div className="h-px flex-1 bg-warm-border" />
              </div>
              <div className="bg-white rounded-[32px] border border-warm-border p-8 shadow-sm">
                <p className="text-[18px] text-warm-text/70 leading-relaxed font-medium">
                  Bonjour ! Je cherche une personne de confiance pour s'occuper de mon chat {listing.petName} pendant mes vacances. 
                  C'est un chat très calme qui adore les câlins et jouer avec des plumes. Il a besoin d'une présence régulière et de beaucoup d'attention.
                  Il est propre, vacciné et très sociable avec les humains.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-warm-border">
                  {[
                    { label: 'Mâle', icon: '♂️' },
                    { label: '2 ans', icon: '🎂' },
                    { label: 'Vacciné', icon: '💉' },
                    { label: 'Sociable', icon: '🤝' }
                  ].map((trait, i) => (
                    <div key={i} className="flex items-center gap-3 text-[14px] font-bold text-warm-text/60">
                      <span className="text-xl">{trait.icon}</span>
                      <span>{trait.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 3. Owner Info Card */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <h3 className="text-[24px] font-bold tracking-tight">Le propriétaire</h3>
                <div className="h-px flex-1 bg-warm-border" />
              </div>
              <div className="p-8 bg-warm-paper rounded-[32px] border border-warm-border flex flex-col md:flex-row items-center gap-8 group hover:border-neko-rose/30 transition-all">
                <div className="relative">
                  <img 
                    src={listing.ownerAvatars[0]} 
                    alt={listing.ownerName} 
                    className="w-24 h-24 rounded-[24px] object-cover border-4 border-white shadow-xl group-hover:rotate-3 transition-transform" 
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-neko-olive rounded-full border-4 border-white flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left space-y-2">
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <h4 className="text-[22px] font-bold text-warm-text">{listing.ownerName}</h4>
                    <span className="px-3 py-1 bg-neko-olive/10 text-neko-olive rounded-full text-[10px] font-bold uppercase tracking-wider">Membre vérifié</span>
                  </div>
                  <p className="text-[14px] text-warm-text/50 font-medium">Membre depuis 2024 • 12 gardes effectuées sur Neko</p>
                  <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                    <span className="text-[13px] font-bold text-neko-rose flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-current" /> 5.0 (8 avis)
                    </span>
                    <span className="text-[13px] font-bold text-neko-olive flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> Réponse rapide
                    </span>
                  </div>
                </div>
                <button className="px-8 py-4 bg-white text-warm-text font-bold rounded-[20px] border border-warm-border hover:bg-warm-paper hover:border-warm-text/20 transition-all shadow-sm">
                  Voir le profil
                </button>
              </div>
            </section>

            {/* 4. Safety & Trust */}
            <section className="p-8 bg-neko-olive/5 rounded-[32px] border border-neko-olive/10 flex flex-col md:flex-row items-center gap-6 text-neko-olive">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                <Shield className="w-8 h-8" />
              </div>
              <div className="space-y-1 text-center md:text-left">
                <h4 className="font-bold text-[18px]">Garde protégée par Neko</h4>
                <p className="text-[14px] opacity-80 font-medium leading-relaxed">
                  Toutes les réservations effectuées sur Neko bénéficient de notre assurance vétérinaire, 
                  d'un support 7j/7 et d'un paiement sécurisé.
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar Column (Right) - Sticky Widget */}
          <aside className="hidden lg:block sticky top-24 space-y-6">
            <div className="p-8 rounded-[40px] bg-white border-2 border-warm-text shadow-2xl shadow-black/5 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-neko-rose" />
              
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-warm-text/30 uppercase tracking-[0.2em]">Budget proposé</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-[48px] font-bold text-warm-text tracking-tighter leading-none">15€</span>
                  <span className="text-[18px] font-bold text-warm-text/30">/ nuit</span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-warm-paper border border-warm-border space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <Calendar className="w-5 h-5 text-neko-rose" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-warm-text/30 uppercase tracking-wider">Dates</span>
                    <span className="text-[14px] font-bold">{listing.startDate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <MapPin className="w-5 h-5 text-neko-rose" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-warm-text/30 uppercase tracking-wider">Lieu</span>
                    <span className="text-[14px] font-bold">{listing.location}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full py-5 bg-neko-rose text-white font-bold text-[18px] rounded-[24px] shadow-xl shadow-neko-rose/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Postuler à l'annonce
                </button>
                <button className="w-full py-4 border-2 border-warm-text text-warm-text font-bold text-[15px] rounded-[24px] flex items-center justify-center gap-2 hover:bg-warm-paper transition-all">
                  <Heart className="w-5 h-5" />
                  Ajouter aux favoris
                </button>
              </div>

              <div className="space-y-4 pt-4 border-t border-warm-border">
                {[
                  { icon: <Shield className="w-5 h-5 text-neko-olive" />, text: 'Paiement sécurisé Neko' },
                  { icon: <MessageSquare className="w-5 h-5 text-neko-rose" />, text: 'Assistance 7j/7' },
                  { icon: <Flag className="w-5 h-5 text-warm-text/30" />, text: 'Signaler cette annonce' },
                ].map((g, i) => (
                  <div key={i} className="flex gap-3 items-center text-[13px] font-bold text-warm-text/60">
                    {g.icon}
                    <span>{g.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Tips */}
            <div className="p-6 rounded-[32px] bg-warm-paper border border-warm-border space-y-4">
              <div className="flex items-center gap-3 text-neko-rose">
                <Info className="w-5 h-5" />
                <h3 className="font-bold text-[15px]">Conseils de sécurité</h3>
              </div>
              <p className="text-[12px] text-warm-text/60 leading-relaxed font-medium">
                Ne payez jamais en dehors de la plateforme Neko pour bénéficier de notre assurance et de notre protection.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ListingDetail;
