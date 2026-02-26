import { authHeaders } from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export async function createCheckoutSession(bookingData: {
    sitterId: string;
    packageName: string;
    amount: number;
    currency: string;
}) {
    const response = await fetch(`${API_URL}/bookings/create-checkout-session`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Erreur lors de la création du paiement');
    }

    return response.json();
}

export async function verifyBookingSession(sessionId: string) {
    const response = await fetch(`${API_URL}/bookings/verify-session/${sessionId}`, {
        method: 'GET',
        headers: authHeaders(),
    });

    if (!response.ok) {
        throw new Error('Erreur de vérification du paiement');
    }

    return response.json();
}

export async function fetchAllBookings() {
    const response = await fetch(`${API_URL}/bookings/all`, {
        method: 'GET',
        headers: authHeaders(),
    });

    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des transactions');
    }

    return response.json();
}
