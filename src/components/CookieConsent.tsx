import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function CookieConsent() {
  const [showCookie, setShowCookie] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    const cookieConsent = localStorage.getItem('mamsitter_cookie_consent');
    const lastDecisionTime = localStorage.getItem('mamsitter_cookie_time');

    if (!cookieConsent) {
      // Première visite
      setShowCookie(true);
    } else {
      // Vérifier si le délai est écoulé
      if (lastDecisionTime) {
        const lastTime = parseInt(lastDecisionTime);
        const now = Date.now();

        if (cookieConsent === 'refused') {
          // Refusé : réafficher après 3 heures
          const threeHours = 3 * 60 * 60 * 1000;
          if (now - lastTime > threeHours) {
            setShowCookie(true);
          }
        } else if (cookieConsent === 'accepted') {
          // Accepté : réafficher après 1 mois
          const oneMonth = 30 * 24 * 60 * 60 * 1000;
          if (now - lastTime > oneMonth) {
            setShowCookie(true);
          }
        }
      }
    }
  }, []);

  function handleAccept() {
    localStorage.setItem('mamsitter_cookie_consent', 'accepted');
    localStorage.setItem('mamsitter_cookie_time', Date.now().toString());
    setShowCookie(false);
  }

  function handleRefuse() {
    localStorage.setItem('mamsitter_cookie_consent', 'refused');
    localStorage.setItem('mamsitter_cookie_time', Date.now().toString());
    setShowCookie(false);
  }

  if (!showCookie) return null;

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-vert text-beige rounded-2xl shadow-2xl z-40 p-6 animate-slide-up">
      <button
        onClick={() => setShowCookie(false)}
        className="absolute top-4 right-4 text-beige hover:text-sable transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <p className="text-sm leading-relaxed font-poppins pr-6">
        Chez MamSitter, on aime que tout soit doux et réconfortant… même nos cookies ! Ils ne se mangent pas, mais ils nous aident à améliorer votre expérience et à rendre votre visite plus agréable. En continuant votre navigation, vous acceptez ces petits cookies bienveillants.
      </p>

      <div className="flex gap-3 mt-5">
        <button
          onClick={handleRefuse}
          className="flex-1 px-3 py-2 bg-white text-vert rounded-lg hover:bg-beige transition-colors font-lato font-bold text-xs uppercase tracking-wide"
        >
          Refuser
        </button>
        <button
          onClick={handleAccept}
          className="flex-1 px-3 py-2 bg-sable text-white rounded-lg hover:bg-sable/90 transition-colors font-lato font-bold text-xs uppercase tracking-wide"
        >
          Accepter
        </button>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

