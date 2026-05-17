import { useEffect, useState } from 'react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkCookieConsent = () => {
      const storedConsent = localStorage.getItem('cookieConsent');
      
      if (!storedConsent) {
        // Première visite, afficher le popup
        setIsVisible(true);
        return;
      }

      try {
        const consent = JSON.parse(storedConsent);
        const now = Date.now();
        const timeDiff = now - consent.timestamp;

        if (consent.action === 'accepted') {
          // Accepté - afficher à nouveau après 7 jours
          const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
          if (timeDiff > sevenDaysInMs) {
            setIsVisible(true);
          }
        } else if (consent.action === 'refused') {
          // Refusé - demander à nouveau après 24h
          const oneDayInMs = 24 * 60 * 60 * 1000;
          if (timeDiff > oneDayInMs) {
            setIsVisible(true);
          }
        }
      } catch (e) {
        console.error('Erreur lecture cookieConsent:', e);
        setIsVisible(true);
      }
    };

    checkCookieConsent();
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      action: 'accepted',
      timestamp: Date.now()
    }));
    setIsVisible(false);
  };

  const handleRefuse = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      action: 'refused',
      timestamp: Date.now()
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 bg-white rounded-lg shadow-2xl z-50 sm:max-w-sm border border-amber-200 p-6 animate-slide-up">
      <div className="space-y-4">
        <p className="text-gray-700 text-sm leading-relaxed">
          Chez MamSitter, on aime que tout soit doux et réconfortant… même nos cookies ! 
          Ils ne se mangent pas, mais ils nous aident à améliorer votre expérience et à rendre 
          votre visite plus agréable. En continuant votre navigation, vous acceptez ces petits 
          cookies bienveillants.
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleRefuse}
            className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Refuser
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            J'accepte
          </button>
        </div>
      </div>
    </div>
  );
}
