import { useState, useEffect } from 'react';
import { resetPassword } from '../services/authService';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = getPasswordStrength(password);
  const strengthLabels = ['', 'Très faible', 'Faible', 'Moyen', 'Robuste', 'Excellent'];
  const strengthColors = ['', 'bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-500'];

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    const tokenFromUrl = params.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setMessage({ type: 'error', text: 'Lien invalide. Aucun jeton de réinitialisation trouvé.' });
    }
  }, []);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 6000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return showMessage('error', 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.');
    }

    if (!token) {
      return showMessage('error', 'Jeton de réinitialisation manquant.');
    }
    setLoading(true);
    try {
      const data = await resetPassword(token, password);
      setMessage({ type: 'success', text: data.message + ' Redirection vers la connexion...' });
      setTimeout(() => { window.location.hash = '#/login'; }, 3000);
    } catch (err: any) {
      showMessage('error', err.message || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-beige flex items-center justify-center px-4 pt-28 pb-12">
      <div className="w-full max-w-lg my-8">
        <div className="text-center mb-8">
          <img src="/images/logo-couleurs.svg" alt="MamSitter" className="h-16 w-auto mx-auto mb-4" />
          <h2 className="font-poppins text-3xl font-bold text-gray-800 mb-2">
            Réinitialiser le mot de passe
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-10">
          {token ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="password" className="block text-gray-700 font-poppins font-semibold text-sm mb-2">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-sable focus:ring-2 focus:ring-sable/20 transition font-lato text-base"
                  placeholder="••••••••"
                />
                {password && (
                  <div className="mt-2 space-y-2">
                    <div className="flex gap-1 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                      {[1, 2, 3, 4, 5].map((step) => (
                        <div
                          key={step}
                          className={`h-full flex-1 transition-all duration-500 ${step <= strength ? strengthColors[strength] : 'bg-transparent'
                            }`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider font-lato">
                      <span className={strength <= 2 ? 'text-red-500' : strength <= 4 ? 'text-orange-500' : 'text-green-600'}>
                        Force : {strengthLabels[strength]}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              {message && (
                <div className={`p-3 rounded-lg text-center font-semibold text-sm ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {message.text}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-sable text-white font-poppins font-semibold py-4 rounded-lg text-base uppercase tracking-wide hover:bg-sable/90 transition disabled:opacity-50"
              >
                {loading ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
              </button>
            </form>
          ) : (
            <div className="p-3 rounded-lg text-center font-semibold bg-red-100 text-red-800">
              {message?.text || 'Lien de réinitialisation invalide ou manquant.'}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
