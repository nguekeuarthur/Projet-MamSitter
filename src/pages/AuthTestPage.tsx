import { useState } from 'react';
import { signUp, signIn, signOut, getCurrentUser } from '../services/authService';

const AuthTestPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<any>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleSignUp = async () => {
    if (!email || !password) return showMessage('error', 'Veuillez remplir tous les champs.');
    setLoading(true);
    try {
      await signUp(email, password);
      showMessage('success', '✅ Inscription réussie ! Vérifiez votre email pour confirmer votre compte.');
    } catch (err: any) {
      showMessage('error', `${err.message || 'Inscription échouée.'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!email || !password) return showMessage('error', 'Veuillez remplir tous les champs.');
    setLoading(true);
    try {
      await signIn(email, password);
      showMessage('success', '✅ Connexion réussie !');
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (err: any) {
      showMessage('error', `${err.message || 'Connexion échouée.'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      setUser(null);
      showMessage('success', '✅ Déconnexion réussie.');
    } catch (err: any) {
      showMessage('error', `❌ Erreur : ${err.message || 'Déconnexion échouée.'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGetUser = async () => {
    setLoading(true);
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        showMessage('success', '✅ Utilisateur récupéré.');
      } else {
        showMessage('error', 'Aucun utilisateur connecté.');
      }
    } catch (err: any) {
      showMessage('error', `❌ Erreur : ${err.message || 'Récupération échouée.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-beige/30 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Titre */}
        <div className="text-center mb-8">
          <h1 className="font-poppins font-bold text-3xl text-gray-800 mb-2">
            Test Authentification
          </h1>
          <p className="font-lato text-gray-500">
            Testez les fonctionnalités d'inscription, connexion et déconnexion.
          </p>
        </div>

        {/* Carte formulaire */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">

          {/* Message de feedback */}
          {message && (
            <div
              className={`rounded-lg px-4 py-3 text-sm font-lato ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Champ Email */}
          <div>
            <label className="block font-poppins font-semibold text-sm text-gray-700 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemple@email.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-sable focus:ring-2 focus:ring-sable/20 outline-none transition font-lato text-sm"
            />
          </div>

          {/* Champ Mot de passe */}
          <div>
            <label className="block font-poppins font-semibold text-sm text-gray-700 mb-1.5">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre mot de passe"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-sable focus:ring-2 focus:ring-sable/20 outline-none transition font-lato text-sm"
            />
          </div>

          {/* Boutons principaux */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleSignUp}
              disabled={loading}
              className="w-full py-3 rounded-lg bg-sable text-white font-poppins font-semibold text-sm uppercase tracking-wide hover:bg-sable/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '...' : "S'inscrire"}
            </button>
            <button
              onClick={handleSignIn}
              disabled={loading}
              className="w-full py-3 rounded-lg bg-vert text-white font-poppins font-semibold text-sm uppercase tracking-wide hover:bg-vert/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '...' : 'Se connecter'}
            </button>
          </div>

          {/* Boutons secondaires */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleSignOut}
              disabled={loading}
              className="w-full py-3 rounded-lg border-2 border-gray-300 text-gray-600 font-poppins font-semibold text-sm uppercase tracking-wide hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Déconnexion
            </button>
            <button
              onClick={handleGetUser}
              disabled={loading}
              className="w-full py-3 rounded-lg border-2 border-violet text-violet font-poppins font-semibold text-sm uppercase tracking-wide hover:bg-violet/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Voir profil
            </button>
          </div>
          <div className="mt-3 text-center">
            <a href="#/forgot-password" className="text-sable hover:underline text-sm">Mot de passe oublié ?</a>
          </div>
        </div>

        {/* Affichage utilisateur connecté */}
        {user && (
          <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="font-poppins font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full inline-block"></span>
              Utilisateur connecté
            </h2>
            <pre className="bg-gray-50 rounded-lg p-4 text-xs font-mono text-gray-600 overflow-x-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
};

export default AuthTestPage;