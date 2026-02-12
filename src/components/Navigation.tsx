import { Menu, X, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { signOut, getCurrentUser } from '../services/authService';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

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
    
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  async function handleLogout() {
    await signOut();
    setUser(null);
    window.location.hash = '/';
  }

  return (
    <nav className="fixed top-0 w-full bg-beige/95 backdrop-blur-sm z-50 border-b border-vert/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="#/" className="flex items-center space-x-2">
            <img src="/images/logo-couleurs.svg" alt="MamSitter" className="h-12 w-auto" />
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-vert hover:text-sable transition-colors font-lato font-bold uppercase text-sm tracking-wide">
              Nos Services
            </a>
            <a href="#how-it-works" className="text-vert hover:text-sable transition-colors font-lato font-bold uppercase text-sm tracking-wide">
              Comment ça marche
            </a>
            <a href="#testimonials" className="text-vert hover:text-sable transition-colors font-lato font-bold uppercase text-sm tracking-wide">
              Témoignages
            </a>
            <a href="#become-sitter" className="text-vert hover:text-sable transition-colors font-lato font-bold uppercase text-sm tracking-wide">
              Devenir MamaSitter
            </a>

            {user ? (
              <>
                <span className="flex items-center gap-1.5 text-vert font-lato font-bold text-sm">
                  <User className="w-4 h-4" />
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 border border-sable/30 text-sable px-5 py-2 rounded-full hover:bg-sable hover:text-white hover:border-sable transition-all duration-300 font-lato font-bold uppercase text-sm tracking-wide group shadow-sm hover:shadow-md"
                >
                  <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <a href="#/login" className="bg-sable text-white px-6 py-2.5 rounded-full hover:bg-sable/90 transition-colors font-lato font-bold uppercase text-sm tracking-wide inline-block">
                  Connexion
                </a>
                <a href="#/register" className="ml-3 border border-vert text-vert px-4 py-2.5 rounded-full hover:bg-vert/5 transition-colors font-lato font-bold uppercase text-sm tracking-wide">
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
        <div className="md:hidden bg-beige border-t border-vert/10">
          <div className="px-4 py-6 space-y-4">
            <a href="#services" className="block text-vert hover:text-sable transition-colors font-lato font-bold uppercase text-sm tracking-wide">
              Nos Services
            </a>
            <a href="#how-it-works" className="block text-vert hover:text-sable transition-colors font-lato font-bold uppercase text-sm tracking-wide">
              Comment ça marche
            </a>
            <a href="#testimonials" className="block text-vert hover:text-sable transition-colors font-lato font-bold uppercase text-sm tracking-wide">
              Témoignages
            </a>
            <a href="#become-sitter" className="block text-vert hover:text-sable transition-colors font-lato font-bold uppercase text-sm tracking-wide">
              Devenir MamaSitter
            </a>

            {user ? (
              <>
                <span className="flex items-center gap-1.5 text-vert font-lato font-bold text-sm">
                  <User className="w-4 h-4" />
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="block w-full text-center mt-2 border border-sable/30 text-sable px-6 py-2.5 rounded-full hover:bg-sable hover:text-white transition-all duration-300 font-lato font-bold uppercase text-sm tracking-wide group"
                >
                  <LogOut className="w-4 h-4 inline mr-2 transition-transform group-hover:-translate-x-0.5" />
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <a href="#/login" className="block w-full text-center bg-sable text-white px-6 py-2.5 rounded-full hover:bg-sable/90 transition-colors font-lato font-bold uppercase text-sm tracking-wide">
                  Connexion
                </a>
                <a href="#/register" className="block w-full text-center mt-2 border border-vert text-vert px-6 py-2.5 rounded-full hover:bg-vert/5 transition-colors font-lato font-bold uppercase text-sm tracking-wide">
                  S'inscrire
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
