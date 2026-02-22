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
        if (response.status === 401) throw new Error('Accès non autorisé. Veuillez vous connecter.');
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Erreur lors de la recherche.');
    }

    return response.json() as Promise<MamaSitter[]>;
}

export async function getUserProfile() {
    const response = await fetch(`${API_URL}/users/me`, {
        method: 'GET',
        headers: authHeaders(),
    });

    if (!response.ok) throw new Error('Erreur lors de la récupération du profil');
    return response.json();
}

export async function updateProfile(updates: Partial<MamaSitter>) {
    const response = await fetch(`${API_URL}/users/me`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(updates),
    });

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Erreur lors de la mise à jour du profil.');
    }

    return response.json();
}
