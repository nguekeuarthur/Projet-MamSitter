import { useState, useEffect } from 'react';
import { Camera, Loader2, MapPin, Euro, FileText, User, CreditCard, ShieldCheck, History, Phone, Globe, GraduationCap, Clock, Sparkles } from 'lucide-react';
import { getUserProfile, updateProfile, fetchStripeStatus, createStripeAccountLink } from '../services/userService';
import { getCurrentUser } from '../services/authService';

const LANGUAGES = ['Français', 'Anglais', 'Allemand', 'Espagnol', 'Italien', 'Arabe', 'Russe', 'Chinois', 'Autre'];
const DIPLOMAS = [
    'Aucun diplôme spécifique',
    'CAP Petite Enfance',
    'BEP Carrières Sanitaires et Sociales',
    'BAFA',
    "Diplôme d'État d'Auxiliaire de Puériculture",
    "Diplôme d'État d'Éducateur de Jeunes Enfants",
    "Titre Professionnel d'Assistant de Vie aux Familles (ADVF)",
    'Formation Premiers Secours (PSC1)'
];
const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const SLOTS = ['Matin (8h-12h)', 'Après-midi (12h-18h)', 'Soirée (18h-22h)', 'Nuit (22h-8h)'];

export default function Profile() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Form fields
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [bio, setBio] = useState('');
    const [hourlyRate, setHourlyRate] = useState<number | string>('');
    const [avatar, setAvatar] = useState('');
    const [rib, setRib] = useState('');
    const [bankInfo, setBankInfo] = useState('');
    const [stripeStatus, setStripeStatus] = useState<any>(null);
    const [stripeLoading, setStripeLoading] = useState(false);

    // Nouveaux champs MamaSitter
    const [phone, setPhone] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [diploma, setDiploma] = useState('');
    const [availabilities, setAvailabilities] = useState<Record<string, string[]>>({
        'Lundi': [], 'Mardi': [], 'Mercredi': [], 'Jeudi': [], 'Vendredi': [], 'Samedi': [], 'Dimanche': []
    });

    useEffect(() => {
        async function loadData() {
            try {
                const currentUser = await getCurrentUser();
                if (!currentUser) {
                    window.location.hash = '#/login';
                    return;
                }

                const profileData = await getUserProfile();
                setUser(profileData);
                setName(profileData.name || '');
                setCity(profileData.city || '');
                setPostalCode(profileData.postalCode || '');
                setBio(profileData.bio || '');
                setHourlyRate(profileData.hourlyRate || '');
                setAvatar(profileData.avatar || '');
                setRib(profileData.rib || '');
                setBankInfo(profileData.bankInfo || '');
                setPhone(profileData.phone || '');
                setShortDescription(profileData.shortDescription || '');
                setSelectedLanguages(profileData.languages || []);
                setDiploma(profileData.diploma || '');
                if (profileData.availabilities && typeof profileData.availabilities === 'object') {
                    setAvailabilities({
                        'Lundi': [], 'Mardi': [], 'Mercredi': [], 'Jeudi': [], 'Vendredi': [], 'Samedi': [], 'Dimanche': [],
                        ...profileData.availabilities
                    });
                }

                if (profileData.role === 'MamaSitter') {
                    const status = await fetchStripeStatus();
                    setStripeStatus(status);
                }

                setLoading(false);
            } catch (err) {
                window.location.hash = '#/login';
            }
        }
        loadData();
    }, []);

    const handleConnectStripe = async () => {
        setStripeLoading(true);
        try {
            const { url } = await createStripeAccountLink();
            window.location.href = url;
        } catch (err: any) {
            setError(err.message || "Erreur lors de la connexion à Stripe");
            setStripeLoading(false);
        }
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError("La photo est trop volumineuse (max 5Mo).");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleLanguage = (lang: string) => {
        setSelectedLanguages(prev =>
            prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
        );
    };

    const toggleAvailability = (day: string, slot: string) => {
        setAvailabilities(prev => {
            const daySlots = prev[day] || [];
            return {
                ...prev,
                [day]: daySlots.includes(slot) ? daySlots.filter(s => s !== slot) : [...daySlots, slot]
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        try {
            const updates: any = {
                name,
                city,
                postalCode,
                bio,
                avatar
            };
            if (user?.role === 'MamaSitter') {
                updates.hourlyRate = Number(hourlyRate);
                updates.rib = rib;
                updates.bankInfo = bankInfo;
                updates.phone = phone;
                updates.shortDescription = shortDescription;
                updates.languages = selectedLanguages;
                updates.diploma = diploma;
                updates.availabilities = availabilities;
            }

            await updateProfile(updates);
            setSuccess('Profil mis à jour avec succès !');

            // Update local storage user info if name changed
            const localUser = await getCurrentUser();
            if (localUser && localUser.name !== name) {
                localUser.name = name;
                localStorage.setItem('mamsitter_user', JSON.stringify(localUser));
                window.dispatchEvent(new Event('auth-change'));
            }
        } catch (err: any) {
            setError(err.message || 'Erreur lors de la mise à jour.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-beige/30 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-vert" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-12">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-vert font-poppins mb-2 uppercase tracking-wide">
                    Mon Profil
                </h1>
                <p className="text-gray-600 font-lato">
                    Gérez vos informations personnelles et votre présentation.
                </p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-vert/10 p-8 md:p-10">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl font-lato text-sm border border-red-100">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl font-lato text-sm border border-green-100">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 pb-8 border-b border-gray-100">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-md flex items-center justify-center">
                                {avatar ? (
                                    <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-12 h-12 text-gray-300" />
                                )}
                            </div>
                            <label className="absolute bottom-0 right-0 lg:bottom-2 lg:right-2 bg-sable hover:bg-sable/90 text-white rounded-full p-2.5 cursor-pointer shadow-lg transition-transform hover:scale-105">
                                <Camera className="w-4 h-4" />
                                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                            </label>
                        </div>
                        <div className="text-center sm:text-left pt-2">
                            <h3 className="font-poppins font-bold text-lg text-gray-800">Votre photo</h3>
                            <p className="text-sm text-gray-500 font-lato mt-1 mb-3 max-w-sm">
                                Une photo claire et souriante rassure les mamans. Format recommandé : JPG, PNG (max 5Mo).
                            </p>
                            {avatar && (
                                <button type="button" onClick={() => setAvatar('')} className="text-sm text-red-500 hover:text-red-700 font-semibold font-lato">Supprimer la photo</button>
                            )}
                        </div>
                    </div>

                    {/* Informations Générales */}
                    <div>
                        <h3 className="font-poppins font-bold text-lg text-vert border-b border-gray-100 pb-2 mb-6">Informations Générales</h3>
                        <div className="grid md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 font-poppins mb-2">Prénom & Nom</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-sable focus:ring-2 focus:ring-sable/20 transition-all font-lato"
                                    required
                                />
                            </div>
                            {user?.role === 'MamaSitter' && (
                                <div>
                                    <label className="block text-sm font-semibold flex items-center gap-2 text-gray-700 font-poppins mb-2">
                                        <Phone className="w-4 h-4 text-sable" /> Téléphone
                                    </label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-sable focus:ring-2 focus:ring-sable/20 transition-all font-lato"
                                        placeholder="06 12 34 56 78"
                                    />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-semibold flex items-center gap-2 text-gray-700 font-poppins mb-2">
                                    <MapPin className="w-4 h-4 text-sable" /> Ville
                                </label>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-sable focus:ring-2 focus:ring-sable/20 transition-all font-lato"
                                    placeholder="Ex. Paris"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 font-poppins mb-2">Code Postal</label>
                                <input
                                    type="text"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-sable focus:ring-2 focus:ring-sable/20 transition-all font-lato"
                                    placeholder="Ex. 75001"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Profil MamaSitter */}
                    {user?.role === 'MamaSitter' && (
                        <div>
                            <h3 className="font-poppins font-bold text-lg text-vert border-b border-gray-100 pb-2 mb-6 flex items-center gap-2">
                                <Sparkles className="w-5 h-5" /> Profil MamaSitter
                            </h3>

                            {/* Accroche */}
                            <div className="mb-5">
                                <label className="block text-sm font-semibold text-gray-700 font-poppins mb-2">
                                    Accroche / Titre du profil (max 70 car.)
                                </label>
                                <input
                                    type="text"
                                    value={shortDescription}
                                    onChange={(e) => setShortDescription(e.target.value.slice(0, 70))}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-vert focus:ring-2 focus:ring-vert/20 transition-all font-lato"
                                    placeholder="Ex: Douce et expérimentée, j'adore prendre soin des bébés"
                                />
                                <p className="text-[10px] text-right text-gray-400 mt-1">{shortDescription.length}/70</p>
                            </div>

                            {/* Tarif */}
                            <div className="mb-5">
                                <label className="block text-sm font-semibold flex items-center gap-2 text-gray-700 font-poppins mb-2">
                                    <Euro className="w-4 h-4 text-sable" /> Tarif Horaire (€)
                                </label>
                                <input
                                    type="number"
                                    value={hourlyRate}
                                    onChange={(e) => setHourlyRate(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-sable focus:ring-2 focus:ring-sable/20 transition-all font-lato"
                                    placeholder="ex: 20"
                                />
                            </div>

                            {/* Bio */}
                            <div className="mb-5">
                                <label className="block text-sm font-semibold flex items-center gap-2 text-gray-700 font-poppins mb-2">
                                    <FileText className="w-4 h-4 text-sable" /> Bio / Présentation détaillée
                                </label>
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    rows={5}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-sable focus:ring-2 focus:ring-sable/20 transition-all font-lato resize-none leading-relaxed"
                                    placeholder="Parlez-nous de vous, de votre parcours et de votre approche avec les familles..."
                                />
                                <p className="text-xs text-gray-400 mt-1 font-lato text-right">{bio.length} caractères</p>
                            </div>

                            {/* Langues */}
                            <div className="mb-5">
                                <label className="block text-sm font-semibold flex items-center gap-2 text-gray-700 font-poppins mb-3">
                                    <Globe className="w-4 h-4 text-sable" /> Langues parlées
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {LANGUAGES.map(lang => (
                                        <button
                                            key={lang}
                                            type="button"
                                            onClick={() => toggleLanguage(lang)}
                                            className={`px-3.5 py-2 rounded-full border text-xs font-semibold transition-all ${selectedLanguages.includes(lang)
                                                ? 'bg-vert border-vert text-white shadow-sm'
                                                : 'bg-white border-gray-200 text-gray-600 hover:border-vert/50'
                                                }`}
                                        >
                                            {lang}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Diplôme */}
                            <div className="mb-5">
                                <label className="block text-sm font-semibold flex items-center gap-2 text-gray-700 font-poppins mb-2">
                                    <GraduationCap className="w-4 h-4 text-sable" /> Diplôme en lien avec le mamsitting
                                </label>
                                <select
                                    value={diploma}
                                    onChange={(e) => setDiploma(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-vert focus:ring-2 focus:ring-vert/20 transition-all font-lato text-sm cursor-pointer"
                                >
                                    <option value="">Sélectionnez un diplôme...</option>
                                    {DIPLOMAS.map(d => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Disponibilités */}
                            <div className="mb-5">
                                <label className="block text-sm font-semibold flex items-center gap-2 text-gray-700 font-poppins mb-3">
                                    <Clock className="w-4 h-4 text-sable" /> Mes disponibilités
                                </label>
                                <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 overflow-x-auto">
                                    <table className="w-full text-xs font-lato border-collapse">
                                        <thead>
                                            <tr>
                                                <th className="p-2 text-left text-gray-500 font-semibold"></th>
                                                {SLOTS.map(s => (
                                                    <th key={s} className="p-2 font-semibold text-gray-500 text-center whitespace-nowrap">
                                                        {s.split(' ')[0]}
                                                        <span className="block text-[9px] text-gray-400 font-normal">{s.match(/\(.*\)/)?.[0]}</span>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {DAYS.map(day => (
                                                <tr key={day} className="border-t border-gray-100">
                                                    <td className="p-2 font-semibold text-gray-700">{day}</td>
                                                    {SLOTS.map(slot => (
                                                        <td key={slot} className="p-2 text-center">
                                                            <button
                                                                type="button"
                                                                onClick={() => toggleAvailability(day, slot)}
                                                                className={`w-7 h-7 rounded-lg border-2 transition-all font-bold text-xs ${availabilities[day]?.includes(slot)
                                                                    ? 'bg-vert border-vert text-white shadow-sm'
                                                                    : 'bg-white border-gray-200 text-transparent hover:border-vert/40'
                                                                    }`}
                                                            >
                                                                ✓
                                                            </button>
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Section Stripe Connect */}
                            <div className="mt-6 p-6 rounded-3xl bg-gradient-to-br from-indigo-50/80 to-purple-50/50 border border-indigo-100/50">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                        <CreditCard className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-poppins font-bold text-gray-800">Recevoir mes paiements</h4>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">via Stripe Connect</p>
                                    </div>
                                </div>

                                {stripeStatus?.connected && stripeStatus?.payouts_enabled ? (
                                    <div className="flex items-center gap-3 p-4 bg-white border border-green-100 rounded-2xl shadow-sm">
                                        <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-bold text-green-700">Compte connecté ✓</p>
                                            <p className="text-xs text-green-600/70">Vous recevez automatiquement 73% de chaque réservation.</p>
                                        </div>
                                    </div>
                                ) : stripeStatus?.connected ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 p-4 bg-white border border-orange-100 rounded-2xl">
                                            <History className="w-5 h-5 text-orange-500 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm font-bold text-orange-600">Configuration en cours</p>
                                                <p className="text-xs text-orange-500/80">Stripe vérifie vos informations. Cela peut prendre quelques heures pour activer les virements.</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleConnectStripe}
                                            disabled={stripeLoading}
                                            className="w-full py-3 bg-white text-orange-600 border border-orange-200 font-bold rounded-xl hover:bg-orange-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {stripeLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Vérifier mon statut sur Stripe'}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <p className="text-sm text-gray-600 font-lato leading-relaxed">
                                            Connectez votre compte Stripe pour recevoir <b>automatiquement votre part (73%)</b> à chaque réservation. Sécurisé et instantané.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={handleConnectStripe}
                                            disabled={stripeLoading}
                                            className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 disabled:opacity-50"
                                        >
                                            {stripeLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CreditCard className="w-4 h-4" /> Connecter mon compte Stripe</>}
                                        </button>
                                        <p className="text-[10px] text-center text-gray-400 font-medium">
                                            Vous serez redirigée vers le portail sécurisé de Stripe.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-8 py-3.5 bg-vert text-white font-bold font-poppins rounded-xl uppercase tracking-wide hover:bg-vert/90 transition flex items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Enregistrer les modifications'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
