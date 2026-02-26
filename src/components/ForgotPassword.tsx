import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function ForgotPassword() {
  const { forgotPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await forgotPassword({ email })
      setOk(true)
    } catch (err: any) {
      setError(err?.message || 'Erreur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Mot de passe oublié</h2>
      {error && <div className="text-red-600 mb-3">{error}</div>}
      {ok ? (
        <div className="text-green-600">Si l'email existe, un lien de réinitialisation a été envoyé.</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <button disabled={loading} className="bg-yellow-600 text-white px-4 py-2 rounded">{loading ? '...' : 'Envoyer le lien'}</button>
          </div>
        </form>
      )}
    </div>
  )
}
