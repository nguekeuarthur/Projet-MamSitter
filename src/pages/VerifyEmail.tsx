import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';

const VerifyEmail = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Vérification en cours...');

  useEffect(() => {
    // Debug: afficher l'URL complète
    console.log('🔍 URL complète:', window.location.href);
    console.log('🔍 Hash:', window.location.hash);
    
    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    const token = params.get('token');
    
    console.log('🔍 Token extrait:', token);

    if (!token) {
      setStatus('error');
      setMessage('Jeton de vérification manquant. Vérifie que tu as bien cliqué sur le lien dans ton email.');
      return;
    }

    fetch(`http://localhost:8000/api/auth/verify/${token}`)
      .then(res => res.json())
      .then(data => {
        console.log('📡 Réponse serveur:', data);
        if (data.error) {
          setStatus('error');
          setMessage(data.error);
        } else {
          setStatus('success');
          setMessage(data.message + ' Redirection vers la connexion...');
          setTimeout(() => { window.location.hash = '#/login'; }, 4000);
        }
      })
      .catch((err) => {
        console.error('❌ Erreur réseau:', err);
        setStatus('error');
        setMessage('Erreur réseau lors de la vérification.');
      });
  }, []);

  return (
    <div className="min-h-screen bg-beige flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="font-poppins font-bold text-2xl text-gray-800 mb-4">
          Vérification de l'email
        </h1>
        
        <div className={`p-4 rounded-lg font-lato ${
          status === 'loading' ? 'bg-blue-50 text-blue-700' :
          status === 'success' ? 'bg-green-50 text-green-700' :
          'bg-red-50 text-red-700'
        }`}>
          {message}
        </div>

        {status === 'success' && (
          <a href="/#/login" className="inline-block mt-6 px-8 py-3 bg-vert text-white rounded-lg font-poppins font-semibold uppercase tracking-wide hover:bg-vert/90 transition">
            Se connecter
          </a>
        )}
        
        {status === 'error' && (
          <a href="/#/register" className="inline-block mt-6 px-8 py-3 bg-sable text-white rounded-lg font-poppins font-semibold uppercase tracking-wide hover:bg-sable/90 transition">
            Retour à l'inscription
          </a>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
