import { useState, useEffect } from 'react';
import { Camera, Loader2, MapPin, Euro, FileText, User, CreditCard, ShieldCheck } from 'lucide-react';
import { getUserProfile, updateProfile, MamaSitter, fetchStripeStatus, createStripeAccountLink } from '../services/userService';
import { getCurrentUser } from '../services/authService';

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        try {
            const updates: Partial<MamaSitter> = {
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
                            <h3 className="font-poppins font-bold text-lg text-gray-800">Photo de profil</h3>
                            <p className="text-sm text-gray-500 font-lato mt-1 mb-3 max-w-sm">
                                Une photo claire et souriante rassure les mamans. Format recommandé : JPG, PNG (max 5Mo).
                            </p>
                            {avatar && (
                                <button type="button" onClick={() => setAvatar('')} className="text-sm text-red-500 hover:text-red-700 font-semibold font-lato">Supprimer la photo</button>
                            )}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Informations Base */}
                        <div className="space-y-6">
                            <h3 className="font-poppins font-bold text-lg text-vert border-b border-gray-100 pb-2">Informations Générales</h3>
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

                        {/* Informations MamaSitter spécifiques */}
                        {user?.role === 'MamaSitter' && (
                            <div className="space-y-6">
                                <h3 className="font-poppins font-bold text-lg text-vert border-b border-gray-100 pb-2">Profil MamaSitter</h3>

                                <div>
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

                                <div>
                                    <label className="block text-sm font-semibold flex items-center gap-2 text-gray-700 font-poppins mb-2">
                                        <FileText className="w-4 h-4 text-sable" /> À propos de moi (Bio)
                                    </label>
                                    <textarea
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        rows={6}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-sable focus:ring-2 focus:ring-sable/20 transition-all font-lato resize-none leading-relaxed"
                                        placeholder="Présentez-vous, décrivez votre expérience et ce que vous proposez aux mamans..."
                                    />
                                    <p className="text-xs text-gray-400 mt-2 font-lato text-right">{bio.length} caractères</p>
                                </div>

                                <h3 className="font-poppins font-bold text-lg text-vert border-b border-gray-100 pb-2 mt-8">Informations de Paiement</h3>
                                <p className="text-xs text-gray-500 font-lato mb-4">
                                    Ces informations ne sont visibles que par l'administration pour effectuer vos virements.
                                </p>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 font-poppins mb-2">RIB / IBAN</label>
                                    <input
                                        type="text"
                                        value={rib}
                                        onChange={(e) => setRib(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-sable focus:ring-2 focus:ring-sable/20 transition-all font-lato"
                                        placeholder="Format IBAN recommandé"
                                    />
                                </div>

                                {/* Section Stripe Connect */}
                                <div className="mt-8 p-6 rounded-3xl bg-gray-50 border-2 border-dashed border-gray-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                                            <CreditCard className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-poppins font-bold text-gray-800">Stripe Connect</h4>
                                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest italic">Paiement Automatique (Optionnel)</p>
                                        </div>
                                    </div>

                                    {stripeStatus?.connected && stripeStatus?.payouts_enabled ? (
                                        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-2xl">
                                            <ShieldCheck className="w-5 h-5 text-green-600" />
                                            <div>
                                                <p className="text-sm font-bold text-green-700">Compte Stripe Connecté</p>
                                                <p className="text-xs text-green-600/80">Votre compte est prêt à recevoir des paiements automatiques.</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <p className="text-sm text-gray-600 font-lato leading-relaxed">
                                                En connectant votre compte Stripe, vous recevrez votre part (73%) <b>instantanément et automatiquement</b> à chaque réservation.
                                            </p>
                                            <button
                                                type="button"
                                                onClick={handleConnectStripe}
                                                disabled={stripeLoading}
                                                className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 disabled:opacity-50"
                                            >
                                                {stripeLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Connecter à Stripe'}
                                            </button>
                                            <p className="text-[10px] text-center text-gray-400 font-medium">
                                                Vous serez redirigée vers le portail sécurisé de Stripe pour finaliser votre inscription.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 font-poppins mb-2">Autres infos bancaires (SWIFT, Nom Banque...)</label>
                                    <textarea
                                        value={bankInfo}
                                        onChange={(e) => setBankInfo(e.target.value)}
                                        rows={2}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-sable focus:ring-2 focus:ring-sable/20 transition-all font-lato resize-none"
                                        placeholder="Ex: BIC/SWIFT, Nom de la banque..."
                                    />
                                </div>
                            </div>
                        )}
                    </div>

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
