import { authHeaders } from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export interface Message {
    _id: string;
    sender: string;
    receiver: string;
    content: string;
    isFlagged: boolean;
    read: boolean;
    createdAt: string;
}

export async function sendMessage(receiverId: string, content: string) {
    const response = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ receiverId, content }),
    });

    if (!response.ok) {
        if (response.status === 401) window.dispatchEvent(new CustomEvent('auth-error-401'));
        const data = await response.json().catch(() => ({}));
        if (response.status === 403) {
            window.dispatchEvent(new CustomEvent('auth-error-403', { detail: { message: data.error } }));
        }
        throw new Error(data.error || "Erreur lors de l'envoi du message.");
    }

    return response.json();
}

export async function fetchConversations() {
    const response = await fetch(`${API_URL}/messages/conversations`, {
        method: 'GET',
        headers: authHeaders(),
    });

    if (!response.ok) {
        if (response.status === 401) window.dispatchEvent(new CustomEvent('auth-error-401'));
        if (response.status === 403) {
            const data = await response.json().catch(() => ({}));
            window.dispatchEvent(new CustomEvent('auth-error-403', { detail: { message: data.error } }));
            throw new Error(data.error || 'Accès Refusé');
        }
        throw new Error('Erreur lors de la récupération des conversations.');
    }
    return response.json();
}

export async function fetchMessages(otherUserId: string) {
    const response = await fetch(`${API_URL}/messages/${otherUserId}`, {
        method: 'GET',
        headers: authHeaders(),
    });

    if (!response.ok) {
        if (response.status === 401) window.dispatchEvent(new CustomEvent('auth-error-401'));
        if (response.status === 403) {
            const data = await response.json().catch(() => ({}));
            window.dispatchEvent(new CustomEvent('auth-error-403', { detail: { message: data.error } }));
            throw new Error(data.error || 'Accès Refusé');
        }
        throw new Error('Erreur lors de la récupération des messages.');
    }
    return response.json() as Promise<Message[]>;
}

export async function fetchFlaggedMessages() {
    const response = await fetch(`${API_URL}/messages/admin/flagged`, {
        method: 'GET',
        headers: authHeaders(),
    });

    if (!response.ok) {
        if (response.status === 401) window.dispatchEvent(new CustomEvent('auth-error-401'));
        throw new Error('Erreur lors de la récupération des messages flaggés.');
    }
    return response.json();
}
