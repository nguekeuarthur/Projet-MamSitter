import { useState } from 'react';
import { requestPasswordReset } from '../services/authService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 6000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      return showMessage('error', 'Veuillez entrer votre adresse email.');
    }
    setLoading(true);
    try {
      const data = await requestPasswordReset(email);
      showMessage('success', data.message);
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
            Mot de passe oublié
          </h2>
          <p className="text-gray-500 font-lato">
            Entrez votre email pour recevoir un lien de réinitialisation.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-poppins font-semibold text-sm mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-sable focus:ring-2 focus:ring-sable/20 transition font-lato text-base"
                placeholder="votre.email@exemple.com"
              />
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
              {loading ? 'Envoi en cours...' : 'Envoyer le lien'}
            </button>
          </form>
          <div className="text-center mt-6">
            <a href="#/login" className="text-gray-500 hover:underline text-sm font-lato">Retour à la connexion</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
