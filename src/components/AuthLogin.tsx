import React, { useState } from 'react'
import { signIn } from '../services/authService'

export default function AuthLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await signIn(email, password)
      window.location.hash = '#/services'
    } catch (err: any) {
      // Traduire les erreurs réseau en français
      if (err?.message?.includes('Failed to fetch') || err?.message?.includes('fetch')) {
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
    </section>
  )
}
