
import React from 'react';
import { motion } from 'motion/react';
import { 
  Bell, 
  MapPin, 
  Star, 
  ClipboardList, 
  MessageCircle, 
  Heart, 
  CreditCard, 
  User, 
  Settings, 
  Shield, 
  HelpCircle, 
  ChevronRight, 
  Plus, 
  Search,
  LogOut,
  Users
} from 'lucide-react';

const OwnerDashboard: React.FC<{ onLogout: () => void, onMessagesClick?: () => void }> = ({ onLogout, onMessagesClick }) => {
  const [showPublicProfile, setShowPublicProfile] = React.useState(false);

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  if (showPublicProfile) {
    return (
      <div className="min-h-screen bg-white p-6 animate-in slide-in-from-right duration-300">
        <button 
          onClick={() => setShowPublicProfile(false)}
          className="mb-8 p-2 rounded-full hover:bg-warm-paper transition-colors"
        >
          <ChevronRight size={24} className="rotate-180" />
        </button>
        <div className="space-y-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-24 h-24 bg-neko-rose rounded-full flex items-center justify-center text-white text-4xl font-bold">J</div>
            <div>
              <h1 className="text-2xl font-bold text-anthracite">Juliette M.</h1>
              <p className="text-neko-olive font-medium">Membre depuis Janvier 2026</p>
            </div>
            <div className="flex gap-1 text-neko-rose">
              {[1,2,3,4,5].map(i => <Star key={i} size={20} fill={i <= 4 ? "currentColor" : "none"} />)}
              <span className="ml-2 text-anthracite font-bold">4.9 (10 avis)</span>
            </div>
          </div>
          
            <div className="bg-warm-paper p-6 rounded-[32px] space-y-4">
            <h2 className="font-bold text-lg">À propos</h2>
            <p className="text-anthracite/70 leading-relaxed">
              Passionnée par les chats depuis toujours, j'habite dans le 11ème avec mon amour Mochi. 
              Je cherche des personnes de confiance pour prendre soin de lui pendant mes déplacements professionnels.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-bold text-lg px-2">Ses chats</h2>
            <div className="flex justify-start">
              <div className="bg-white border border-warm-border p-4 rounded-[24px] text-center w-[140px]">
                <span className="text-3xl block mb-2">🐈‍⬛</span>
                <span className="font-bold">Mochi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-32 font-sans selection:bg-neko-rose/20">
      <div className="max-w-[390px] mx-auto pt-4">
        {/* 3. Carte Hero — Profil utilisateur */}
        <motion.div 
          {...fadeUp}
          onClick={() => setShowPublicProfile(true)}
          className="mx-5 mb-4 p-5 bg-gradient-to-br from-[#C25E72] to-[#A34A5E] rounded-[32px] text-white shadow-[0_8px_32px_rgba(194,94,114,0.2)] cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-[52px] h-[52px] bg-white/20 border-2 border-white/40 rounded-full flex items-center justify-center text-[20px] font-bold">
                J
              </div>
              <div>
                <h1 className="text-[18px] font-bold tracking-tight">Juliette M.</h1>
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="flex gap-0.5 text-white">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={10} fill={i <= 4 ? "currentColor" : "none"} strokeWidth={3} />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold opacity-80">(10)</span>
                </div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ChevronRight size={18} />
            </div>
          </div>
        </motion.div>

        {/* 4. Section "Annonce" */}
        <motion.section 
          {...fadeUp}
          transition={{ delay: 0.1 }}
          className="px-5 pt-4"
        >
          <h2 className="text-[11px] font-bold uppercase tracking-[2px] text-neko-olive mb-3 px-1">Annonce</h2>
          <div className="bg-white border border-warm-border rounded-[32px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.07)] hover:border-neko-rose transition-colors cursor-pointer">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-[16px] font-bold text-anthracite">Garde Mochi & Yuzu</h3>
                <p className="text-[14px] text-neko-olive mt-0.5">14 – 21 mars 2026</p>
              </div>
              <div className="bg-[#FFF0F2] text-neko-rose px-3 py-1 rounded-full text-[10px] font-bold tracking-widest">
                ACTIVE
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-warm-border flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white" style={{ backgroundColor: ['#FFD1DC', '#D1F2EB', '#FEF9E7'][i-1] }}></div>
                  ))}
                </div>
                <span className="text-[13px] font-semibold text-neko-rose">5 pet sitters ont postulé</span>
              </div>
              <span className="text-[13px] font-bold text-anthracite">Voir →</span>
            </div>
          </div>
        </motion.section>

        {/* 5.5 Section "Mes Messages" */}
        <motion.section 
          {...fadeUp}
          transition={{ delay: 0.15 }}
          className="px-5 pt-8"
        >
          <h2 className="text-[10px] font-bold uppercase tracking-[2px] text-neko-olive mb-2 px-1">Mes Messages</h2>
          <div className="bg-white border border-warm-border rounded-[24px] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
            <div 
              onClick={onMessagesClick}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#FFF0F2] transition-colors"
            >
              <div className="w-9 h-9 bg-warm-paper rounded-lg flex items-center justify-center text-anthracite">
                <MessageCircle size={16} />
              </div>
              <div className="flex-1">
                <span className="text-[13px] font-bold block">Messages</span>
                <p className="text-[11px] text-neko-olive mt-0.5">3 nouvelles discussions</p>
              </div>
              <div className="bg-neko-rose text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                3
              </div>
              <ChevronRight size={16} className="text-warm-border" />
            </div>
          </div>
        </motion.section>

        {/* 5. Section "Mes chats" */}
        <motion.section 
          {...fadeUp}
          transition={{ delay: 0.2 }}
          className="px-5 pt-8"
        >
          <h2 className="text-[10px] font-bold uppercase tracking-[2px] text-neko-olive mb-2 px-1">Mes chats</h2>
          <div className="flex items-center gap-3">
            {[
              { name: 'Mochi', breed: 'British Shorthair', emoji: '🐈‍⬛', age: '2 ans' }
            ].map((chat, i) => (
              <div key={i} className="bg-warm-paper rounded-[16px] px-3 py-2 flex items-center gap-3 hover:scale-[1.02] transition-transform cursor-pointer w-fit min-w-[160px]">
                <span className="text-[24px]">{chat.emoji}</span>
                <div className="text-left">
                  <span className="text-[13px] font-bold block leading-tight">{chat.name}</span>
                  <span className="text-[10px] text-neko-olive block">{chat.breed}</span>
                </div>
                <div className="ml-2 bg-[#FFF0F2] text-neko-rose px-2 py-0.5 rounded-full text-[9px] font-bold">
                  {chat.age}
                </div>
              </div>
            ))}
            <button className="h-[48px] px-4 border-1 border-dashed border-neko-rose rounded-[16px] text-neko-rose font-bold text-[12px] hover:bg-[#FFF0F2] transition-colors flex items-center justify-center gap-1.5">
              <Plus size={14} /> Ajouter
            </button>
          </div>
        </motion.section>

        {/* 6. Section "Mon espace" */}
        <motion.section 
          {...fadeUp}
          transition={{ delay: 0.3 }}
          className="px-5 pt-8"
        >
          <h2 className="text-[11px] font-bold uppercase tracking-[2px] text-neko-olive mb-3 px-1">Mon espace</h2>
          <div className="bg-white border border-warm-border rounded-[32px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.07)]">
            {[
              { icon: <ClipboardList size={18} />, label: 'Mes annonces', desc: 'Historique & annonces passées' },
              { icon: <Heart size={18} />, label: 'Pet sitters favoris', desc: 'Sauvegardés & notés' },
              { icon: <CreditCard size={18} />, label: 'Paiements', desc: 'Moyens de paiement · Factures' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-[#FFF0F2] transition-colors border-b border-warm-border last:border-0">
                <div className="w-10 h-10 bg-warm-paper rounded-xl flex items-center justify-center text-anthracite">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <span className="text-[14px] font-bold block">{item.label}</span>
                  {item.desc && <p className="text-[12px] text-neko-olive mt-0.5">{item.desc}</p>}
                </div>
                <ChevronRight size={20} className="text-warm-border" />
              </div>
            ))}
          </div>
        </motion.section>

        {/* 7. Section "Paramètres" */}
        <motion.section 
          {...fadeUp}
          transition={{ delay: 0.4 }}
          className="px-5 pt-8"
        >
          <h2 className="text-[11px] font-bold uppercase tracking-[2px] text-neko-olive mb-3 px-1">Paramètres</h2>
          <div className="bg-white border border-warm-border rounded-[32px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.07)]">
            {[
              { icon: <User size={18} />, label: 'Informations personnelles' },
              { icon: <Users size={18} />, label: 'Parrainer des amis' },
              { icon: <Bell size={18} />, label: 'Notifications', value: 'Activées' },
              { icon: <Shield size={18} />, label: 'Sécurité du compte' },
              { icon: <HelpCircle size={18} />, label: 'Aide & contact' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-[#FFF0F2] transition-colors border-b border-warm-border last:border-0">
                <div className="w-10 h-10 bg-warm-paper rounded-xl flex items-center justify-center text-anthracite">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <span className="text-[14px] font-bold block">{item.label}</span>
                </div>
                {item.value && <span className="text-[13px] text-[#999] font-medium">{item.value}</span>}
                <ChevronRight size={20} className="text-warm-border" />
              </div>
            ))}
          </div>
        </motion.section>

        {/* 8. Bouton "Se déconnecter" */}
        <div className="px-5 pt-8 mb-24">
          <button 
            onClick={onLogout}
            className="w-full py-4 border border-warm-border rounded-lg text-neko-olive font-bold text-[15px] hover:bg-[#FFF0F2] hover:text-neko-rose hover:border-[#FFF0F2] transition-all flex items-center justify-center gap-2"
          >
            <LogOut size={18} /> Se déconnecter
          </button>
        </div>
      </div>

      {/* 9. Barre de navigation fixe — Taille réduite & Blur */}
      <nav className="fixed bottom-0 left-0 right-0 h-[68px] bg-[#C25E72]/85 backdrop-blur-xl border-t border-white/20 flex justify-around items-center px-4 pb-2 z-[100] shadow-[0_-8px_32px_rgba(0,0,0,0.2)]">
        {[
          { icon: <Search size={20} />, label: 'Rechercher' },
          { icon: <Heart size={20} />, label: 'Favoris', badge: 2 },
          { icon: <Plus size={24} />, label: 'Publier', center: true },
          { icon: <MessageCircle size={20} />, label: 'Messages', badge: 3, onClick: onMessagesClick },
          { icon: <User size={20} />, label: 'Compte', active: true }
        ].map((item, i) => (
          <div 
            key={i} 
            onClick={() => item.onClick?.()}
            className={`flex flex-col items-center gap-0.5 cursor-pointer transition-all ${item.active ? 'text-white' : 'text-white/60'} ${item.center ? 'relative' : ''}`}
          >
            {item.center ? (
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#C25E72] -mt-8 shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:scale-110 transition-transform">
                {item.icon}
              </div>
            ) : (
              <div className="relative flex flex-col items-center">
                <div className={`p-1.5 rounded-xl transition-colors ${item.active ? 'bg-white/20' : ''}`}>
                  {item.icon}
                </div>
                {item.badge && (
                  <div className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-white text-[#C25E72] text-[8px] font-bold rounded-full flex items-center justify-center border-2 border-[#C25E72]">
                    {item.badge}
                  </div>
                )}
              </div>
            )}
            {!item.center && <span className={`text-[8px] font-bold tracking-tight ${item.active ? 'text-white' : 'text-white/60'}`}>{item.label}</span>}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default OwnerDashboard;
