
import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Settings, Star, MapPin, CheckCircle2, Zap, ShieldCheck } from 'lucide-react';
import Map, { Marker, MapRef } from 'react-map-gl/mapbox';

interface PetSitterListingProps {
  onBack: () => void;
  onSitterClick: (id: string) => void;
}

const PARIS_CENTER = {
  latitude: 48.8566,
  longitude: 2.3522,
  zoom: 13
};

const MOCK_RESULTS = [
  {
    id: '1',
    name: 'Lucas B.',
    rating: 4.9,
    reviews: 124,
    distance: '0,4 km',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&h=200&auto=format&fit=crop',
    services: ['boarding', 'visit', 'housesitting'],
    responseTime: '1h',
    isVerified: true,
    lat: 48.8566,
    lng: 2.3522
  },
  {
    id: '2',
    name: 'Marie L.',
    rating: 5.0,
    reviews: 89,
    distance: '1,2 km',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop',
    services: ['boarding', 'visit'],
    responseTime: '2h',
    isVerified: true,
    lat: 48.8584,
    lng: 2.3488
  },
  {
    id: '3',
    name: 'Thomas D.',
    rating: 4.8,
    reviews: 56,
    distance: '2,5 km',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop',
    services: ['visit', 'housesitting'],
    responseTime: '1h',
    isVerified: true,
    lat: 48.8606,
    lng: 2.3376
  },
  {
    id: '4',
    name: 'Chloé R.',
    rating: 4.9,
    reviews: 210,
    distance: '3,1 km',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop',
    services: ['boarding', 'housesitting'],
    responseTime: '3h',
    isVerified: true,
    lat: 48.8534,
    lng: 2.3488
  }
];

const PetSitterListing: React.FC<PetSitterListingProps> = ({ onBack, onSitterClick }) => {
  const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
  const [viewState, setViewState] = useState(PARIS_CENTER);
  const mapRef = useRef<MapRef>(null);
  const [bounds, setBounds] = useState<any>(null);

  const mapboxToken = (import.meta as any).env.VITE_MAPBOX_ACCESS_TOKEN || "";

  const filteredSitters = useMemo(() => {
    if (!bounds) return MOCK_RESULTS;
    return MOCK_RESULTS.filter(sitter => {
      return (
        sitter.lng >= bounds.getWest() &&
        sitter.lng <= bounds.getEast() &&
        sitter.lat >= bounds.getSouth() &&
        sitter.lat <= bounds.getNorth()
      );
    });
  }, [bounds]);

  const handleMapMove = (evt: any) => {
    setViewState(evt.viewState);
    if (mapRef.current) {
      setBounds(mapRef.current.getBounds());
    }
  };

  const handleMapLoad = () => {
    if (mapRef.current) {
      setBounds(mapRef.current.getBounds());
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-warm-bg w-full mx-auto overflow-x-hidden shadow-2xl">
      {/* Header */}
      <header className="px-5 md:px-[40px] lg:px-[80px] py-4 flex items-center gap-4 bg-white border-b border-warm-border sticky top-0 z-50">
        <div className="max-w-[2520px] mx-auto w-full flex items-center gap-4">
          <button onClick={onBack} className="p-1 -ml-1 hover:bg-warm-bg rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-warm-text" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-[18px] font-bold text-warm-text leading-tight">Pet sitters</h1>
            <p className="text-[12px] text-warm-text/50 font-medium">Paris & Île-de-France · {today}</p>
          </div>
        </div>
      </header>

      {/* Map Section */}
      <div className="relative w-full h-[220px] bg-warm-paper overflow-hidden">
        {mapboxToken ? (
          <Map
            {...viewState}
            ref={mapRef}
            onMove={handleMapMove}
            onLoad={handleMapLoad}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/light-v11"
            mapboxAccessToken={mapboxToken}
          >
            {/* User Location (Brand Color Dot) */}
            <Marker latitude={PARIS_CENTER.latitude} longitude={PARIS_CENTER.longitude}>
              <div className="-translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-neko-rose rounded-full border-2 border-white shadow-lg relative">
                  <div className="absolute inset-0 bg-neko-rose/40 rounded-full animate-ping opacity-40"></div>
                </div>
              </div>
            </Marker>

            {/* Pins */}
            {MOCK_RESULTS.map((sitter, idx) => (
              <Marker 
                key={sitter.id} 
                latitude={sitter.lat} 
                longitude={sitter.lng}
                onClick={e => {
                  e.originalEvent.stopPropagation();
                  onSitterClick(sitter.id);
                }}
              >
                <div className="-translate-x-1/2 -translate-y-1/2 cursor-pointer">
                  <div className={`w-8 h-8 rounded-full border shadow-md transition-all flex items-center justify-center ${
                    idx === 0 
                      ? 'bg-neko-rose text-white border-neko-rose scale-110 z-10' 
                      : 'bg-white text-neko-rose border-neko-rose/30'
                  }`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>
              </Marker>
            ))}
          </Map>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-warm-bg">
            <div className="flex flex-col items-center gap-2 p-6 text-center">
              <MapPin className="w-8 h-8 text-neko-rose/20" />
              <p className="text-[11px] font-bold text-warm-text/40 uppercase tracking-widest">Configurez votre token Mapbox pour voir la carte</p>
            </div>
          </div>
        )}

        {/* Badge removed */}
      </div>

      {/* Filter Pills */}
      <div className="bg-white border-b border-warm-border">
        <div className="max-w-[2520px] mx-auto flex items-center gap-2 px-4 md:px-[40px] lg:px-[80px] py-4 overflow-x-auto no-scrollbar">
          <button className="p-2 bg-warm-paper rounded-lg flex-shrink-0">
            <Settings className="w-4 h-4 text-warm-text/60" />
          </button>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-neko-rose text-white rounded-full text-[13px] font-bold flex items-center gap-1.5 whitespace-nowrap">
              ✨ Tous
            </button>
            <button className="px-4 py-2 bg-warm-paper text-warm-text/70 rounded-full text-[13px] font-bold flex items-center gap-1.5 whitespace-nowrap">
              🛏️ Garde
            </button>
            <button className="px-4 py-2 bg-warm-paper text-warm-text/70 rounded-full text-[13px] font-bold flex items-center gap-1.5 whitespace-nowrap">
              🚶 Visites
            </button>
            <button className="px-4 py-2 bg-warm-paper text-warm-text/70 rounded-full text-[13px] font-bold flex items-center gap-1.5 whitespace-nowrap">
              🏡 Home sitting
            </button>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="max-w-[2520px] mx-auto w-full px-4 md:px-[40px] lg:px-[80px] py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-warm-text">{filteredSitters.length} sitters dans cette zone</h2>
          <span className="text-base font-light text-neutral-500">Trié par pertinence</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredSitters.map((sitter) => (
              <motion.div 
                key={sitter.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => onSitterClick(sitter.id)}
                className="group bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl border border-warm-border transition-all duration-300 cursor-pointer active:scale-[0.98] flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={sitter.image} 
                    alt={sitter.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {sitter.isVerified && (
                    <div className="absolute top-4 right-4 bg-white rounded-full p-1.5 shadow-md">
                      <ShieldCheck className="w-5 h-5 text-neko-olive fill-warm-paper" />
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-1 px-2.5 py-1.5 bg-white/80 backdrop-blur-md rounded-xl shadow-sm">
                      <Star className="w-3.5 h-3.5 text-neko-rose fill-neko-rose" />
                      <span className="text-[13px] font-bold text-warm-text">{sitter.rating}</span>
                    </div>
                    <div className="px-3 py-1.5 bg-white/80 backdrop-blur-md rounded-xl shadow-sm">
                      <span className="text-lg font-semibold text-warm-text">15€</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-warm-text group-hover:text-neko-rose transition-colors truncate">
                      {sitter.name}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-base font-light text-neutral-500 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {sitter.distance}
                    </span>
                    <span>•</span>
                    <span>{sitter.reviews} avis</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-auto">
                    {sitter.services.map(service => (
                      <span key={service} className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        service === 'boarding' ? 'bg-neko-rose/5 text-neko-rose border border-neko-rose/10' :
                        'bg-warm-paper text-warm-text/60 border border-warm-border'
                      }`}>
                        {service === 'boarding' ? 'Garde' : service === 'visit' ? 'Visite' : 'Home Sitting'}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-warm-border flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-neko-olive">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-bold uppercase tracking-widest">Vérifié</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-neko-rose">
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span className="text-[11px] font-bold uppercase tracking-widest">Réponse en {sitter.responseTime}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredSitters.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 flex flex-col items-center text-center gap-4"
            >
              <div className="w-16 h-16 bg-warm-paper rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-warm-text/20" />
              </div>
              <div>
                <p className="text-[16px] font-bold text-warm-text">Aucun sitter dans cette zone</p>
                <p className="text-[14px] text-warm-text/40">Essayez de dézoomer ou de déplacer la carte</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetSitterListing;
