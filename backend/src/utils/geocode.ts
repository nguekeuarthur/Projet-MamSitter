/**
 * Utilitaire de géocodage multi-API (France + International)
 * Stratégie en cascade pour maximiser les chances :
 * 1) API data.gouv.fr (France) avec la requête complète
 * 2) Nominatim (restreint France + Suisse + Belgique) avec la requête complète
 * 3) Nominatim avec le code postal seul (restreint géo)
 * 4) Nominatim avec le nom de ville seul
 * 5) API France avec le code postal seul
 * 6) API France avec la ville seule
 * 
 * Le paramètre countrycodes=fr,ch,be restreint la recherche à la France,
 * Suisse et Belgique pour éviter les faux positifs (ex: 1400 = Bangladesh).
 */

const COUNTRY_CODES = 'fr,ch'; // France et Suisse uniquement

async function tryFranceGeocode(query: string): Promise<[number, number] | null> {
    try {
        const res = await fetch(
            `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=1`
        );
        const data: any = await res.json();
        if (data.features && data.features.length > 0) {
            const feature = data.features[0];
            const score = feature.properties.score;
            // On n'accepte le résultat FR que si le score est élevé (> 0.6)
            // Sinon on laisse la main au fallback Nominatim (plus précis hors France)
            if (score > 0.6) {
                const coords = feature.geometry.coordinates;
                console.log(`📍 Géocodage FR OK: "${query}" (Score: ${score?.toFixed(2)}) → [${coords}]`);
                return coords;
            }
        }
    } catch (err) {
        // silently fail, try next
    }
    return null;
}

async function tryNominatimSearch(query: string): Promise<[number, number] | null> {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&accept-language=fr&countrycodes=${COUNTRY_CODES}`,
            { headers: { 'User-Agent': 'MamSitter-App/1.0' } }
        );
        const data: any = await res.json();
        if (data && data.length > 0) {
            const coords: [number, number] = [
                parseFloat(data[0].lon),
                parseFloat(data[0].lat)
            ];
            console.log(`📍 Géocodage Nominatim OK: "${query}" → [${coords}] (${data[0].display_name})`);
            return coords;
        }
    } catch (err) {
        // silently fail
    }
    return null;
}

async function tryNominatimPostalCode(postalCode: string): Promise<[number, number] | null> {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?postalcode=${encodeURIComponent(postalCode)}&format=json&limit=1&accept-language=fr&countrycodes=${COUNTRY_CODES}`,
            { headers: { 'User-Agent': 'MamSitter-App/1.0' } }
        );
        const data: any = await res.json();
        if (data && data.length > 0) {
            const coords: [number, number] = [
                parseFloat(data[0].lon),
                parseFloat(data[0].lat)
            ];
            console.log(`📍 Géocodage Nominatim (CP seul) OK: "${postalCode}" → [${coords}] (${data[0].display_name})`);
            return coords;
        }
    } catch (err) {
        // silently fail
    }
    return null;
}

export async function geocode(query: string): Promise<[number, number] | null> {
    if (!query || query.trim().length === 0) return null;

    const trimmed = query.trim();

    // Séparer ville et code postal pour des tentatives individuelles
    const parts = trimmed.split(/\s+/);
    const postalCode = parts.find(p => /^\d{4,5}$/.test(p));
    const cityParts = parts.filter(p => !/^\d{4,5}$/.test(p));
    const cityOnly = cityParts.join(' ').trim();

    // Tentative 1 : API France avec la requête complète
    let result = await tryFranceGeocode(trimmed);
    if (result) return result;

    // Tentative 2 : Nominatim avec la requête complète (restreint géo)
    result = await tryNominatimSearch(trimmed);
    if (result) return result;

    // Tentative 3 : Nominatim avec le code postal seul (paramètre structuré)
    if (postalCode) {
        result = await tryNominatimPostalCode(postalCode);
        if (result) return result;
    }

    // Tentative 4 : Nominatim avec seulement le nom de ville
    if (cityOnly && cityOnly !== trimmed) {
        result = await tryNominatimSearch(cityOnly);
        if (result) return result;
    }

    // Tentative 5 : API France avec seulement le code postal
    if (postalCode && postalCode !== trimmed) {
        result = await tryFranceGeocode(postalCode);
        if (result) return result;
    }

    // Tentative 6 : API France avec seulement la ville
    if (cityOnly && cityOnly !== trimmed) {
        result = await tryFranceGeocode(cityOnly);
        if (result) return result;
    }

    console.warn(`❌ Géocodage échoué pour: "${trimmed}" (toutes les 6 tentatives épuisées)`);
    return null;
}

/**
 * Calcul de distance Haversine entre deux points GPS (en km)
 */
export function haversineDistance(
    lat1: number, lon1: number,
    lat2: number, lon2: number
): number {
    const R = 6371; // Rayon de la Terre en km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function toRad(deg: number): number {
    return deg * (Math.PI / 180);
}
