
import React, { useState } from 'react';

type SitterTab = 'home' | 'agenda' | 'messages' | 'revenue' | 'profile';

const SitterDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<SitterTab>('home');

  const containerStyle: React.CSSProperties = {
    maxWidth: '480px',
    margin: '0 auto',
    backgroundColor: '#FAFAFA',
    minHeight: '100vh',
    paddingBottom: '100px',
    fontFamily: 'Inter, sans-serif',
    position: 'relative',
    color: '#37352F'
  };

  const navBarStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '480px',
    height: '80px',
    backgroundColor: 'white',
    borderTop: '1px solid #E9E9E7',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 1000
  };

  const renderTabIcon = (tab: SitterTab) => {
    const isActive = activeTab === tab;
    const color = isActive ? '#C25E72' : 'rgba(55, 53, 47, 0.4)';
    
    switch (tab) {
      case 'home': return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
      case 'agenda': return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
      case 'messages': return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;
      case 'revenue': return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
      case 'profile': return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home': return <HomeTab />;
      case 'agenda': return <AgendaTab />;
      case 'messages': return <MessagesTab />;
      case 'revenue': return <RevenueTab />;
      case 'profile': return <ProfileTab onLogout={onLogout} />;
    }
  };

  return (
    <div style={containerStyle}>
      {renderTabContent()}
      
      <nav style={navBarStyle}>
        {(['home', 'agenda', 'messages', 'revenue', 'profile'] as SitterTab[]).map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {renderTabIcon(tab)}
            <span style={{
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: activeTab === tab ? '#C25E72' : 'rgba(55, 53, 47, 0.4)'
            }}>
              {tab === 'home' ? 'Accueil' : tab === 'agenda' ? 'Agenda' : tab === 'messages' ? 'Messages' : tab === 'revenue' ? 'Revenus' : 'Profil'}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

const HomeTab = () => {
  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Libre Baskerville, serif', fontSize: '26px', fontWeight: 600, color: '#222222', lineHeight: '1.2', margin: 0 }}>Bonjour Marie 👋</h1>
        <p style={{ fontSize: '14px', color: '#222222', lineHeight: '1.5', margin: '4px 0 12px 0' }}>Vous avez 2 gardes cette semaine</p>
        <span style={{ display: 'inline-block', backgroundColor: '#C25E72', color: 'white', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', padding: '4px 10px', borderRadius: '6px' }}>3 nouveaux messages</span>
      </div>

      <div style={{ display: 'flex', overflowX: 'auto', gap: '12px', paddingBottom: '16px', margin: '0 -24px 24px -24px', padding: '0 24px' }} className="no-scrollbar">
        <StatCard title="Revenus du mois" value="€ 340" trend="+12% vs mois dernier" trendColor="#3D7A5E" />
        <StatCard title="Gardes ce mois" value="8 gardes" trend="Progression constante" trendColor="#C25E72" />
        <StatCard title="Note moyenne" value="⭐ 4.9" trend="47 avis clients" trendColor="#37352F" />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '19px', fontWeight: 600, lineHeight: '1.25', color: '#222222', marginBottom: '16px' }}>Prochaine garde</h2>
        <div style={{ backgroundColor: '#1C1C1B', borderRadius: '16px', borderLeft: '3px solid #C25E72', padding: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
           <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
             <div style={{ position: 'relative' }}>
               <img src="https://i.pravatar.cc/100?u=marie_owner" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
               <div style={{ position: 'absolute', bottom: -2, right: -2, fontSize: '14px' }}>🐱</div>
             </div>
             <div>
               <h3 style={{ fontSize: '14px', fontWeight: 600, lineHeight: '1.333', color: 'white', margin: 0 }}>Sophie L.</h3>
               <p style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(255,255,255,0.7)', margin: 0 }}>Maman de Bella</p>
               <div style={{ display: 'inline-block', backgroundColor: '#F7ECF0', color: '#C25E72', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', padding: '2px 8px', borderRadius: '4px', marginTop: '6px' }}>Pension</div>
             </div>
           </div>
           <div style={{ fontSize: '14px', fontWeight: 400, color: '#222222', lineHeight: '1.5', marginBottom: '16px' }}>
             15 Jan — 20 Jan (5 nuits)
           </div>
           <div style={{ display: 'flex', gap: '8px' }}>
             <button style={{ flex: 1, border: '1px solid #1C1C1B', borderRadius: '8px', padding: '10px', fontSize: '12px', fontWeight: 700, backgroundColor: 'white' }}>Détails</button>
             <button style={{ flex: 1, backgroundColor: '#C25E72', color: 'white', border: 'none', borderRadius: '8px', padding: '10px', fontSize: '12px', fontWeight: 700 }}>Contacter</button>
           </div>
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '19px', fontWeight: 600, lineHeight: '1.25', color: '#222222', margin: 0 }}>Demandes en attente</h2>
          <span style={{ backgroundColor: '#F0F0EF', padding: '2px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 600, color: '#717171' }}>1</span>
        </div>
        <div style={{ backgroundColor: '#1C1C1B', border: '1px solid #333', borderRadius: '16px', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 600, lineHeight: '1.333', color: 'white', margin: 0 }}>Marc A. • Max</h3>
              <p style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(255,255,255,0.7)', margin: '2px 0' }}>10 Fév - 15 Fév • Visites</p>
            </div>
            <div style={{ color: '#E07A3A', fontSize: '12px', fontWeight: 600 }}>Expire dans 18h</div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ flex: 1, backgroundColor: '#C25E72', color: 'white', border: 'none', borderRadius: '8px', padding: '10px', fontSize: '12px', fontWeight: 700 }}>Accepter ✓</button>
            <button style={{ flex: 1, backgroundColor: 'white', border: '1px solid #E9E9E7', borderRadius: '8px', padding: '10px', fontSize: '12px', fontWeight: 700 }}>Décliner ✗</button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <QuickAction label="Mes dispo" icon="📅" />
        <QuickAction label="Notifications" icon="🔔" />
        <QuickAction label="Paramètres" icon="⚙️" />
        <QuickAction label="Statistiques" icon="📊" />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, trendColor }: { title: string, value: string, trend: string, trendColor: string }) => (
  <div style={{ flexShrink: 0, width: '160px', backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E9E9E7', padding: '16px' }}>
    <p style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(55, 53, 47, 0.4)', margin: '0 0 8px 0' }}>{title}</p>
    <p style={{ fontSize: '18px', fontWeight: 800, color: '#1C1C1B', margin: '0 0 4px 0' }}>{value}</p>
    <p style={{ fontSize: '10px', fontWeight: 600, color: trendColor, margin: 0 }}>{trend}</p>
  </div>
);

const QuickAction = ({ label, icon }: { label: string, icon: string }) => (
  <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E9E9E7', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
    <span style={{ fontSize: '20px' }}>{icon}</span>
    <span style={{ fontSize: '12px', fontWeight: 700 }}>{label}</span>
  </div>
);

const AgendaTab = () => {
  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Libre Baskerville, serif', fontSize: '20px', fontWeight: 700, color: '#1C1C1B', margin: 0 }}>Mon Agenda</h1>
        <div style={{ display: 'flex', backgroundColor: '#F0F0EF', padding: '3px', borderRadius: '99px' }}>
          <button style={{ backgroundColor: '#C25E72', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '99px', fontSize: '11px', fontWeight: 700 }}>Mois</button>
          <button style={{ background: 'none', border: 'none', padding: '6px 12px', fontSize: '11px', fontWeight: 700, color: '#37352F' }}>Semaine</button>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '20px', border: '1px solid #E9E9E7', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 800, textAlign: 'center', marginBottom: '16px' }}>Janvier 2026</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, idx) => <div key={`${d}-${idx}`} style={{ fontSize: '10px', textAlign: 'center', color: 'rgba(55, 53, 47, 0.4)', fontWeight: 800, paddingBottom: '8px' }}>{d}</div>)}
          {Array.from({ length: 31 }).map((_, i) => {
            const day = i + 1;
            const isBlocked = day >= 5 && day <= 8;
            const isConfirmed = day >= 15 && day <= 20;
            const isPending = day === 25;
            const isAvailable = !isBlocked && !isConfirmed && !isPending && day > 10;
            
            return (
              <div key={i} style={{ 
                aspectRatio: '1', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '12px', 
                fontWeight: 700,
                borderRadius: '50%',
                backgroundColor: isConfirmed ? '#E07A3A' : isBlocked ? '#C25E72' : 'transparent',
                color: (isConfirmed || isBlocked) ? 'white' : '#1C1C1B',
                position: 'relative',
                cursor: 'pointer'
              }}>
                {day}
                {isAvailable && <div style={{ position: 'absolute', bottom: '4px', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#3D7A5E' }}></div>}
                {isPending && <div style={{ position: 'absolute', bottom: '4px', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#4A7FA5' }}></div>}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          <LegendItem color="#3D7A5E" label="Disponible" />
          <LegendItem color="#C25E72" label="Indisponible" />
          <LegendItem color="#E07A3A" label="Confirmée" />
          <LegendItem color="#4A7FA5" label="En attente" />
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>Prochaines gardes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <AgendaItem date="15-20 Jan" owner="Sophie L." pet="Bella" status="Confirmée" statusColor="#E07A3A" />
          <AgendaItem date="10-15 Fév" owner="Marc A." pet="Max" status="En attente" statusColor="#4A7FA5" />
        </div>
      </div>

      <button style={{ width: '100%', backgroundColor: 'white', border: '1px solid #1C1C1B', borderRadius: '8px', padding: '14px', fontSize: '14px', fontWeight: 700 }}>Bloquer une période</button>
    </div>
  );
};

const LegendItem = ({ color, label }: { color: string, label: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color }}></div>
    <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(55, 53, 47, 0.6)' }}>{label}</span>
  </div>
);

const AgendaItem = ({ date, owner, pet, status, statusColor }: { date: string, owner: string, pet: string, status: string, statusColor: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: 'white', border: '1px solid #E9E9E7', borderRadius: '12px', marginBottom: '8px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ backgroundColor: '#F7ECF0', color: '#C25E72', padding: '6px 10px', borderRadius: '8px', textAlign: 'center' }}>
        <div style={{ fontSize: '10px', fontWeight: 800 }}>{date}</div>
      </div>
      <div>
        <div style={{ fontSize: '13px', fontWeight: 700 }}>{owner} • {pet}</div>
      </div>
    </div>
    <div style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', color: statusColor }}>{status}</div>
  </div>
);

const MessagesTab = () => {
  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ fontFamily: 'Libre Baskerville, serif', fontSize: '22px', fontWeight: 700, marginBottom: '20px' }}>Messages</h1>
      
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#37352F" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
        <input 
          type="text" 
          placeholder="Rechercher une conversation..." 
          style={{ width: '100%', padding: '12px 12px 12px 40px', backgroundColor: 'white', border: '1px solid #E9E9E7', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '20px' }} className="no-scrollbar">
        {['Tous', 'En cours', 'Terminées', 'Non lus'].map((f, i) => (
          <button key={f} style={{ 
            padding: '8px 16px', 
            borderRadius: '8px', 
            fontSize: '12px', 
            fontWeight: 700, 
            backgroundColor: i === 0 ? '#C25E72' : 'white',
            color: i === 0 ? 'white' : '#37352F',
            border: i === 0 ? 'none' : '1px solid #E9E9E7',
            whiteSpace: 'nowrap'
          }}>
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <MessageRow name="Sophie L." pet="Bella" text="Est-ce que Bella pourra dormir avec..." time="12:45" unread={2} status="À venir ✅" />
        <MessageRow name="Marc A." pet="Max" text="Super, merci pour les photos !" time="Hier" unread={0} status="En cours 🟠" />
        <MessageRow name="Julie B." pet="Oscar" text="Merci encore Marie !" time="Lun" unread={0} status="Terminée" />
      </div>
    </div>
  );
};

const MessageRow = ({ name, pet, text, time, unread, status }: { name: string, pet: string, text: string, time: string, unread: number, status?: string }) => (
  <div style={{ display: 'flex', gap: '12px', padding: '16px 0', borderBottom: '1px solid #E9E9E7', cursor: 'pointer' }}>
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <img src={`https://i.pravatar.cc/150?u=${name}`} style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: -2, right: -2, fontSize: '14px' }}>🐱</div>
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>{name}</h3>
        <span style={{ fontSize: '11px', color: 'rgba(55, 53, 47, 0.4)', fontWeight: 600 }}>{time}</span>
      </div>
      <p style={{ fontSize: '12px', color: '#37352F', margin: '0 0 6px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{text}</p>
      {status && (
        <span style={{ fontSize: '8px', fontWeight: 900, textTransform: 'uppercase', backgroundColor: '#F0F0EF', padding: '2px 6px', borderRadius: '4px' }}>{status}</span>
      )}
    </div>
    {unread > 0 && (
      <div style={{ width: '18px', height: '18px', backgroundColor: '#C25E72', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px', fontWeight: 800 }}>{unread}</div>
    )}
  </div>
);

const RevenueTab = () => {
  return (
    <div style={{ padding: '24px' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #C25E72 0%, #A84D61 100%)', 
        borderRadius: '16px', 
        padding: '24px', 
        color: 'white',
        marginBottom: '24px',
        boxShadow: '0 10px 20px rgba(194, 94, 114, 0.15)'
      }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, margin: 0 }}>€ 340</h1>
        <p style={{ fontSize: '12px', fontWeight: 600, opacity: 0.8, margin: '8px 0 12px 0' }}>Ce mois • dont €30 de pourboires 🎉</p>
        <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6, margin: 0 }}>Prochain virement 28 mars</p>
      </div>

      <div style={{ display: 'flex', backgroundColor: '#F0F0EF', padding: '3px', borderRadius: '99px', marginBottom: '24px' }}>
        {['Semaine', 'Mois', '3 mois', 'Année'].map((p, i) => (
          <button key={p} style={{ 
            flex: 1, 
            backgroundColor: i === 1 ? 'white' : 'transparent', 
            color: i === 1 ? '#1C1C1B' : '#37352F', 
            border: 'none', 
            padding: '8px', 
            borderRadius: '99px', 
            fontSize: '11px', 
            fontWeight: 700 
          }}>
            {p}
          </button>
        ))}
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E9E9E7', padding: '20px', marginBottom: '24px' }}>
        <div style={{ height: '140px', display: 'flex', alignItems: 'flex-end', gap: '8px', borderBottom: '1px solid #E9E9E7', paddingBottom: '8px' }}>
          {[40, 60, 45, 80, 55, 70, 90].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, backgroundColor: '#C25E72', borderRadius: '4px 4px 0 0' }}></div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px' }}>
          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(d => <span key={d} style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(55, 53, 47, 0.4)' }}>{d}</span>)}
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E9E9E7', padding: '20px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>Détail par service</h2>
        <RevenueRow icon="🏠" label="Pension" count="4 gardes" amount="€ 180" />
        <RevenueRow icon="📍" label="Visites" count="12 visites" amount="€ 120" />
        <RevenueRow icon="🔑" label="Garde Maison" count="2 jours" amount="€ 40" />
      </div>

      <div style={{ backgroundColor: '#F7ECF0', borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <span style={{ fontSize: '20px' }}>🔒</span>
          <div>
            <p style={{ fontFamily: 'Libre Baskerville, serif', fontSize: '13px', fontStyle: 'italic', color: '#1C1C1B', margin: '0 0 8px 0' }}>
              Sur chaque garde, Neko conserve 15% pour couvrir votre assurance Holivet, la vérification des profils et le support 7j/7.
            </p>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#C25E72', margin: 0 }}>Vous touchez toujours 100% des pourboires.</p>
          </div>
        </div>
      </div>

      <button style={{ width: '100%', backgroundColor: 'white', border: '1px solid #1C1C1B', borderRadius: '8px', padding: '14px', fontSize: '14px', fontWeight: 700 }}>Gérer mon IBAN →</button>
    </div>
  );
};

const RevenueRow = ({ icon, label, count, amount }: { icon: string, label: string, count: string, amount: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #F0F0EF' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span style={{ fontSize: '18px' }}>{icon}</span>
      <div>
        <div style={{ fontSize: '13px', fontWeight: 700 }}>{label}</div>
        <div style={{ fontSize: '10px', fontStyle: 'italic', opacity: 0.5 }}>{count}</div>
      </div>
    </div>
    <div style={{ fontSize: '14px', fontWeight: 800, color: '#C25E72' }}>{amount}</div>
  </div>
);

const ProfileTab = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', backgroundColor: '#F0F0EF', padding: '4px', borderRadius: '12px', marginBottom: '24px' }}>
        <button style={{ flex: 1, backgroundColor: 'white', border: 'none', padding: '10px', borderRadius: '8px', fontSize: '11px', fontWeight: 800 }}>MON PROFIL</button>
        <button style={{ flex: 1, background: 'none', border: 'none', padding: '10px', fontSize: '11px', fontWeight: 800, opacity: 0.4 }}>VUE CLIENT</button>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E9E9E7', padding: '20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
           <h3 style={{ fontSize: '14px', fontWeight: 700 }}>Profil complété à 78%</h3>
        </div>
        <div style={{ width: '100%', height: '4px', backgroundColor: '#E9E9E7', borderRadius: '99px', overflow: 'hidden', marginBottom: '16px' }}>
          <div style={{ width: '78%', height: '100%', backgroundColor: '#C25E72' }}></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
           <div style={{ fontSize: '12px', fontWeight: 600, color: '#C25E72', marginBottom: '4px' }}>+ 3 photos de votre domicile • +8% de résas</div>
           <div style={{ fontSize: '12px', fontWeight: 600, color: '#C25E72' }}>+ Certification ACACED • +12% de résas</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <ProfileSection title="📸 Photos" />
        <ProfileSection title="✍️ Présentation" />
        <ProfileSection title="🛎 Services & tarifs" />
        <ProfileSection title="🏡 Votre domicile" />
        <ProfileSection title="✅ Vérifications Neko" />
      </div>

      <div style={{ backgroundColor: '#F7ECF0', borderRadius: '16px', padding: '20px', margin: '24px 0', display: 'flex', justifyContent: 'space-between' }}>
        <StatItem label="Chats gardés" value="🐱 43" />
        <StatItem label="Note" value="⭐ 4.9" />
        <StatItem label="Fidélité" value="🔁 78%" />
      </div>

      <button onClick={onLogout} style={{ width: '100%', backgroundColor: 'transparent', border: '1px solid #FF4D4D', color: '#FF4D4D', borderRadius: '8px', padding: '14px', fontSize: '14px', fontWeight: 700 }}>Se déconnecter</button>
    </div>
  );
};

const ProfileSection = ({ title }: { title: string }) => (
  <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E9E9E7', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
    <span style={{ fontSize: '14px', fontWeight: 700 }}>{title}</span>
    <button style={{ background: 'none', border: 'none', color: '#C25E72', fontSize: '12px', fontWeight: 700 }}>Modifier</button>
  </div>
);

const StatItem = ({ label, value }: { label: string, value: string }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '2px' }}>{value}</div>
    <div style={{ fontSize: '9px', fontWeight: 700, opacity: 0.5, textTransform: 'uppercase' }}>{label}</div>
  </div>
);

export default SitterDashboard;
