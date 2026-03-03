
import React, { useState, useEffect, useRef } from 'react';
import Carousel from './components/Carousel';
import HowItWorks from './components/HowItWorks';
import SitterList from './components/SitterList';
import PricingSection from './components/PricingSection';
import OwnerTestimonials from './components/OwnerTestimonials';
import FAQSection from './components/FAQSection';
import SmartCTA from './components/SmartCTA';
import TrustBar from './components/TrustBar';
import SitterRegistration from './components/SitterRegistration';
import BookingDropdown from './components/BookingDropdown';
import OwnerDashboard from './components/OwnerDashboard';
import SitterDashboard from './components/SitterDashboard';
import RoleSelection from './components/RoleSelection';
import SitterProfile from './components/NewSitterProfile';
import ListingDetail from './components/ListingDetail';
import MessagesScreen from './components/MessagesScreen';
import PetSitterListing from './components/PetSitterListing';
import AuthModal from './components/AuthModal';
import { Search, PlusCircle, User } from 'lucide-react';
import { PricingTabType } from './types';
import { MOCK_LISTINGS, MOCK_SITTERS } from './constants';

const SnoutLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#1C1C1B"/>
    <g transform="translate(10, 10) scale(0.8)">
      <path d="M32 25C32 22 34 20 37 20H63C66 20 68 22 68 25L62 42C61 45 58 48 50 48C42 48 39 45 38 42L32 25Z" fill="white"/>
      <path d="M50 45C50 62 40 75 22 75C8 75 4 62 14 55C18 52 28 52 38 60" stroke="white" strokeWidth="14" strokeLinecap="round" fill="none"/>
      <path d="M50 45C50 62 60 75 78 75C92 75 96 62 86 55C82 52 72 52 62 60" stroke="white" strokeWidth="14" strokeLinecap="round" fill="none"/>
    </g>
  </svg>
);

const MagnifyingEyeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
    <circle cx="45" cy="45" r="25" stroke="#1C1C1B" strokeWidth="1.5" strokeDasharray="4 2" />
    <circle cx="45" cy="45" r="10" stroke="#C25E72" strokeWidth="1.5" strokeOpacity="0.4" />
    <path d="M62 62L85 85" stroke="#1C1C1B" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export type ViewState = 'home' | 'register-sitter' | 'lead_capture' | 'owner_dashboard' | 'sitter_dashboard' | 'messages' | 'role_selection' | 'sitter_profile' | 'sitter_listing' | 'pricing' | 'selection_process' | 'sitter_charter' | 'owner_charter' | 'listing_detail';

const Header: React.FC<{ onAction: (intent: 'login' | 'join') => void, onViewChange: (v: ViewState) => void }> = ({ onAction, onViewChange }) => {
  return (
    <header className="hidden md:flex sticky top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-warm-border z-50 px-6 lg:px-12 py-5 items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onViewChange('home')}>
        <SnoutLogo className="w-8 h-8 transition-transform group-hover:scale-110" />
        <span className="text-[22px] font-bold tracking-tight text-warm-text">Neko</span>
      </div>
      
      <nav className="hidden md:flex items-center gap-10">
        <button 
          onClick={() => onViewChange('sitter_listing')}
          className="text-[14px] font-semibold text-warm-text/70 hover:text-warm-text transition-colors"
        >
          Explorer
        </button>
        <a href="#" className="text-[14px] font-semibold text-warm-text/70 hover:text-warm-text transition-colors">Communautés</a>
        <a href="#" className="text-[14px] font-semibold text-warm-text/70 hover:text-warm-text transition-colors">Sécurité</a>
        <button 
          onClick={() => onViewChange('register-sitter')}
          className="text-[14px] font-semibold text-warm-text/70 hover:text-warm-text transition-colors"
        >
          Devenir Hôte
        </button>
      </nav>

      <div className="flex items-center gap-6">
        <button 
          onClick={() => onAction('login')}
          className="text-[14px] font-semibold text-warm-text/70 hover:text-warm-text transition-colors"
        >
          Connexion
        </button>
        <button 
          onClick={() => onAction('join')}
          className="btn-primary"
        >
          Rejoindre
        </button>
      </div>
    </header>
  );
};

const MobileBottomNav: React.FC<{ onViewChange: (view: ViewState) => void, currentView: ViewState, onAction: (intent: 'login' | 'join') => void }> = ({ onViewChange, currentView, onAction }) => {
  const isActive = (view: ViewState) => currentView === view;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] pointer-events-auto">
      <nav className="w-full h-[72px] bg-white/95 backdrop-blur-xl border-t border-warm-border flex items-center justify-around px-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] pb-safe">
        
        <button 
          onClick={() => onViewChange('sitter_listing')}
          className={`relative flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 active:scale-90 ${isActive('sitter_listing') ? 'text-neko-rose' : 'text-warm-text/40'}`}
        >
          <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive('sitter_listing') ? 'bg-neko-rose/10' : ''}`}>
            <Search className={`w-6 h-6 ${isActive('sitter_listing') ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
          </div>
          <span className={`text-[10px] font-bold tracking-tight mt-1 ${isActive('sitter_listing') ? 'text-neko-rose' : 'text-warm-text/60'}`}>Explorer</span>
        </button>

        <button 
          onClick={() => onViewChange('lead_capture')}
          className={`relative flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 active:scale-90 ${isActive('lead_capture') ? 'text-neko-rose' : 'text-warm-text/40'}`}
        >
          <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive('lead_capture') ? 'bg-neko-rose/10' : ''}`}>
            <PlusCircle className={`w-6 h-6 ${isActive('lead_capture') ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
          </div>
          <span className={`text-[10px] font-bold tracking-tight mt-1 ${isActive('lead_capture') ? 'text-neko-rose' : 'text-warm-text/60'}`}>Publier</span>
        </button>

        <button 
          onClick={() => onAction('login')}
          className={`relative flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 active:scale-90 ${isActive('role_selection') || isActive('owner_dashboard') || isActive('sitter_dashboard') ? 'text-neko-rose' : 'text-warm-text/40'}`}
        >
          <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive('role_selection') || isActive('owner_dashboard') || isActive('sitter_dashboard') ? 'bg-neko-rose/10' : ''}`}>
            <User className={`w-6 h-6 ${isActive('role_selection') || isActive('owner_dashboard') || isActive('sitter_dashboard') ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
          </div>
          <span className={`text-[10px] font-bold tracking-tight mt-1 ${isActive('role_selection') || isActive('owner_dashboard') || isActive('sitter_dashboard') ? 'text-neko-rose' : 'text-warm-text/60'}`}>Connexion</span>
        </button>

      </nav>
    </div>
  );
};

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('home');
  const [activePricingTab, setActivePricingTab] = useState<PricingTabType>('boarding');
  const [authIntent, setAuthIntent] = useState<'login' | 'join'>('join');
  const [selectedRole, setSelectedRole] = useState<'owner' | 'sitter' | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedSitterId, setSelectedSitterId] = useState<string | null>(null);
  const [selectedSitterForMessage, setSelectedSitterForMessage] = useState<any | null>(null);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  
  const heroSearchRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for sticky search bar
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '-120px 0px 0px 0px' }
    );

    if (heroSearchRef.current) {
      observer.observe(heroSearchRef.current);
    }

    return () => {
      if (heroSearchRef.current) {
        observer.unobserve(heroSearchRef.current);
      }
    };
  }, [viewState]);

  // Correction cruciale : Défilement instantané vers le haut lors du changement de vue
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [viewState]);

  const handleActionClick = (intent: 'login' | 'join') => {
    setAuthIntent(intent);
    setViewState('role_selection');
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    if (authIntent === 'login' && selectedRole) {
      if (selectedRole === 'sitter') setViewState('sitter_dashboard');
      else setViewState('owner_dashboard');
    } else {
      setViewState('role_selection');
    }
  };

  const handleRoleChosen = (role: 'owner' | 'sitter') => {
    if (authIntent === 'login') {
      setSelectedRole(role);
      if (role === 'sitter') setViewState('sitter_dashboard');
      else setViewState('owner_dashboard');
    } else {
      if (role === 'sitter') {
        setViewState('register-sitter');
      } else {
        setViewState('lead_capture');
      }
    }
  };

  const handleServiceClick = (tab: PricingTabType) => {
    setActivePricingTab(tab);
    const pricingEl = document.getElementById('pricing');
    if (pricingEl) pricingEl.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSitterClick = (id: string) => {
    setSelectedSitterId(id);
    setViewState('sitter_profile');
  };

  const handleListingClick = (id: string) => {
    setSelectedListingId(id);
    setViewState('listing_detail');
  };

  const renderMainContent = () => {
    if (viewState === 'role_selection') {
      return <RoleSelection onSelect={handleRoleChosen} onBack={() => setViewState('home')} intent={authIntent} />;
    }

    if (viewState === 'register-sitter') {
      return <SitterRegistration onBack={() => setViewState('home')} />;
    }

    if (viewState === 'sitter_profile') {
      const sitter = MOCK_SITTERS.find(s => s.id === selectedSitterId);
      return (
        <SitterProfile 
          sitterId={selectedSitterId}
          onBack={() => setViewState('home')} 
          onContact={() => {
            setSelectedSitterForMessage(sitter);
            setViewState('messages');
          }}
        />
      );
    }

    if (viewState === 'listing_detail') {
      return (
        <ListingDetail 
          listingId={selectedListingId}
          onBack={() => setViewState('home')} 
        />
      );
    }

    if (viewState === 'owner_dashboard') {
      return <OwnerDashboard onLogout={() => setViewState('home')} onMessagesClick={() => setViewState('messages')} />;
    }

    if (viewState === 'messages') {
      return <MessagesScreen onBack={() => setViewState('owner_dashboard')} newConversationSitter={selectedSitterForMessage} />;
    }

    if (viewState === 'sitter_dashboard') {
      return <SitterDashboard onLogout={() => setViewState('home')} />;
    }

    if (viewState === 'sitter_listing') {
      return (
        <PetSitterListing 
          onBack={() => setViewState('home')} 
          onSitterClick={handleSitterClick}
        />
      );
    }

    if (viewState === 'pricing') {
      return (
        <div className="pt-12 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
          <button onClick={() => setViewState('home')} className="mb-8 text-warm-text/40 hover:text-warm-text font-bold flex items-center gap-2">
            ← Retour
          </button>
          <PricingSection activeTab={activePricingTab} setActiveTab={setActivePricingTab} />
        </div>
      );
    }

    if (viewState === 'selection_process') {
      return (
        <div className="pt-20 pb-32 px-6 md:px-12 max-w-4xl mx-auto">
          <button onClick={() => setViewState('home')} className="mb-12 text-warm-text/40 hover:text-warm-text font-bold flex items-center gap-2">
            ← Retour
          </button>
          <h1 className="text-[40px] md:text-[56px] font-bold text-warm-text leading-tight tracking-tight mb-8">
            Comment sont sélectionnés nos pet sitters ?
          </h1>
          <div className="space-y-12">
            <section className="space-y-4">
              <h2 className="text-[24px] font-bold text-warm-text">1. Vérification d'identité</h2>
              <p className="text-[18px] text-warm-text/60 leading-relaxed">
                Chaque sitter doit fournir une pièce d'identité officielle en cours de validité. Nous vérifions manuellement chaque document pour garantir l'authenticité des profils.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-[24px] font-bold text-warm-text">2. Entretien et Questionnaire</h2>
              <p className="text-[18px] text-warm-text/60 leading-relaxed">
                Les candidats répondent à un questionnaire détaillé sur leur expérience avec les chats, leurs connaissances en comportement félin et leur capacité à gérer des situations d'urgence.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-[24px] font-bold text-warm-text">3. Validation de l'environnement</h2>
              <p className="text-[18px] text-warm-text/60 leading-relaxed">
                Pour les gardes en famille d'accueil, nous demandons des photos de l'environnement pour nous assurer qu'il est sécurisé et adapté à l'accueil d'un chat.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-[24px] font-bold text-warm-text">4. Système de recommandation</h2>
              <p className="text-[18px] text-warm-text/60 leading-relaxed">
                La communauté Neko repose sur la confiance. Les sitters sont évalués après chaque prestation. Un score de confiance élevé est nécessaire pour rester actif sur la plateforme.
              </p>
            </section>
          </div>
        </div>
      );
    }

    if (viewState === 'sitter_charter') {
      return (
        <div className="pt-20 pb-32 px-6 md:px-12 max-w-4xl mx-auto">
          <button onClick={() => setViewState('home')} className="mb-12 text-warm-text/40 hover:text-warm-text font-bold flex items-center gap-2">
            ← Retour
          </button>
          <h1 className="text-[40px] md:text-[56px] font-bold text-warm-text leading-tight tracking-tight mb-8">
            Charte du Pet Sitter Neko
          </h1>
          <div className="space-y-12">
            <section className="space-y-4">
              <h2 className="text-[24px] font-bold text-warm-text">Bien-être animal avant tout</h2>
              <p className="text-[18px] text-warm-text/60 leading-relaxed">
                Le sitter s'engage à traiter chaque chat avec patience, douceur et respect. Il doit veiller à son alimentation, son hygiène et son besoin d'affection.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-[24px] font-bold text-warm-text">Fiabilité et Ponctualité</h2>
              <p className="text-[18px] text-warm-text/60 leading-relaxed">
                Le sitter respecte scrupuleusement les horaires convenus et les consignes spécifiques données par le propriétaire.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-[24px] font-bold text-warm-text">Communication transparente</h2>
              <p className="text-[18px] text-warm-text/60 leading-relaxed">
                Le sitter envoie régulièrement des nouvelles (photos/vidéos) et informe immédiatement le propriétaire en cas de comportement inhabituel ou d'urgence.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-[24px] font-bold text-warm-text">Respect de la vie privée</h2>
              <p className="text-[18px] text-warm-text/60 leading-relaxed">
                Lors de visites à domicile, le sitter respecte l'intimité du propriétaire et ne s'autorise aucun usage non prévu des lieux.
              </p>
            </section>
          </div>
        </div>
      );
    }

    if (viewState === 'owner_charter') {
      return (
        <div className="pt-20 pb-32 px-6 md:px-12 max-w-4xl mx-auto">
          <button onClick={() => setViewState('home')} className="mb-12 text-warm-text/40 hover:text-warm-text font-bold flex items-center gap-2">
            ← Retour
          </button>
          <h1 className="text-[40px] md:text-[56px] font-bold text-warm-text leading-tight tracking-tight mb-8">
            Charte du Propriétaire Neko
          </h1>
          <div className="space-y-12">
            <section className="space-y-4">
              <h2 className="text-[24px] font-bold text-warm-text">Transparence totale</h2>
              <p className="text-[18px] text-warm-text/60 leading-relaxed">
                Le propriétaire fournit toutes les informations nécessaires sur la santé, le caractère et les habitudes de son chat pour garantir une garde sereine.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-[24px] font-bold text-warm-text">Environnement et Matériel</h2>
              <p className="text-[18px] text-warm-text/60 leading-relaxed">
                Le propriétaire s'assure que le sitter dispose de tout le nécessaire (nourriture, litière, carnet de santé, coordonnées vétérinaires).
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-[24px] font-bold text-warm-text">Respect du Sitter</h2>
              <p className="text-[18px] text-warm-text/60 leading-relaxed">
                Le propriétaire respecte le travail du sitter, ses horaires et s'engage à une communication courtoise et réactive.
              </p>
            </section>
            <section className="space-y-4">
              <h2 className="text-[24px] font-bold text-warm-text">Engagement financier</h2>
              <p className="text-[18px] text-warm-text/60 leading-relaxed">
                Le propriétaire s'engage à régler la prestation via la plateforme selon les modalités convenues lors de la réservation.
              </p>
            </section>
          </div>
        </div>
      );
    }

    return (
      <>
        <section className="w-full px-4 md:px-[40px] lg:px-[80px] pt-4 md:pt-12 mx-auto max-w-[2520px]" ref={heroSearchRef}>
          <div className="relative w-full overflow-hidden rounded-[48px] shadow-2xl border border-warm-border">
            {/* Zone 1 – Hero photo */}
            <div className="relative w-full h-[400px] md:h-[600px]">
              <img 
                src="https://images.unsplash.com/photo-1548247416-ec66f4900b2e?q=80&w=1600&auto=format&fit=crop" 
                className="w-full h-full object-cover object-[center_40%]"
                alt="Cat"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-text/80 via-warm-text/20 to-transparent"></div>
              
              <div className="absolute bottom-8 left-6 right-6 md:bottom-12 md:left-12 md:right-12 z-10 flex flex-col gap-4 md:gap-8">
                <h1 className="!text-white leading-[1.1] tracking-tight">
                  <span className="block text-[32px] md:text-[64px] font-extrabold">Partez serein, il est</span>
                  <span className="block text-[32px] md:text-[64px] font-extrabold">entre de bonnes mains</span>
                </h1>

                <div className="max-w-[520px]">
                  <SmartCTA onTrigger={() => setViewState('lead_capture')} onSearchStateChange={setIsSearchActive} />
                </div>
                
                <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-fit">
                  {[
                    { id: 'boarding', label: 'Garde chez le pet sitter' },
                    { id: 'visit', label: 'Visites' },
                    { id: 'housesitting', label: 'Home Sitting' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleServiceClick(tab.id as PricingTabType)}
                      className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-[12px] font-bold transition-all whitespace-nowrap border backdrop-blur-md ${
                        activePricingTab === tab.id 
                          ? 'bg-white/30 border-white text-white shadow-md' 
                          : 'bg-black/10 border-white/20 text-white/80 hover:text-white hover:bg-white/20'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mt-4 md:mt-10 mb-6">
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white border border-warm-border shadow-lg animate-float">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="relative">
                    <img
                      src={`https://picsum.photos/seed/cat-avatar-${i}/64/64`}
                      alt="Cat"
                      className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-white object-cover shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    {i === 1 && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-neko-rose border-2 border-white rounded-full animate-pulse"></span>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] md:text-[14px] font-semibold text-warm-text leading-tight">
                  24 chats gardés aujourd'hui
                </span>
                <span className="text-[10px] md:text-[12px] font-medium text-warm-text/50">
                  à Paris et en Ile de France
                </span>
              </div>
            </div>
          </div>
        </section>

        <main className="w-full px-4 md:px-[40px] lg:px-[80px] pb-12 mx-auto max-w-[2520px]">
          <div className="space-y-32">
            <section id="listings" className="space-y-8 animate-section">
              <div className="flex items-center justify-between">
                <h2 className="text-[24px] md:text-[32px] font-bold text-warm-text leading-tight tracking-tight">Demandes en cours</h2>
              </div>
              <Carousel onListingClick={handleListingClick} />
            </section>
            
            <div className="bg-warm-paper rounded-[48px] py-24 px-4 md:px-12">
              <HowItWorks />
            </div>

            <section className="space-y-12">
              <div className="space-y-8">
                <h2 className="text-[24px] md:text-[32px] font-bold text-warm-text leading-tight tracking-tight">Nos sitters à proximité</h2>
                <SitterList onSitterClick={handleSitterClick} />
              </div>
              
              <div className="flex flex-col items-center gap-6 pt-4">
                <button 
                  onClick={() => setViewState('sitter_listing')}
                  className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-neko-rose rounded-[24px] hover:bg-neko-rose/90 shadow-2xl hover:shadow-neko-rose/20 hover:-translate-y-1 active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3 text-[16px] md:text-[18px]">
                    Trouver mon sitter idéal
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
                <p className="text-[14px] font-medium text-warm-text/40 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neko-rose animate-pulse"></span>
                  +120 sitters disponibles cette semaine
                </p>
              </div>
            </section>

            <section className="bg-white border border-warm-border rounded-[48px] p-8 md:p-12 shadow-2xl">
              <TrustBar />
            </section>

            <PricingSection activeTab={activePricingTab} setActiveTab={setActivePricingTab} />
            <OwnerTestimonials />
            <FAQSection />
          </div>
        </main>
      </>
    );
  };

  return (
    <div className={`min-h-screen bg-warm-bg w-full overflow-x-hidden selection:bg-neko-primary/20 ${(viewState === 'lead_capture' || viewState === 'role_selection' || isSearchActive || isAuthModalOpen) ? 'overflow-hidden h-screen' : ''}`}>
      {/* Sticky Search Bar */}
      <div className={`fixed top-0 left-0 right-0 z-[60] bg-white/40 backdrop-blur-md border-b border-warm-border/10 transform transition-all duration-500 ease-in-out px-4 py-3 md:px-[40px] lg:px-[80px] ${isSticky && viewState === 'home' && !isSearchActive ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="max-w-[2520px] mx-auto flex items-center gap-6">
          <div className="hidden md:block cursor-pointer hover:scale-110 transition-transform" onClick={() => setViewState('home')}>
            <SnoutLogo className="w-9 h-9" />
          </div>
          <div className="flex-1 max-w-2xl">
            <SmartCTA onTrigger={() => setViewState('lead_capture')} onSearchStateChange={setIsSearchActive} variant="transparent" />
          </div>
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => handleActionClick('login')} className="text-[14px] font-medium text-warm-text/70 hover:text-neko-primary transition-colors">Connexion</button>
            <button onClick={() => handleActionClick('join')} className="btn-primary">Rejoindre</button>
          </div>
        </div>
      </div>

      {viewState !== 'owner_dashboard' && viewState !== 'sitter_dashboard' && viewState !== 'messages' && viewState !== 'role_selection' && viewState !== 'sitter_listing' && viewState !== 'lead_capture' && !isSearchActive && (
        <Header onAction={handleActionClick} onViewChange={setViewState} />
      )}
      
      {renderMainContent()}

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        intent={authIntent}
        setIntent={setAuthIntent}
        onSuccess={handleAuthSuccess}
      />

      {viewState !== 'lead_capture' && viewState !== 'role_selection' && viewState !== 'owner_dashboard' && viewState !== 'sitter_dashboard' && viewState !== 'messages' && viewState !== 'sitter_listing' && !isSearchActive && (
        <MobileBottomNav onViewChange={setViewState} currentView={viewState} onAction={handleActionClick} />
      )}

      {viewState === 'lead_capture' && (
        <BookingDropdown onClose={() => setViewState('home')} onDatesSelected={() => {}} />
      )}

      {viewState !== 'owner_dashboard' && viewState !== 'sitter_dashboard' && viewState !== 'messages' && viewState !== 'role_selection' && viewState !== 'sitter_listing' && !isSearchActive && (
        <footer className="bg-warm-text border-t border-neko-primary/10 pt-20 pb-12 w-full px-4 md:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12">
            <div className="col-span-1 md:col-span-2 space-y-8">
              <div className="flex items-center gap-3">
                <SnoutLogo className="w-12 h-12" />
                <span className="text-[24px] font-bold tracking-tight text-white">Neko Community</span>
              </div>
              <p className="text-[16px] text-white/60 max-w-[360px] leading-relaxed font-light">
                Le réseau parisien le plus fiable pour les propriétaires et sitters de chats. Rejoignez des milliers de voisins vérifiés.
              </p>
            </div>
            <div className="col-span-1 md:col-span-2 space-y-8">
              <div className="space-y-6">
                <h4 className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.2em]">Plateforme</h4>
                <div className="space-y-6">
                  <button className="w-fit px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-[13px] rounded-xl transition-all">
                    Une question ? Contactez nous
                  </button>
                  <ul className="text-[14px] space-y-4 text-white/80 font-medium">
                    <li><button onClick={() => setViewState('sitter_listing')} className="hover:text-neko-primary transition-colors text-left">Explorer les sitters</button></li>
                    <li><button onClick={() => setViewState('register-sitter')} className="hover:text-neko-primary transition-colors text-left">Devenir Sitter</button></li>
                    <li><button onClick={() => setViewState('pricing')} className="hover:text-neko-primary transition-colors text-left">Tarifs</button></li>
                    <li><button onClick={() => setViewState('selection_process')} className="hover:text-neko-primary transition-colors text-left">Comment sont sélectionnés nos pet sitters</button></li>
                    <li><button onClick={() => setViewState('sitter_charter')} className="hover:text-neko-primary transition-colors text-left">Charte du Pet Sitter</button></li>
                    <li><button onClick={() => setViewState('owner_charter')} className="hover:text-neko-primary transition-colors text-left">Charte du Propriétaire</button></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[11px] text-white/30 font-medium uppercase tracking-widest">
              © 2026 Nekoapp.fr — Fait avec <span className="text-neko-primary">🐈</span> à Paris
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
