import { useState, useEffect } from 'react';
import { Search, MapPin, Loader2, Star } from 'lucide-react';
import { getCurrentUser } from '../services/authService';
import { searchMamaSitters, MamaSitter } from '../services/userService';

// Options de rayon en kilomètres
const RADIUS_OPTIONS = [
    { value: 0, label: 'Tous les rayons' },
    { value: 5, label: '5 km' },
    { value: 10, label: '10 km' },
    { value: 20, label: '20 km' },
    { value: 50, label: '50 km' },
];

export default function MamaSitterSearch() {
    // remove unused user state
    const [mamasitters, setMamasitters] = useState<MamaSitter[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [verifying, setVerifying] = useState(true);

    // Filtres
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [radius, setRadius] = useState<number>(0);

    // Vérification de l'accès réservé
    useEffect(() => {
        const initPage = async () => {
            try {
                const currentUser = await getCurrentUser();
                if (!currentUser) {
                    window.location.hash = '#/login';
                    return;
                }
                // utilisateur authentifié validé
                // Sécurisation stricte : accès réservé aux Mamans inscrites (et Admin)
                if (currentUser.role && currentUser.role !== 'Maman' && currentUser.role !== 'Admin') {
                    window.location.hash = '#/';
                    return;
                }

                // Charger une première fois les MamaSitters sans filtre
                await performSearch();
            } catch (err) {
                window.location.hash = '#/login';
            } finally {
                setVerifying(false);
            }
        };
        initPage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const performSearch = async (overrideParams?: any) => {
        setLoading(true);
        setError('');
        try {
            let lat: number | undefined;
            let lng: number | undefined;

            // Si un rayon est spécifié et qu'une ville ou code postal est entré, on cherche les coordonnées via l'API adresse du gouvernement.
            if (overrideParams?.radius > 0 || radius > 0) {
                const searchQuery = overrideParams?.postalCode || overrideParams?.city || postalCode || city;
                if (searchQuery) {
                    const geocodeRes = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(searchQuery)}&limit=1`);
                    const geocodeData = await geocodeRes.json();

                    if (geocodeData.features && geocodeData.features.length > 0) {
                        const coordinates = geocodeData.features[0].geometry.coordinates; // [lng, lat]
                        lng = coordinates[0];
                        lat = coordinates[1];
                    } else {
                        setError('Impossible de trouver les coordonnées pour cette localité.');
                        setLoading(false);
                        return;
                    }
                }
            }

            const results = await searchMamaSitters({
                city: overrideParams?.city ?? city,
                postalCode: overrideParams?.postalCode ?? postalCode,
                radius: overrideParams?.radius ?? radius,
                lat,
                lng
            });
            setMamasitters(results);
        } catch (err: any) {
            setError(err.message || 'Erreur lors de la recherche.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        performSearch();
    };

    if (verifying) {
        return (
            <div className="min-h-screen bg-beige/30 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-vert" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-vert font-poppins mb-4 uppercase tracking-wide">
                    Trouver une MamaSitter
                </h1>
                <p className="text-gray-600 font-lato max-w-2xl mx-auto">
                    Recherchez une accompagnante post-partum près de chez vous.
                    L'accès à cette liste est sécurisé et réservé à notre communauté de mamans.
                </p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-vert/10 p-6 md:p-8 mb-12">
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full relative">
                        <label className="block font-poppins font-semibold text-sm text-gray-700 mb-2">Ville</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Ex. Paris, Lyon..."
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-sable focus:ring-2 focus:ring-sable/20"
                            />
                            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                        </div>
                    </div>

                    <div className="flex-1 w-full relative">
                        <label className="block font-poppins font-semibold text-sm text-gray-700 mb-2">Code Postal</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                placeholder="Ex. 75001"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-sable focus:ring-2 focus:ring-sable/20"
                            />
                            <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                        </div>
                    </div>

                    <div className="flex-1 w-full">
                        <label className="block font-poppins font-semibold text-sm text-gray-700 mb-2">Rayon (km)</label>
                        <select
                            value={radius}
                            onChange={(e) => setRadius(Number(e.target.value))}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-sable focus:ring-2 focus:ring-sable/20 cursor-pointer"
                        >
                            {RADIUS_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full md:w-auto px-8 py-3 bg-sable text-white font-bold rounded-lg uppercase tracking-wide hover:bg-sable/90 transition flex justify-center items-center"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Filtrer'}
                    </button>
                </form>
                {error && <p className="mt-4 text-red-500 font-lato text-sm">{error}</p>}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                    [...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-4 animate-pulse">
                            <div className="w-20 h-20 bg-gray-200 rounded-full flex-shrink-0"></div>
                            <div className="flex-1 space-y-3 py-2">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                    ))
                ) : mamasitters.length > 0 ? (
                    mamasitters.map((sitter) => (
                        <div key={sitter._id} className="bg-white rounded-2xl p-6 shadow-sm border border-vert/10 hover:shadow-md transition-shadow group flex flex-col h-full">
                            <div className="flex gap-4 items-start mb-4">
                                <div className="w-20 h-20 rounded-full bg-sable/10 flex items-center justify-center flex-shrink-0 overflow-hidden border-2 border-transparent group-hover:border-sable transition-colors">
                                    {sitter.avatar ? (
                                        <img src={sitter.avatar} alt={sitter.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-sable font-bold text-2xl uppercase">{sitter.name.charAt(0)}</span>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-poppins font-bold text-lg text-vert leading-tight mb-1">{sitter.name}</h3>
                                    <div className="flex items-center text-gray-500 font-lato text-sm mb-1">
                                        <MapPin className="w-3.5 h-3.5 mr-1" />
                                        {sitter.city || 'Ville non précisée'} {sitter.postalCode && `(${sitter.postalCode})`}
                                    </div>
                                    <div className="flex items-center text-sable text-sm font-semibold">
                                        <Star className="w-3.5 h-3.5 fill-current mr-1" />
                                        MamaSitter Vérifiée
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 font-lato text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                {sitter.bio || "Cette MamaSitter n'a pas encore ajouté de description, mais elle est prête à vous accompagner !"}
                            </p>
                            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                <div>
                                    <span className="text-xs text-gray-400 font-lato uppercase tracking-wider block">Tarif indicatif</span>
                                    <span className="font-poppins font-bold text-gray-800">
                                        {sitter.hourlyRate ? `${sitter.hourlyRate}€ / heure` : 'Sur devis'}
                                    </span>
                                </div>
                                <button className="px-4 py-2 bg-vert/10 text-vert hover:bg-vert hover:text-white rounded-full font-semibold text-sm transition-colors">
                                    Contacter
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                        <h3 className="text-xl font-bold font-poppins text-gray-800 mb-2">Aucune MamaSitter trouvée</h3>
                        <p className="text-gray-500 font-lato max-w-md mx-auto">
                            Nous n'avons trouvé aucune accompagnante avec ces critères. Essayez d'élargir votre rayon géographique ou de modifier vos filtres.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
