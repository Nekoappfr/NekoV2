import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowRight, X, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  intent: 'login' | 'join';
  setIntent: (intent: 'login' | 'join') => void;
  onSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, intent, setIntent, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsSubmitting(true);
    // Simulate login/signup
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Backdrop with blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-warm-text/40 backdrop-blur-xl"
            onClick={onClose}
          />
          
          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            className="relative bg-white w-full max-w-[420px] rounded-[32px] p-10 md:p-12 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden border border-warm-border/20"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 p-2 rounded-full hover:bg-warm-bg transition-all active:scale-90 text-warm-text/20 hover:text-warm-text"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Tabs */}
            <div className="flex p-1 bg-warm-bg/50 rounded-xl mb-8 w-fit mx-auto border border-warm-border/20">
              <button 
                onClick={() => setIntent('login')}
                className={`px-6 py-2 rounded-lg text-[13px] font-bold transition-all ${intent === 'login' ? 'bg-white text-warm-text shadow-sm' : 'text-warm-text/30 hover:text-warm-text/50'}`}
              >
                Connexion
              </button>
              <button 
                onClick={() => setIntent('join')}
                className={`px-6 py-2 rounded-lg text-[13px] font-bold transition-all ${intent === 'join' ? 'bg-white text-warm-text shadow-sm' : 'text-warm-text/30 hover:text-warm-text/50'}`}
              >
                Inscription
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 relative">
              <div className="space-y-5">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-warm-text/40 uppercase tracking-widest ml-1">Email</label>
                  <div className="relative group">
                    <input 
                      type="email" 
                      required
                      placeholder="votre@email.fr"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-14 px-6 rounded-2xl border border-warm-border/60 outline-none text-[15px] font-medium focus:border-warm-text/20 focus:bg-warm-bg/20 transition-all bg-warm-bg/10 placeholder:text-warm-text/10"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-[12px] font-bold text-warm-text/40 uppercase tracking-widest">Mot de passe</label>
                    {intent === 'login' && (
                      <button type="button" className="text-[12px] font-bold text-neko-rose/60 hover:text-neko-rose transition-colors">
                        Oublié ?
                      </button>
                    )}
                  </div>
                  <div className="relative group">
                    <input 
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-14 px-6 pr-12 rounded-2xl border border-warm-border/60 outline-none text-[15px] font-medium focus:border-warm-text/20 focus:bg-warm-bg/20 transition-all bg-warm-bg/10 placeholder:text-warm-text/10"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-text/20 hover:text-warm-text transition-colors"
                    >
                      {showPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" y1="2" x2="22" y2="22"></line></svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting || !email || !password}
                className={`group relative w-full h-14 rounded-2xl font-bold text-[15px] transition-all active:scale-[0.98] flex items-center justify-center gap-3 overflow-hidden mt-4 ${
                  isSubmitting || !email || !password
                  ? 'bg-warm-border text-warm-text/20 cursor-not-allowed'
                  : 'bg-warm-text text-white hover:bg-black shadow-lg shadow-warm-text/10'
                }`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>{intent === 'join' ? "Créer un compte" : "Se connecter"}</span>
                )}
              </button>
            </form>

            {/* Social Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="h-[1px] flex-1 bg-warm-border/40"></div>
              <span className="text-[10px] font-bold text-warm-text/20 uppercase tracking-[0.3em]">ou</span>
              <div className="h-[1px] flex-1 bg-warm-border/40"></div>
            </div>

            {/* Google Button */}
            <button className="flex items-center justify-center gap-3 w-full h-14 bg-white border border-warm-border/60 hover:border-warm-text/20 rounded-2xl font-bold text-[14px] transition-all active:scale-[0.98] text-warm-text">
              <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>

            {/* Footer Link */}
            <div className="mt-10 text-center">
              <p className="text-[12px] text-warm-text/20 font-bold uppercase tracking-[0.3em]">
                Neko Community — Paris 2026
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
