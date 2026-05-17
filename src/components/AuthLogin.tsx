import React, { useState } from 'react'
import { signIn } from '../services/authService'
import { UserX, ShieldAlert, X } from 'lucide-react'

export default function AuthLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showBannedModal, setShowBannedModal] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await signIn(email, password)
      window.location.hash = '#/services'
    } catch (err: any) {
      if (err?.message?.includes('considéré comme suspendu') || err?.message?.includes('suspendu') || err?.message?.includes('banni')) {
        setShowBannedModal(true)
      } else if (err?.message?.includes('Failed to fetch') || err?.message?.includes('fetch')) {
        setError('Erreur de connexion au serveur. Veuillez réessayer.')
      } else {
        setError(err?.message || 'Une erreur est survenue')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-beige flex items-center justify-center px-4 pt-28 pb-12">
      <div className="w-full max-w-lg my-8">
        <div className="text-center mb-8">
          <img src="/images/logo-couleurs.svg" alt="MamSitter" className="h-16 w-auto mx-auto mb-4" />
          <h1 className="font-poppins font-bold text-3xl text-gray-800 mb-2">Connexion</h1>
          <p className="font-lato text-gray-500">Connecte-toi à ton compte MamSitter</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-10 space-y-6">
          {error && (
            <div className="rounded-lg px-4 py-3 text-sm font-lato bg-red-50 text-red-700 border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-poppins font-semibold text-sm text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="exemple@email.com"
                className="w-full px-5 py-4 rounded-lg border border-gray-300 focus:border-sable focus:ring-2 focus:ring-sable/20 outline-none transition font-lato text-base"
              />
            </div>
            <div>
              <label className="block font-poppins font-semibold text-sm text-gray-700 mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Votre mot de passe"
                className="w-full px-5 py-4 rounded-lg border border-gray-300 focus:border-sable focus:ring-2 focus:ring-sable/20 outline-none transition font-lato text-base"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-lg bg-sable text-white font-poppins font-semibold text-base uppercase tracking-wide hover:bg-sable/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div className="text-center space-y-3 pt-2">
            <a href="#/forgot-password" className="text-sable hover:underline text-sm font-lato block">Mot de passe oublié ?</a>
            <p className="text-gray-500 text-sm font-lato">
              Pas encore de compte ? <a href="#/register" className="text-vert font-semibold hover:underline">S'inscrire</a>
            </p>
          </div>
        </div>
      </div>

      {/* Modal Compte Suspendu */}
      {showBannedModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] max-w-md w-full p-8 md:p-10 shadow-2xl border border-red-100 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <UserX className="w-10 h-10 text-red-500" />
            </div>

            <h3 className="text-2xl font-poppins font-bold text-gray-800 mb-4">
              Compte Suspendu
            </h3>

            <p className="text-gray-500 font-lato leading-relaxed mb-8">
              Ton compte a été suspendu pour non-respect des conditions d'utilisation ou de sécurité de la plateforme MamSitter.
            </p>

            <div className="w-full space-y-3">
              <div className="p-4 bg-orange-50 rounded-2xl flex items-start gap-3 text-left mb-6">
                <ShieldAlert className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <p className="text-xs text-orange-700 leading-tight">
                  Pour toute contestation ou demande d'information, contacte l'administrateur à <span className="font-bold underline">contact@mamsitter.ch</span>
                </p>
              </div>

              <button
                onClick={() => setShowBannedModal(false)}
                className="w-full py-4 bg-gray-900 text-white font-poppins font-bold rounded-2xl hover:bg-gray-800 transition-all active:scale-95"
              >
                J'ai compris
              </button>
            </div>

            <button
              onClick={() => setShowBannedModal(false)}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
