// Service d'authentification personnalisé utilisant notre backend Node.js
const API_URL = 'http://localhost:8000/api';

// ─── Inscription ────────────────────────────────────────────
export async function register(payload: { name: string; email: string; password: string; role?: string }) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Erreur lors de l’inscription');

  return data;
}

// ─── Connexion ──────────────────────────────────────────────
export async function login(payload: { email: string; password: string }) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Erreur lors de la connexion');

  localStorage.setItem('mamsitter_token', data.token);
  localStorage.setItem('mamsitter_user', JSON.stringify(data.user));

  // Déclencher un événement pour notifier les composants (Navigation)
  window.dispatchEvent(new Event('auth-change'));

  return data;
}

// ─── Demande de réinitialisation de mot de passe ─────────────
export async function requestPasswordReset(email: string) {
  const response = await fetch(`${API_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Erreur lors de la demande.');
  return data;
}

// ─── Réinitialisation effective du mot de passe ───────────────
export async function resetPassword(token: string, password: string) {
  const response = await fetch(`${API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Erreur lors de la réinitialisation.');
  return data;
}

// ─── Déconnexion ────────────────────────────────────────────
export async function logout() {
  localStorage.removeItem('mamsitter_token');
  localStorage.removeItem('mamsitter_user');

  // Déclencher un événement pour notifier les composants (Navigation)
  window.dispatchEvent(new Event('auth-change'));
}

// ─── Récupérer la session courante ──────────────────────────
export async function getSession() {
  const token = localStorage.getItem('mamsitter_token');
  return token ? { access_token: token } : null;
}

// Fonction pour l'inscription (alias pour AuthTestPage)
export async function signUp(email: string, password: string) {
  return register({ name: '', email, password });
}

// Fonction pour la connexion (alias pour AuthTestPage)
export async function signIn(email: string, password: string) {
  return login({ email, password });
}

// Fonction pour la déconnexion (alias pour AuthTestPage)
export async function signOut() {
  return logout();
}

// Fonction pour récupérer l'utilisateur connecté
export async function getCurrentUser() {
  const user = localStorage.getItem('mamsitter_user');
  return user ? JSON.parse(user) : null;
}
