/**
 * ═══════════════════════════════════════════════════════════════════════
 * 🛡️ FILTRE DE SÉCURITÉ - CHAT MAMSITTER
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * Ce module détecte et masque TOUTES les tentatives d'échange de 
 * coordonnées personnelles entre utilisateurs.
 * 
 * Méthodes de contournement couvertes :
 * - Numéros de téléphone (tous formats : FR, CH, international)
 * - Numéros espacés, avec points, tirets, ou séparateurs spéciaux
 * - Numéros écrits en lettres ("zéro sept huit...")
 * - Emails standards et obfusqués ("user AT domaine DOT com")
 * - URLs et liens (http, www, raccourcis bit.ly, etc.)
 * - Adresses postales (rues, codes postaux, bâtiments)
 * - Réseaux sociaux (noms, pseudos, liens de profils)
 * - Identifiants de messagerie (Telegram, Signal, Discord, etc.)
 * - IBAN / coordonnées bancaires
 * - Caractères spéciaux utilisés pour masquer (leet speak, homoglyphes)
 * 
 * @param text Le contenu original du message
 * @returns Le texte filtré et un flag de signalement
 */

// ─── Utilitaire : normaliser le texte pour déjouer les astuces ──────
function normalizeText(text: string): string {
    return text
        // Remplacer les homoglyphes courants (lettres qui se ressemblent)
        .replace(/[０-９]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)) // Fullwidth digits
        .replace(/[Ａ-Ｚａ-ｚ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)) // Fullwidth letters
        .replace(/[ⓐ-ⓩ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 9327 + 96)) // Circled letters
        .replace(/[⓪①②③④⑤⑥⑦⑧⑨]/g, (ch) => {
            const map: Record<string, string> = { '⓪': '0', '①': '1', '②': '2', '③': '3', '④': '4', '⑤': '5', '⑥': '6', '⑦': '7', '⑧': '8', '⑨': '9' };
            return map[ch] || ch;
        })
        // Leet speak courant
        .replace(/[@]/g, 'a')
        .replace(/[€]/g, 'e')
        .replace(/[1|!|l]/g, (ch, idx, str) => {
            // Ne convertir que dans un contexte "mot" (pas dans les nombres)
            if (idx > 0 && /\d/.test(str[idx - 1])) return ch;
            if (idx < str.length - 1 && /\d/.test(str[idx + 1])) return ch;
            return ch;
        })
        // Supprimer les caractères invisibles et zero-width
        .replace(/[\u200B\u200C\u200D\uFEFF\u00AD]/g, '')
        // Normaliser les espaces multiples
        .replace(/\s+/g, ' ')
        .trim();
}

// ─── Utilitaire : extraire uniquement les chiffres ──────────────────
function extractDigits(text: string): string {
    return text.replace(/[^\d]/g, '');
}

// ─── Filtre principal ───────────────────────────────────────────────
export function filterContent(text: string): { filteredText: string; isFlagged: boolean } {
    let isFlagged = false;
    let filteredText = text;
    const normalized = normalizeText(text.toLowerCase());

    // ═══════════════════════════════════════════════════════
    // 1. NUMÉROS DE TÉLÉPHONE (tous formats possibles)
    // ═══════════════════════════════════════════════════════

    // Format international : +33, +41, 0033, 0041
    const intlPhoneRegex = /(?:(?:\+|00)\s?(?:33|41|32|39|49|34|44|1))\s?[\d\s.\-\/]{7,14}/g;

    // Format français : 06, 07 + 8 chiffres (avec ou sans séparateurs)
    const frPhoneRegex = /\b0\s?[67]\s?[\d\s.\-\/•·]{7,16}/g;

    // Format suisse : 07x + 7 chiffres
    const chPhoneRegex = /\b0\s?[7]\s?[89]\s?[\d\s.\-\/•·]{6,14}/g;

    // Format générique : toute suite de 6+ chiffres (même séparés par points/tirets/espaces)
    const genericPhoneRegex = /\d[\d\s.\-\/•·]{5,}\d/g;

    // Détection de numéros avec séparateurs spéciaux (•, ·, _, *, etc.)
    const sneakyPhoneRegex = /\d[\d\s.\-_*•·|\/\\]{4,}\d/g;

    [intlPhoneRegex, frPhoneRegex, chPhoneRegex, genericPhoneRegex, sneakyPhoneRegex].forEach(regex => {
        if (regex.test(text)) {
            isFlagged = true;
            filteredText = filteredText.replace(regex, '[📵 NUMÉRO MASQUÉ]');
        }
    });

    // Numéros écrits en lettres
    const writtenNumbers = [
        'zéro', 'zero', 'un', 'deux', 'trois', 'quatre', 'cinq',
        'six', 'sept', 'huit', 'neuf', 'dix'
    ];
    // Si on trouve 4+ noms de chiffres dans le message, c'est suspect
    let numberWordCount = 0;
    writtenNumbers.forEach(w => {
        const regex = new RegExp(`\\b${w}\\b`, 'gi');
        const matches = normalized.match(regex);
        if (matches) numberWordCount += matches.length;
    });
    if (numberWordCount >= 4) {
        isFlagged = true;
        filteredText = '[📵 NUMÉRO MASQUÉ - tentative en toutes lettres]';
    }

    // ═══════════════════════════════════════════════════════
    // 2. ADRESSES EMAIL (standard et obfusquées)
    // ═══════════════════════════════════════════════════════

    // Format standard
    const emailRegex = /[a-zA-Z0-9._%+\-]+\s?@\s?[a-zA-Z0-9.\-]+\s?\.\s?[a-zA-Z]{2,}/g;
    if (emailRegex.test(text)) {
        isFlagged = true;
        filteredText = filteredText.replace(emailRegex, '[📧 EMAIL MASQUÉ]');
    }

    // Format obfusqué : "truc AT domaine DOT com" / "truc arobase domaine point com"  
    const obfuscatedEmailRegex = /[a-zA-Z0-9._%+-]+\s*(?:at|arobase|arrobase|arobas|chez)\s*[a-zA-Z0-9.-]+\s*(?:dot|point|pt)\s*(?:com|fr|ch|net|org|io|be|de|eu)/gi;
    if (obfuscatedEmailRegex.test(normalized)) {
        isFlagged = true;
        filteredText = '[📧 EMAIL MASQUÉ - tentative obfusquée]';
    }

    // ═══════════════════════════════════════════════════════
    // 3. URLs ET LIENS (tous formats)
    // ═══════════════════════════════════════════════════════

    // Liens http/https/www
    const urlRegex = /(?:https?:\/\/|www\.)[^\s<>"']+/gi;
    if (urlRegex.test(text)) {
        isFlagged = true;
        filteredText = filteredText.replace(urlRegex, '[🔗 LIEN MASQUÉ]');
    }

    // Raccourcisseurs d'URL connus
    const shortUrlRegex = /\b(?:bit\.ly|tinyurl\.com|t\.co|goo\.gl|ow\.ly|is\.gd|buff\.ly|adf\.ly|tiny\.cc|rb\.gy|cutt\.ly|shorturl\.at|linktr\.ee)\b[^\s]*/gi;
    if (shortUrlRegex.test(text)) {
        isFlagged = true;
        filteredText = filteredText.replace(shortUrlRegex, '[🔗 LIEN MASQUÉ]');
    }

    // Domaines écrits en clair : "quelquechose.com", "machin.fr"
    const domainRegex = /\b[a-zA-Z0-9][\w-]*\s?\.\s?(?:com|fr|ch|net|org|io|be|de|eu|at|uk|it|es|info|me|co)\b/gi;
    if (domainRegex.test(normalized)) {
        isFlagged = true;
        filteredText = filteredText.replace(domainRegex, '[🔗 LIEN MASQUÉ]');
    }

    // ═══════════════════════════════════════════════════════
    // 4. ADRESSES POSTALES (rues, bâtiments, codes postaux)
    // ═══════════════════════════════════════════════════════

    // Types de voies (français)
    const streetRegex = /\b(?:\d{1,4}\s*,?\s*)?(?:rue|avenue|av\.|boulevard|blvd|bd|chemin|ch\.|impasse|imp\.|place|pl\.|quai|route|rte|allée|passage|square|voie|sentier|cour|cours|esplanade|parvis|rond[- ]?point|lotissement)\b[^.!?\n]{0,50}/gi;
    if (streetRegex.test(text)) {
        isFlagged = true;
        filteredText = filteredText.replace(streetRegex, '[🏠 ADRESSE MASQUÉE]');
    }

    // Codes postaux FR (5 chiffres) et CH (4 chiffres) suivis potentiellement d'un nom de ville
    const postalCityRegex = /\b\d{4,5}\s+[A-ZÀ-Ÿ][a-zà-ÿ]+/g;
    const standalonePostalRegex = /\b\d{4,5}\b/g;
    if (postalCityRegex.test(text)) {
        isFlagged = true;
        filteredText = filteredText.replace(postalCityRegex, '[🏠 ADRESSE MASQUÉE]');
    }

    // Mots-clés de localisation précise
    const locationKeywords = /\b(?:adresse|j'habite|j'habite au|mon adresse|ma maison|chez moi c'est|habite à|habite au|habitant|domicile|domicilié|résidence|appartement|appart|appt|apt|bâtiment|batiment|immeuble|étage|rez[- ]?de[- ]?chaussée|escalier|porte|digicode|interphone|boîte aux lettres|bal |cage d'escalier|parking|garage|portail|entrée|accès|mon quartier|habitation)\b/gi;
    if (locationKeywords.test(normalized)) {
        isFlagged = true;
    }

    // ═══════════════════════════════════════════════════════
    // 5. RÉSEAUX SOCIAUX ET MESSAGERIES
    // ═══════════════════════════════════════════════════════

    // Noms de plateformes (masqués dans le texte)
    const socialPlatforms = /\b(?:facebook|fb|messenger|instagram|insta|ig|snapchat|snap|whatsapp|wha?tsapp|whats ?app|telegram|tg|signal|viber|tiktok|tik ?tok|twitter|x\.com|discord|skype|zoom|teams|meet|facetime|line|wechat|pinterest|linkedin|tumblr|reddit|twitch|youtube|onlyfans)\b/gi;
    if (socialPlatforms.test(normalized)) {
        isFlagged = true;
        filteredText = filteredText.replace(socialPlatforms, '[📱 RÉSEAU MASQUÉ]');
    }

    // Pseudos de réseaux sociaux : @pseudo, #pseudo
    const handleRegex = /@[a-zA-Z0-9._]{2,30}\b/g;
    if (handleRegex.test(text)) {
        isFlagged = true;
        filteredText = filteredText.replace(handleRegex, '[📱 PSEUDO MASQUÉ]');
    }

    // Phrases de partage de contact réseaux sociaux
    const socialPhrases = /\b(?:ajoute[- ]?moi|ajoutez[- ]?moi|retrouve[- ]?moi|cherche[- ]?moi|contacte[- ]?moi|écris[- ]?moi|appelle[- ]?moi|envoie[- ]?moi|rejoins[- ]?moi|mon\s+(?:pseudo|profil|compte|identifiant|id|user|nom\s+d'?utilisateur)|je\s+(?:suis|m'appelle)\s+sur)\b/gi;
    if (socialPhrases.test(normalized)) {
        isFlagged = true;
    }

    // ═══════════════════════════════════════════════════════
    // 6. IBAN ET COORDONNÉES BANCAIRES
    // ═══════════════════════════════════════════════════════

    const ibanRegex = /\b[A-Z]{2}\s?\d{2}\s?[\dA-Z\s]{10,34}\b/g;
    if (ibanRegex.test(text.toUpperCase())) {
        isFlagged = true;
        filteredText = filteredText.replace(ibanRegex, '[💳 IBAN MASQUÉ]');
    }

    // ═══════════════════════════════════════════════════════
    // 7. MOTS-CLÉS D'INTENTION DE CONTACT HORS PLATEFORME
    // ═══════════════════════════════════════════════════════

    const contactIntentKeywords = [
        // Téléphone
        'téléphone', 'tél', 'phone', 'appel', 'appeler', 'appelle',
        'numéro', 'numero', 'portable', 'mobile', 'cellulaire', 'fixe',
        'sms', 'texto', 'message vocal', 'messagerie vocale',
        // Paiement direct
        'apple pay', 'google pay', 'paypal', 'revolut', 'twint', 'virement',
        'espèces', 'cash', 'liquide', 'payer directement', 'en dehors',
        // Contact direct
        'en privé', 'en pv', 'en dm', 'en mp', 'hors', 'hors plateforme',
        'en direct', 'directement', 'perso', 'personnel', 'personnellement',
        'coordonnées', 'coordonnees', 'contact', 'contacter',
        'se voir', 'se retrouver', 'on se voit', 'rdv', 'rendez-vous',
        'rencontre', 'rencontrer', 'viens chez', 'passe chez',
        // QR Code
        'qr code', 'qr-code', 'scanne', 'scanner'
    ];

    contactIntentKeywords.forEach(keyword => {
        // Échapper les caractères spéciaux pour la regex
        const escaped = keyword.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&');
        const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
        if (regex.test(normalized)) {
            isFlagged = true;
        }
    });

    // ═══════════════════════════════════════════════════════
    // 8. DÉTECTION DE CONTOURNEMENT AVANCÉ
    // ═══════════════════════════════════════════════════════

    // Chiffres séparés par des caractères uniques pour éviter la détection
    // Ex: "0-7-8-1-2-3-4-5-6-7" ou "0 7 8 1 2 3 4 5 6 7"  
    const digits = extractDigits(text);
    if (digits.length >= 8 && digits.length <= 15) {
        // Vérifier si les chiffres sont dispersés dans le texte (tentative de camouflage)
        const charCount = text.replace(/\s/g, '').length;
        const digitRatio = digits.length / charCount;
        // Si plus de 40% du message sont des chiffres, c'est très suspect
        if (digitRatio > 0.4 && charCount < 40) {
            isFlagged = true;
            filteredText = '[📵 NUMÉRO MASQUÉ - tentative de contournement]';
        }
    }

    // Texte avec beaucoup de lettres séparées par des espaces (épeler un mot)
    // Ex: "f a c e b o o k" ou "i n s t a"
    const spelledOutRegex = /(?:[a-zA-Z]\s){4,}/g;
    if (spelledOutRegex.test(text)) {
        // Reconstituer le mot pour voir s'il correspond à un réseau social ou mot interdit
        const spelledWords = text.match(spelledOutRegex);
        if (spelledWords) {
            spelledWords.forEach(sw => {
                const word = sw.replace(/\s/g, '').toLowerCase();
                const dangerousWords = ['facebook', 'instagram', 'insta', 'snapchat', 'snap', 'whatsapp',
                    'telegram', 'signal', 'discord', 'adresse', 'numero', 'telephone', 'email', 'mail'];
                if (dangerousWords.some(dw => word.includes(dw))) {
                    isFlagged = true;
                    filteredText = filteredText.replace(sw, '[🚫 CONTENU MASQUÉ]');
                }
            });
        }
    }

    // Remplacer les codes postaux restants uniquement si flaggé
    if (isFlagged) {
        filteredText = filteredText.replace(standalonePostalRegex, '[🏠 MASQUÉ]');
    }

    return { filteredText, isFlagged };
}
