import { authHeaders } from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export interface MamaSitter {
    _id: string;
    name: string;
    email: string;
    city: string;
    postalCode: string;
    bio: string;
    hourlyRate: number;
    avatar: string;
    rib?: string;
    bankInfo?: string;
    isApproved?: boolean;
    isBanned?: boolean;
}

export async function searchMamaSitters(filters: { city?: string; postalCode?: string; lat?: number; lng?: number; radius?: number }) {
    const params = new URLSearchParams();
    if (filters.city) params.append('city', filters.city);
    if (filters.postalCode) params.append('postalCode', filters.postalCode);
    if (filters.lat) params.append('lat', filters.lat.toString());
    if (filters.lng) params.append('lng', filters.lng.toString());
    if (filters.radius) params.append('radius', filters.radius.toString());

    const response = await fetch(`${API_URL}/users/mamasitters?${params.toString()}`, {
        method: 'GET',
        headers: authHeaders(),
    });

    if (!response.ok) {
        if (response.status === 401) {
            window.dispatchEvent(new CustomEvent('auth-error-401'));
            throw new Error('Accès non autorisé. Veuillez vous connecter.');
        }
        const data = await response.json().catch(() => ({}));
        if (response.status === 403) {
            window.dispatchEvent(new CustomEvent('auth-error-403', { detail: { message: data.error } }));
        }
        throw new Error(data.error || 'Erreur lors de la recherche.');
    }

    return response.json() as Promise<MamaSitter[]>;
}

export async function getUserProfile() {
    const response = await fetch(`${API_URL}/users/me`, {
        method: 'GET',
        headers: authHeaders(),
    });

    if (!response.ok) {
        if (response.status === 401) {
            window.dispatchEvent(new CustomEvent('auth-error-401'));
        }
        if (response.status === 403) {
            const data = await response.json().catch(() => ({}));
            window.dispatchEvent(new CustomEvent('auth-error-403', { detail: { message: data.error } }));
            throw new Error(data.error || 'Erreur Profil');
        }
        throw new Error('Erreur lors de la récupération du profil');
    }
    return response.json();
}

export async function updateProfile(updates: Partial<MamaSitter>) {
    const response = await fetch(`${API_URL}/users/me`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(updates),
    });

    if (!response.ok) {
        if (response.status === 401) {
            window.dispatchEvent(new CustomEvent('auth-error-401'));
        }
        const data = await response.json().catch(() => ({}));
        if (response.status === 403) {
            window.dispatchEvent(new CustomEvent('auth-error-403', { detail: { message: data.error } }));
        }
        throw new Error(data.error || 'Erreur lors de la mise à jour du profil.');
    }

    return response.json();
}

export async function fetchPendingSitters() {
    const response = await fetch(`${API_URL}/users/pending-sitters`, {
        method: 'GET',
        headers: authHeaders(),
    });
    if (!response.ok) {
        if (response.status === 401) window.dispatchEvent(new CustomEvent('auth-error-401'));
        throw new Error('Erreur lors de la récupération des dossiers.');
    }
    return response.json();
}

export async function approveSitter(userId: string, approve: boolean) {
    const response = await fetch(`${API_URL}/users/approve-sitter`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ userId, approve }),
    });

    if (!response.ok) {
        if (response.status === 401) window.dispatchEvent(new CustomEvent('auth-error-401'));
        throw new Error('Erreur de validation.');
    }
    return response.json();
}

export async function fetchAllSitters() {
    const response = await fetch(`${API_URL}/users/all-sitters`, {
        method: 'GET',
        headers: authHeaders(),
    });

    if (!response.ok) {
        if (response.status === 401) window.dispatchEvent(new CustomEvent('auth-error-401'));
        throw new Error('Erreur lors de la récupération des MamaSitters.');
    }
    return response.json();
}

export async function banUser(userId: string, ban: boolean) {
    const response = await fetch(`${API_URL}/users/ban-user`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ userId, ban }),
    });
    if (!response.ok) {
        if (response.status === 401) window.dispatchEvent(new CustomEvent('auth-error-401'));
        throw new Error('Erreur lors de l’opération.');
    }
    return response.json();
}

export async function adminUpdateUser(userId: string, updates: any) {
    const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(updates),
    });
    if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour par l admin.');
    }
    return response.json();
}

export async function fetchUserBankDetails(userId: string) {
    const response = await fetch(`${API_URL}/users/${userId}/bank-details`, {
        method: 'GET',
        headers: authHeaders(),
    });
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération du RIB.');
    }
    return response.json();
}

export async function fetchStripeStatus() {
    const response = await fetch(`${API_URL}/users/stripe-status`, {
        method: 'GET',
        headers: authHeaders(),
    });
    return response.json();
}

export async function createStripeAccountLink() {
    const response = await fetch(`${API_URL}/users/create-stripe-account`, {
        method: 'POST',
        headers: authHeaders(),
    });
    if (!response.ok) {
        throw new Error('Erreur lors de la création du lien Stripe');
    }
    return response.json();
}

export async function simulateStripeSuccess() {
    const response = await fetch(`${API_URL}/users/simulate-stripe-success`, {
        method: 'POST',
        headers: authHeaders(),
    });
    if (!response.ok) {
        throw new Error('Erreur lors de la simulation');
    }
    return response.json();
}
