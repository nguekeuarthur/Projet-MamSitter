import { useState, useEffect } from 'react';
import { Menu, X, LogOut, User, Shield, MessageCircle } from 'lucide-react';
import { signOut, getCurrentUser, logout } from '../services/authService';
import BannedModal from './BannedModal';
import LoginRequiredModal from './LoginRequiredModal';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showBannedModal, setShowBannedModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Charger l'utilisateur depuis localStorage
    const loadUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    loadUser();

    // Écouter les changements d'auth (login/logout)
    const handleAuthChange = () => loadUser();
    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    // Écouter les erreurs 403 globales (bannissement en temps réel)
    const handleGlobalError = (event: any) => {
      const msg = event?.detail?.message || '';
      if (msg.includes('suspendu') || msg.includes('banni')) {
        setShowBannedModal(true);
        logout(); // Force logout local
        setUser(null);
      }
    };

    const handleLoginError = () => {
      setShowLoginModal(true);
      logout();
      setUser(null);
    };

    window.addEventListener('auth-error-403', handleGlobalError);
    window.addEventListener('auth-error-401', handleLoginError);

    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('auth-error-403', handleGlobalError);
      window.removeEventListener('auth-error-401', handleLoginError);
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => setIsMenuOpen(false);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  async function handleLogout() {
    await signOut();
    setUser(null);
    setIsMenuOpen(false);
    window.location.hash = '/';
  }

  function handleMobileNavClick() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <nav className="fixed top-0 w-full bg-beige/95 backdrop-blur-sm z-50 border-b border-vert/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24 py-3">
            <a href="#/" className="flex items-center space-x-2 flex-shrink-0">
              <img src="/images/logo-couleurs.svg" alt="MamSitter" className="h-24 w-auto" />
            </a>

            <div className="hidden lg:flex items-center space-x-6">
              <a href="#/services" className="text-vert hover:text-sable transition-colors font-lato font-bold uppercase text-xs xl:text-sm tracking-wide whitespace-nowrap">
                Nos Services
              </a>
              {/* <a href="#/concept" className="text-vert hover:text-sable transition-colors font-lato font-bold uppercase text-xs xl:text-sm tracking-wide whitespace-nowrap">
                Concept
              </a> */}
              <a href="#/search" className="text-vert hover:text-sable transition-colors font-lato font-bold uppercase text-xs xl:text-sm tracking-wide whitespace-nowrap">
                Trouver
              </a>
              <a href="#/devenir-mamasitter" className="text-vert hover:text-sable transition-colors font-lato font-bold uppercase text-xs xl:text-sm tracking-wide whitespace-nowrap">
                Devenir MamaSitter
              </a>
              <a href="#/mamasitters" className="text-vert hover:text-sable transition-colors font-lato font-bold uppercase text-xs xl:text-sm tracking-wide whitespace-nowrap">
                Nos MamaSitters
              </a>
              <a href="#/about" className="text-vert hover:text-sable transition-colors font-lato font-bold uppercase text-xs xl:text-sm tracking-wide whitespace-nowrap">
                À Propos
              </a>
              <a href="#/blog" className="text-vert hover:text-sable transition-colors font-lato font-bold uppercase text-xs xl:text-sm tracking-wide whitespace-nowrap">
                Blog
              </a>

              {user ? (
                <>

                  {user.role === 'Admin' && (
                    <a href="#/admin" className="text-vert hover:text-sable transition-colors font-lato font-bold uppercase text-xs tracking-wide flex items-center gap-1.5 px-3 py-2">
                      <Shield className="w-4 h-4" /> Admin
                    </a>
                  )}
                  {user.role !== 'Admin' && (
                    <a href="#/messages" className="text-vert hover:text-sable transition-colors font-lato font-bold uppercase text-xs tracking-wide flex items-center gap-1.5 px-3 py-2">
                      <MessageCircle className="w-4 h-4" /> Messages
                    </a>
                  )}
                  <a href="#/profile" className="flex items-center gap-1.5 text-vert font-lato font-bold text-xs hover:text-sable transition-colors px-3 py-2">
                    <User className="w-4 h-4" />
                    {user.name}
                  </a>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 border border-sable/30 text-sable px-4 py-2 rounded-full hover:bg-sable hover:text-white hover:border-sable transition-all duration-300 font-lato font-bold uppercase text-xs tracking-wide group shadow-sm hover:shadow-md"
                  >
                    <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <a href="#/login" className="bg-sable text-white px-6 py-3 rounded-full hover:bg-sable/90 transition-colors font-lato font-bold uppercase text-xs xl:text-sm tracking-wide inline-block whitespace-nowrap">
                    Connexion
                  </a>
                  <a href="#/register" className="border border-vert text-vert px-6 py-3 rounded-full hover:bg-vert/5 transition-colors font-lato font-bold uppercase text-xs xl:text-sm tracking-wide whitespace-nowrap">
                    S'inscrire
                  </a>
                </>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-vert"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-beige border-t border-vert/10">
            <div className="px-4 py-6 space-y-5">
              <a href="#/services" onClick={handleMobileNavClick} className="block text-vert hover:text-sable transition-colors font-lato font-bold uppercase text-sm tracking-wide py-2">
                Nos Services
              </a>
              {/* <a href="#/concept" className="block text-vert hover:text-sable transition-colors font-lato font-bold uppercase text-sm tracking-wide py-2">
                Concept
              </a> */}
              <a href="#/search" onClick={handleMobileNavClick} className="block text-vert hover:text-sable transition-colors font-lato font-bold uppercase text-sm tracking-wide py-2">
                Trouver une MamaSitter
              </a>
              <a href="#/devenir-mamasitter" onClick={handleMobileNavClick} className="block text-vert hover:text-sable transition-colors font-lato font-bold uppercase text-sm tracking-wide py-2">
                Devenir MamaSitter
              </a>
              <a href="#/mamasitters" onClick={handleMobileNavClick} className="block text-vert hover:text-sable transition-colors font-lato font-bold uppercase text-sm tracking-wide py-2">
                Nos MamaSitters
              </a>
              <a href="#/about" onClick={handleMobileNavClick} className="block text-vert hover:text-sable transition-colors font-lato font-bold uppercase text-sm tracking-wide py-2">
                À Propos
              </a>
              <a href="#/blog" onClick={handleMobileNavClick} className="block text-vert hover:text-sable transition-colors font-lato font-bold uppercase text-sm tracking-wide py-2">
                Blog
              </a>

              {user ? (
                <>

                  {user.role === 'Admin' && (
                    <a href="#/admin" onClick={handleMobileNavClick} className="block text-vert hover:text-sable transition-colors font-lato font-bold uppercase text-sm tracking-wide py-2">
                      Dashboard Admin
                    </a>
                  )}
                  <a href="#/profile" onClick={handleMobileNavClick} className="flex items-center gap-1.5 text-vert font-lato font-bold text-sm mt-6 py-2 hover:text-sable transition-colors">
                    <User className="w-4 h-4" />
                    {user.name}
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-center mt-3 border border-sable/30 text-sable px-6 py-3 rounded-full hover:bg-sable hover:text-white transition-all duration-300 font-lato font-bold uppercase text-sm tracking-wide group"
                  >
                    <LogOut className="w-4 h-4 inline mr-2 transition-transform group-hover:-translate-x-0.5" />
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <a href="#/login" onClick={handleMobileNavClick} className="block w-full text-center bg-sable text-white px-6 py-3 rounded-full hover:bg-sable/90 transition-colors font-lato font-bold uppercase text-sm tracking-wide mt-4">
                    Connexion
                  </a>
                  <a href="#/register" onClick={handleMobileNavClick} className="block w-full text-center mt-3 border border-vert text-vert px-6 py-3 rounded-full hover:bg-vert/5 transition-colors font-lato font-bold uppercase text-sm tracking-wide">
                    S'inscrire
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      <BannedModal
        isOpen={showBannedModal}
        onClose={() => setShowBannedModal(false)}
      />
      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}
