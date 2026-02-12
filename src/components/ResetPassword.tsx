import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (password !== confirm) return setError('Les mots de passe ne correspondent pas')
    if (password.length < 6) return setError('Le mot de passe doit contenir au moins 6 caractères')
    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      setOk(true)
    } catch (err: any) {
      setError(err?.message || 'Erreur')
    } finally {
      setLoading(false)
    }
  }

  if (ok) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow text-center">
        <h2 className="text-2xl font-semibold mb-4">Mot de passe mis à jour ✅</h2>
        <p className="mb-4">Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.</p>
        <a href="#/login" className="text-blue-600 underline">Se connecter</a>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Nouveau mot de passe</h2>
      {error && <div className="text-red-600 mb-3">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nouveau mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Confirmer</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? '...' : 'Mettre à jour'}
        </button>
      </form>
    </div>
  )
}
