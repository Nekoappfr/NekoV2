import React, { useState } from 'react';

interface RegistrationForm {
  firstName: string;
  lastName: string;
  location: string;
  services: string[];
  bio: string;
  canTakeToVet: boolean;
  acceptsMeetAndGreet: boolean;
  acceptsVerificationDocs: boolean;
}

const SitterRegistration: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [formData, setFormData] = useState<RegistrationForm>({
    firstName: '',
    lastName: '',
    location: '',
    services: [],
    bio: '',
    canTakeToVet: false,
    acceptsMeetAndGreet: true,
    acceptsVerificationDocs: false
  });

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.services.length === 0) {
      alert('Please select at least one service.');
      return;
    }
    alert('Thank you for applying! Our team will review your profile and contact you within 48h for a video call.');
    onBack();
  };

  const ToggleQuestion = ({ 
    label, 
    value, 
    onChange 
  }: { 
    label: string, 
    value: boolean, 
    onChange: (val: boolean) => void 
  }) => (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="flex items-center justify-between w-full p-4 rounded-lg bg-[#F0F0EF] hover:bg-[#E9E9E7] transition-all group"
    >
      <span className="text-[13px] font-bold text-[#1C1C1B] text-left pr-4 leading-snug">
        {label}
      </span>
      <div className={`w-10 h-6 rounded-full transition-colors relative flex-shrink-0 ${value ? 'bg-[#C25E72]' : 'bg-[#D3D3D3]'}`}>
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${value ? 'left-5' : 'left-1'}`} />
      </div>
    </button>
  );

  return (
    <div className="w-full bg-white min-h-screen py-12 md:py-24 px-6 animate-section">
      <div className="max-w-2xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="space-y-4">
          <button 
            onClick={onBack}
            className="text-[11px] font-bold text-[#37352F]/40 uppercase tracking-widest flex items-center gap-2 hover:text-[#1C1C1B] transition-colors mb-8"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Home
          </button>
          <h1 className="text-[32px] md:text-[48px] font-bold text-[#1C1C1B] tracking-tighter leading-none">
            Become a <span className="text-[#C25E72] italic font-normal">Neko Host</span>
          </h1>
          <p className="text-[15px] md:text-[18px] text-[#37352F]/60 font-medium leading-relaxed max-w-lg">
            Share your love for cats and join our community of trusted neighbors.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Section: Basics */}
          <div className="space-y-6">
            <h2 className="text-[12px] font-bold text-[#37352F]/30 uppercase tracking-[0.2em] pb-2 border-b border-[#E9E9E7]">01. The Basics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#1C1C1B]/60 uppercase ml-1">First Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Amélie"
                  className="w-full bg-[#F0F0EF] border-transparent focus:border-[#C25E72]/30 focus:bg-white focus:ring-0 rounded-lg px-4 py-3 text-[14px] font-medium transition-all outline-none"
                  value={formData.firstName}
                  onChange={e => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#1C1C1B]/60 uppercase ml-1">Last Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Poulain"
                  className="w-full bg-[#F0F0EF] border-transparent focus:border-[#C25E72]/30 focus:bg-white focus:ring-0 rounded-lg px-4 py-3 text-[14px] font-medium transition-all outline-none"
                  value={formData.lastName}
                  onChange={e => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#1C1C1B]/60 uppercase ml-1">Your Location in Paris</label>
              <input 
                type="text" 
                required
                placeholder="Ex: Le Marais, 4ème"
                className="w-full bg-[#F0F0EF] border-transparent focus:border-[#C25E72]/30 focus:bg-white focus:ring-0 rounded-lg px-4 py-3 text-[14px] font-medium transition-all outline-none"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>

          {/* Section: Services */}
          <div className="space-y-6">
            <h2 className="text-[12px] font-bold text-[#37352F]/30 uppercase tracking-[0.2em] pb-2 border-b border-[#E9E9E7]">02. Your Services</h2>
            <p className="text-[12px] text-[#37352F]/50 font-medium italic -mt-2">
              You can choose one, two, or all three services below.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { id: 'boarding', label: 'Pet Boarding', icon: '🏠' },
                { id: 'visit', label: 'Drop-in Visit', icon: '📍' },
                { id: 'sitting', label: 'House Sitting', icon: '🔑' }
              ].map(service => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => toggleService(service.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${
                    formData.services.includes(service.id)
                      ? 'bg-[#C25E72]/5 border-[#C25E72] shadow-sm'
                      : 'bg-white border-[#E9E9E7] hover:border-[#1C1C1B]/20'
                  }`}
                >
                  <span className="text-xl">{service.icon}</span>
                  <span className={`text-[11px] font-bold uppercase tracking-wide ${formData.services.includes(service.id) ? 'text-[#C25E72]' : 'text-[#37352F]'}`}>
                    {service.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Section: Profile Details */}
          <div className="space-y-6">
            <h2 className="text-[12px] font-bold text-[#37352F]/30 uppercase tracking-[0.2em] pb-2 border-b border-[#E9E9E7]">03. Safety & Engagement</h2>
            
            <div className="space-y-3">
              <ToggleQuestion 
                label="Are you available to take the cat to the vet if necessary?"
                value={formData.canTakeToVet}
                onChange={val => setFormData({...formData, canTakeToVet: val})}
              />
              <ToggleQuestion 
                label="Do you agree to an initial meet-and-greet with the owner before any first booking?"
                value={formData.acceptsMeetAndGreet}
                onChange={val => setFormData({...formData, acceptsMeetAndGreet: val})}
              />
              <ToggleQuestion 
                label="Do you agree to share identification documents and a copy of your criminal record check?"
                value={formData.acceptsVerificationDocs}
                onChange={val => setFormData({...formData, acceptsVerificationDocs: val})}
              />
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-[11px] font-bold text-[#1C1C1B]/60 uppercase ml-1">Your Story & Experience</label>
              <textarea 
                rows={4}
                required
                placeholder="Tell us about your relationship with cats, your environment, and why neighbors should trust you..."
                className="w-full bg-[#F0F0EF] border-transparent focus:border-[#C25E72]/30 focus:bg-white focus:ring-0 rounded-lg px-4 py-3 text-[14px] font-medium transition-all outline-none resize-none"
                value={formData.bio}
                onChange={e => setFormData({...formData, bio: e.target.value})}
              />
            </div>
          </div>

          {/* Footer Form */}
          <div className="pt-6">
            <button 
              type="submit"
              className="w-full btn-primary py-4 text-[14px] shadow-xl hover:scale-[1.01] active:scale-95 transition-all"
            >
              Submit my Application
            </button>
            <p className="text-[11px] text-[#37352F]/40 text-center mt-4 font-medium italic">
              Once you submit, our team will review your application and get back to you shortly to finalize your profile.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SitterRegistration;