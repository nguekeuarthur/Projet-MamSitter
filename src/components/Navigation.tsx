import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-beige/95 backdrop-blur-sm z-50 border-b border-vert/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="#" className="flex items-center space-x-2">
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
            <button className="bg-sable text-white px-6 py-2.5 rounded-full hover:bg-sable/90 transition-colors font-lato font-bold uppercase text-sm tracking-wide">
              Connexion
            </button>
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
            <button className="w-full bg-sable text-white px-6 py-2.5 rounded-full hover:bg-sable/90 transition-colors font-lato font-bold uppercase text-sm tracking-wide">
              Connexion
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
