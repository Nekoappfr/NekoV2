
import React, { useState } from 'react';

type SidebarView = 'dashboard' | 'messaging' | 'applications' | 'pet_profile' | 'favorites' | 'settings';

interface DashboardAd {
  id: string;
  petName: string;
  image: string;
  dates: string;
  status: 'active' | 'draft' | 'paused';
  location: string;
  applicantsCount: number;
}

const MOCK_ADS: DashboardAd[] = [
  {
    id: 'ad1',
    petName: 'Oscar',
    image: 'https://images.unsplash.com/photo-1533733358354-22119bb4a50d?q=80&w=400',
    dates: '12 - 15 Jan',
    status: 'active',
    location: 'Le Marais, 4e',
    applicantsCount: 3
  },
  {
    id: 'ad2',
    petName: 'Luna',
    image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=400',
    dates: '20 - 25 Fév',
    status: 'draft',
    location: 'Paris 16e',
    applicantsCount: 0
  }
];

const OwnerDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [currentView, setCurrentView] = useState<SidebarView>('dashboard');
  const [ads] = useState<DashboardAd[]>(MOCK_ADS);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
    )},
    { id: 'messaging', label: 'Espace hôte', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
    )},
    { id: 'applications', label: 'Annonces', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
    )}
  ];

  const renderDashboard = () => (
    <div className="flex-1 p-6 md:p-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[19px] md:text-[22px] font-semibold text-[#222222] leading-[1.25] tracking-tight">Vos Annonces en cours</h2>
        <button className="btn-primary text-[11px] py-2 px-5">Nouvelle annonce</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ads.map((ad) => (
          <div key={ad.id} className="bg-white border border-[#E9E9E7] rounded-[12px] overflow-hidden hover:shadow-md transition-all group flex flex-col">
            <div className="relative h-40">
              <img src={ad.image} className="w-full h-full object-cover transition-all duration-500" alt={ad.petName} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
              <div className="absolute top-3 left-3 flex gap-2">
                <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${
                  ad.status === 'active' ? 'bg-green-500 text-white' : 'bg-[#1C1C1B] text-white'
                }`}>
                  {ad.status}
                </span>
              </div>
              <div className="absolute bottom-3 left-3">
                <h3 className="text-[14px] md:text-[15px] font-semibold text-white leading-[1.333] drop-shadow-md">{ad.petName}</h3>
              </div>
            </div>
            <div className="p-4 space-y-3 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-[#717171]">{ad.dates}</span>
              </div>
              <p className="text-[14px] font-bold text-[#222222] leading-[1.5] flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                {ad.location}
              </p>
              <div className="pt-3 border-t border-[#F0F0EF] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1,2,3].slice(0, ad.applicantsCount).map(i => (
                      <img key={i} src={`https://i.pravatar.cc/100?u=cand${ad.id}${i}`} className="w-5 h-5 rounded-full border border-white" />
                    ))}
                  </div>
                  <span className="text-[12px] font-semibold text-[#717171] leading-[1.33] uppercase tracking-widest">
                    {ad.applicantsCount} Candidats
                  </span>
                </div>
                <button className="text-[11px] font-bold text-[#C25E72] hover:underline">Gérer</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] overflow-hidden relative font-sans">
      {/* SIDEBAR */}
      <aside className="hidden md:flex w-60 bg-white border-r border-[#E9E9E7] flex-col sticky top-0 h-screen z-40">
        <div className="p-5 flex items-center gap-3 border-b border-[#F0F0EF]">
          <div className="w-8 h-8 rounded-lg bg-[#1C1C1B] flex items-center justify-center">
             <svg width="18" height="18" viewBox="0 0 100 100" fill="none"><path d="M32 25C32 22 34 20 37 20H63C66 20 68 22 68 25L62 42C61 45 58 48 50 48C42 48 39 45 38 42L32 25Z" fill="white"/></svg>
          </div>
          <span className="font-black text-[13px] tracking-tight uppercase text-[#1C1C1B]/80">Neko Pro</span>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {sidebarItems.map(item => (
            <button 
              key={item.id}
              onClick={() => setCurrentView(item.id as SidebarView)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all ${currentView === item.id ? 'bg-[#F0F0EF] text-[#1C1C1B]' : 'text-[#37352F]/60 hover:bg-[#F9F9F8] hover:text-[#1C1C1B]'}`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-[12px] font-bold">{item.label}</span>
              </div>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-[#F0F0EF]">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-500 font-bold text-[12px] hover:bg-red-50 transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Déconnexion
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-screen overflow-hidden pb-24 md:pb-0">
        <header className="px-6 py-4 bg-white border-b border-[#F0F0EF] flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-6">
            <nav className="hidden lg:flex items-center gap-6">
              <span className="text-[12px] font-bold text-[#1C1C1B]">Vue d'ensemble</span>
              <span className="text-[12px] font-bold text-[#37352F]/40 hover:text-[#1C1C1B] cursor-pointer">Statistiques</span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-8 h-8 rounded-xl bg-[#F0F0EF] flex items-center justify-center text-[#1C1C1B]/40 hover:text-[#C25E72] cursor-pointer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#C25E72] rounded-full border-2 border-white"></div>
            </div>
            <div className="w-8 h-8 rounded-xl overflow-hidden border border-[#F0F0EF]">
              <img src="https://i.pravatar.cc/150?u=sarah" className="w-full h-full object-cover" alt="Profile" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto no-scrollbar">
           {renderDashboard()}
        </div>
      </main>
    </div>
  );
};

export default OwnerDashboard;
