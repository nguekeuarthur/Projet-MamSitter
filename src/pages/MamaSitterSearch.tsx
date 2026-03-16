import React, { useState, useEffect } from 'react';
import { Search, MapPin, Loader2, LocateFixed, Heart, Clock, ShieldCheck, Globe, GraduationCap, MessageCircle, X, SlidersHorizontal, ChevronRight, Euro, Sparkles } from 'lucide-react';
import { getCurrentUser } from '../services/authService';
import { searchMamaSitters, MamaSitter } from '../services/userService';

const RADIUS_OPTIONS = [
    { value: 0, label: 'Partout' },
    { value: 5, label: 'Dans un rayon de 5 km' },
    { value: 10, label: 'Dans un rayon de 10 km' },
    { value: 20, label: 'Dans un rayon de 20 km' },
    { value: 50, label: 'Dans un rayon de 50 km' },
    { value: 100, label: 'Dans un rayon de 100 km' },
];

export default function MamaSitterSearch() {
    const [mamasitters, setMamasitters] = useState<MamaSitter[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [initialLoading, setInitialLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedSitter, setSelectedSitter] = useState<any | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [showFullAvatar, setShowFullAvatar] = useState(false);

    // Filtres
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [radius, setRadius] = useState<number>(0);
    const [userCoords, setUserCoords] = useState<{ lat: number, lng: number } | null>(null);
    const [locating, setLocating] = useState(false);

    useEffect(() => {
        const init = async () => {
            try {
                const currentUser = await getCurrentUser();
                setIsLoggedIn(!!currentUser);

                const savedCoords = localStorage.getItem('user_coords');
                if (savedCoords) {
                    setUserCoords(JSON.parse(savedCoords));
                }

                await performSearch();
            } catch {
                // Pas de compte
            } finally {
                setInitialLoading(false);
            }
        };
        init();
    }, []);

    const performSearch = async (overrideParams?: any) => {
        setLoading(true);
        setError('');
        try {
            let lat: number | undefined;
            let lng: number | undefined;

            const currentRadius = overrideParams?.radius ?? radius;
            const currentCity = overrideParams?.city ?? city;
            const currentPostalCode = overrideParams?.postalCode ?? postalCode;
            const coords = overrideParams?.coords ?? userCoords;

            if (currentRadius > 0) {
                const searchQuery = currentPostalCode || currentCity;
                if (searchQuery) {
                    let geocodeRes = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(searchQuery)}&limit=1`);
                    let geocodeData = await geocodeRes.json();

                    if (geocodeData.features && geocodeData.features.length > 0) {
                        const coordinates = geocodeData.features[0].geometry.coordinates;
                        lng = coordinates[0];
                        lat = coordinates[1];
                    } else {
                        const nomRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`);
                        const nomData = await nomRes.json();
                        if (nomData && nomData.length > 0) {
                            lng = parseFloat(nomData[0].lon);
                            lat = parseFloat(nomData[0].lat);
                        } else {
                            setError('Adresse introuvable. Veuillez vérifier votre saisie.');
                            setLoading(false);
                            return;
                        }
                    }
                } else if (coords) {
                    lat = coords.lat;
                    lng = coords.lng;
                } else {
                    setError('Veuillez indiquer une ville pour appliquer un filtre par rayon.');
                    setLoading(false);
                    return;
                }
            }

            const results = await searchMamaSitters({
                city: currentCity,
                postalCode: currentPostalCode,
                radius: currentRadius,
                lat,
                lng
            });
            setMamasitters(results);
        } catch (err: any) {
            setError(err.message || 'Une erreur est survenue lors de la recherche.');
        } finally {
            setLoading(false);
        }
    };

    const handleLocate = () => {
        setLocating(true);
        setError('');
        if (!navigator.geolocation) {
            setError("La géolocalisation n'est pas supportée par votre navigateur.");
            setLocating(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const newCoords = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                setUserCoords(newCoords);
                localStorage.setItem('user_coords', JSON.stringify(newCoords));
                setLocating(false);
                setCity('');
                setPostalCode('');

                const nextRadius = radius > 0 ? radius : 20;
                if (radius === 0) setRadius(20);
                performSearch({ radius: nextRadius, coords: newCoords });
            },
            () => {
                setError("Accès position refusé. Vous pouvez saisir votre ville manuellement.");
                setLocating(false);
            }
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        performSearch();
    };

    const handleContact = (sitterId: string) => {
        if (isLoggedIn) {
            window.location.hash = `#/messages?userId=${sitterId}`;
        } else {
            window.location.hash = '#/register';
        }
    };

    if (initialLoading) {
        return (
            <div className="min-h-screen bg-beige/30 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-vert" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAF7F2] relative pb-32">
            {/* Soft Ambient Backgrounds */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-vert/5 rounded-full blur-[100px] pointer-events-none -mt-40 -mr-40 z-0"></div>
            <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-sable/5 rounded-full blur-[100px] pointer-events-none -ml-40 z-0"></div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24 relative z-10">

                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur border border-sable/10 px-5 py-2 rounded-full mb-8 shadow-sm">
                        <Heart className="w-4 h-4 text-sable fill-sable/20" />
                        <span className="text-xs font-poppins font-semibold text-sable uppercase tracking-widest">Soutien Post-Partum</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-vert tracking-tight mb-6">
                        Trouvez <span className="italic font-light text-sable">l'accompagnante idéale</span>
                    </h1>

                    <p className="text-lg md:text-xl text-vert/60 font-lato max-w-2xl mx-auto leading-relaxed">
                        Des professionnelles et des mères expérimentées, sélectionnées avec soin pour vous offrir un post-partum serein.
                    </p>
                </div>

                {/* Minimalist Search Bar */}
                <div className="max-w-4xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-2 shadow-2xl shadow-vert/5 border border-white">
                        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 relative">

                            <div className="flex-1 relative group">
                                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                                    <MapPin className="h-5 w-5 text-vert/40 group-focus-within:text-vert transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="Dans quelle ville ou commune ?"
                                    className="block w-full h-16 pl-14 pr-4 bg-transparent border-none rounded-[24px] focus:ring-0 text-vert font-poppins text-lg placeholder:text-vert/30 transition-all hover:bg-vert/5 focus:bg-white"
                                />
                            </div>

                            <div className="hidden md:block w-px h-8 bg-vert/10 self-center"></div>

                            <button
                                type="button"
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center justify-center gap-2 px-6 h-16 rounded-[24px] transition-all font-poppins text-sm font-medium ${showFilters ? 'bg-beige/50 text-vert' : 'text-vert/50 hover:bg-vert/5 hover:text-vert'}`}
                            >
                                <SlidersHorizontal className="w-5 h-5" />
                                <span className="hidden md:block">Filtres</span>
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="h-16 px-10 bg-vert text-white rounded-[24px] font-poppins font-semibold tracking-wide hover:bg-vert/90 hover:shadow-lg hover:shadow-vert/20 transition-all flex items-center justify-center gap-2 flex-shrink-0"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Rechercher'}
                            </button>
                        </form>

                        {/* Extended Filters Panel */}
                        {showFilters && (
                            <div className="mt-2 p-6 md:p-8 bg-beige/30 rounded-[28px] border border-white animate-in slide-in-from-top-4 fade-in duration-300">
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-xs font-poppins font-semibold text-vert/60 uppercase tracking-wider mb-2">Code Postal</label>
                                        <input
                                            type="text"
                                            value={postalCode}
                                            onChange={(e) => setPostalCode(e.target.value)}
                                            placeholder="Ex: 75001"
                                            className="w-full px-5 py-3.5 bg-white border-none rounded-[20px] focus:ring-2 focus:ring-sable/20 text-vert font-poppins text-sm shadow-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-poppins font-semibold text-vert/60 uppercase tracking-wider mb-2">Rayon de recherche</label>
                                        <div className="relative">
                                            <select
                                                value={radius}
                                                onChange={(e) => setRadius(Number(e.target.value))}
                                                className="w-full px-5 py-3.5 bg-white border-none rounded-[20px] focus:ring-2 focus:ring-sable/20 text-vert font-poppins text-sm shadow-sm cursor-pointer appearance-none"
                                            >
                                                {RADIUS_OPTIONS.map(opt => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                            <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-vert/40 rotate-90 pointer-events-none" />
                                        </div>
                                    </div>

                                    <div className="flex items-end">
                                        <button
                                            type="button"
                                            onClick={handleLocate}
                                            disabled={locating}
                                            className={`w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-[20px] transition-all font-poppins text-sm font-semibold shadow-sm ${userCoords
                                                ? 'bg-sable text-white shadow-sable/30'
                                                : 'bg-white text-vert hover:bg-vert/5'
                                                }`}
                                        >
                                            {locating ? (
                                                <Loader2 className="w-5 h-5 animate-spin text-current" />
                                            ) : (
                                                <LocateFixed className="w-5 h-5 text-current" />
                                            )}
                                            {userCoords ? 'Position activée' : 'Autour de moi'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="mt-4 mx-4 mb-2 p-4 bg-red-50/80 backdrop-blur rounded-[20px] border border-red-100 flex items-center justify-center gap-3 animate-in zoom-in duration-300">
                                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                                <p className="text-red-600 font-poppins text-sm font-medium">{error}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Results Header */}
                {!loading && mamasitters.length > 0 && (
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <h2 className="text-2xl font-poppins font-medium text-vert">
                            <span className="font-bold">{mamasitters.length}</span> profils exceptionnels
                        </h2>
                    </div>
                )}

                {/* Results Grid - Airy & Soft Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {loading ? (
                        [...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-[40px] p-8 shadow-sm border border-vert/5 animate-pulse">
                                <div className="flex gap-6 mb-8">
                                    <div className="w-24 h-24 bg-beige/50 rounded-[30px] shrink-0"></div>
                                    <div className="flex-1 py-2">
                                        <div className="h-5 bg-beige/50 rounded-md w-3/4 mb-4"></div>
                                        <div className="h-4 bg-beige/50 rounded-md w-1/2"></div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-3 bg-beige/50 rounded w-full"></div>
                                    <div className="h-3 bg-beige/50 rounded w-full"></div>
                                    <div className="h-3 bg-beige/50 rounded w-4/5"></div>
                                </div>
                            </div>
                        ))
                    ) : mamasitters.length > 0 ? (
                        mamasitters.map((sitter: any) => (
                            <div
                                key={sitter._id}
                                onClick={() => setSelectedSitter(sitter)}
                                className="group bg-white rounded-[40px] p-8 shadow-sm hover:shadow-2xl hover:shadow-vert/10 border border-vert/5 hover:border-vert/10 transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col h-full relative overflow-hidden"
                            >
                                {/* Decorative badge background element */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-beige/30 rounded-full blur-2xl group-hover:bg-sable/10 transition-colors duration-500 pointer-events-none"></div>

                                {/* Header: Avatar + Identity */}
                                <div className="flex flex-col items-center text-center mb-6 relative z-10 w-full">
                                    <div className="relative shrink-0 mb-4">
                                        <div className="w-28 h-28 rounded-full overflow-hidden bg-beige flex items-center justify-center border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-500">
                                            {sitter.avatar ? (
                                                <img src={sitter.avatar} alt={sitter.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-4xl font-poppins font-light text-sable">{sitter.name?.charAt(0)}</span>
                                            )}
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                                            <div className="bg-green-100 rounded-full p-1.5">
                                                <ShieldCheck className="w-4 h-4 text-green-600" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0 w-full">
                                        <h3 className="text-xl font-poppins font-bold text-vert mb-2 truncate group-hover:text-sable transition-colors">{sitter.name}</h3>

                                        {/* Minimalist distance badge */}
                                        {sitter._distance !== undefined ? (
                                            <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 bg-sable/5 text-sable rounded-full">
                                                <MapPin className="w-3.5 h-3.5" />
                                                <span className="text-[10px] font-black uppercase tracking-wider whitespace-nowrap">À {sitter._distance} km</span>
                                            </div>
                                        ) : (
                                            <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 bg-vert/5 text-vert/60 rounded-full">
                                                <ShieldCheck className="w-3.5 h-3.5" />
                                                <span className="text-[10px] font-black uppercase tracking-wider">Profil vérifié</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Body : Content */}
                                <div className="flex-1 relative z-10 flex flex-col items-center text-center">
                                    {sitter.shortDescription && (
                                        <p className="text-vert font-poppins font-medium text-sm mb-3 italic line-clamp-1 w-full flex-shrink-0">
                                            "{sitter.shortDescription}"
                                        </p>
                                    )}
                                    <p className="text-vert/60 font-lato text-sm leading-relaxed line-clamp-3 mb-6 w-full">
                                        {sitter.bio || "Une accompagnante dévouée pour vous soutenir dans les premiers instants."}
                                    </p>

                                    {/* Subtle Tags */}
                                    <div className="flex flex-wrap justify-center gap-2 mb-2 w-full">
                                        {sitter.languages?.slice(0, 2).map((l: any) => (
                                            <span key={l} className="px-3 py-1 bg-[#FAF7F2] text-vert/60 text-[10px] font-poppins uppercase tracking-wider rounded-lg border border-vert/5">{l}</span>
                                        ))}
                                        {sitter.diploma && sitter.diploma !== 'Aucun diplôme spécifique' && (
                                            <span className="px-3 py-1 bg-sable/5 text-sable text-[10px] font-poppins uppercase tracking-wider rounded-lg border border-sable/10">Diplômée</span>
                                        )}
                                    </div>
                                </div>

                                {/* Footer & Action */}
                                <div className="mt-8 pt-6 border-t border-vert/5 flex items-center justify-between relative z-10">
                                    <div>
                                        <p className="text-[10px] font-poppins text-vert/40 uppercase tracking-widest mb-0.5">Tarif horaire</p>
                                        <p className="text-lg font-poppins font-bold text-vert">
                                            {sitter.hourlyRate ? `${sitter.hourlyRate}€` : 'Sur devis'}
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-beige/50 group-hover:bg-vert flex items-center justify-center transition-colors duration-300">
                                        <ChevronRight className="w-5 h-5 text-vert group-hover:text-white transition-colors" />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20">
                            <div className="max-w-md mx-auto text-center">
                                <div className="w-24 h-24 bg-white rounded-[32px] shadow-sm flex items-center justify-center mx-auto mb-6">
                                    <Search className="w-10 h-10 text-vert/30" />
                                </div>
                                <h3 className="text-2xl font-poppins font-bold text-vert mb-3">Aucune MamaSitter trouvée</h3>
                                <p className="text-vert/60 font-lato">
                                    Nous n'avons pas trouvé d'accompagnante correspondant à vos critères dans cette zone. N'hésitez pas à élargir votre rayon de recherche.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Premium Detail Modal */}
            {selectedSitter && (
                <div
                    className="fixed inset-0 bg-vert/40 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]"
                    onClick={() => setSelectedSitter(null)}
                >
                    <div
                        className="bg-[#FAF7F2] rounded-[48px] max-w-[800px] w-full max-h-[90vh] overflow-y-auto shadow-2xl relative translate-y-8 animate-[modalSlideUp_0.4s_ease-out_forwards]"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedSitter(null)}
                            className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-vert/40 hover:text-vert hover:bg-vert/5 transition-colors z-20 shadow-sm"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="relative">
                            {/* Decorative header soft background */}
                            <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-white to-transparent rounded-t-[48px]"></div>

                            <div className="relative z-10 px-8 py-12 md:px-12 md:py-16">

                                {/* Identity Block */}
                                <div className="flex flex-col items-center text-center mb-12">
                                    <div
                                        onClick={() => selectedSitter.avatar && setShowFullAvatar(true)}
                                        className={`w-32 h-32 md:w-40 md:h-40 rounded-full bg-white border-4 border-white shadow-xl flex-shrink-0 overflow-hidden relative mb-6 ${selectedSitter.avatar ? 'cursor-zoom-in' : ''}`}
                                    >
                                        {selectedSitter.avatar ? (
                                            <img src={selectedSitter.avatar} alt={selectedSitter.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-5xl font-poppins font-light text-sable absolute inset-0 flex items-center justify-center bg-beige/50">
                                                {selectedSitter.name?.charAt(0)}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex-1 w-full">
                                        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-50 rounded-full mb-4">
                                            <ShieldCheck className="w-4 h-4 text-green-600" />
                                            <span className="text-[10px] font-poppins font-bold text-green-700 uppercase tracking-widest">MamaSitter Vérifiée</span>
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-poppins font-bold text-vert mb-4 tracking-tight">{selectedSitter.name}</h2>

                                        <div className="flex flex-wrap items-center justify-center gap-6">
                                            {selectedSitter._distance !== undefined && (
                                                <div className="flex items-center justify-center gap-2 text-vert/60">
                                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                                                        <MapPin className="w-4 h-4 text-sable" />
                                                    </div>
                                                    <span className="font-lato font-medium">À {selectedSitter._distance} km de vous</span>
                                                </div>
                                            )}

                                            <div className="flex items-center justify-center gap-2 text-vert/60">
                                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                                                    <Euro className="w-4 h-4 text-sable" />
                                                </div>
                                                <span className="font-lato font-medium text-vert">
                                                    <strong className="font-bold">{selectedSitter.hourlyRate ? `${selectedSitter.hourlyRate}€` : 'Sur devis'}</strong> / heure
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-[1fr_2fr] gap-12">
                                    {/* Left Column: Metadata */}
                                    <div className="space-y-8">
                                        {/* Accroche */}
                                        {selectedSitter.shortDescription && (
                                            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-vert/5">
                                                <Sparkles className="w-5 h-5 text-sable mb-3" />
                                                <p className="font-poppins font-medium text-vert italic text-lg leading-snug">
                                                    "{selectedSitter.shortDescription}"
                                                </p>
                                            </div>
                                        )}

                                        {/* Languages */}
                                        {selectedSitter.languages?.length > 0 && (
                                            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-vert/5">
                                                <h4 className="flex items-center gap-2 text-[10px] font-poppins font-bold text-vert/40 uppercase tracking-widest mb-4">
                                                    <Globe className="w-3.5 h-3.5" /> Langues
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedSitter.languages.map((l: string) => (
                                                        <span key={l} className="px-3.5 py-1.5 bg-[#FAF7F2] text-vert/70 rounded-xl text-xs font-medium">{l}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Diploma */}
                                        {selectedSitter.diploma && selectedSitter.diploma !== 'Aucun diplôme spécifique' && (
                                            <div className="bg-sable/5 rounded-[32px] p-6 border border-sable/10">
                                                <h4 className="flex items-center gap-2 text-[10px] font-poppins font-bold text-sable/60 uppercase tracking-widest mb-3">
                                                    <GraduationCap className="w-3.5 h-3.5" /> Formation
                                                </h4>
                                                <p className="font-poppins font-semibold text-sable text-sm leading-relaxed">{selectedSitter.diploma}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right Column: Content */}
                                    <div className="space-y-10">
                                        <div>
                                            <h4 className="text-[10px] font-poppins font-bold text-vert/40 uppercase tracking-widest mb-5">Présentation détaillée</h4>
                                            <div className="prose prose-p:font-lato prose-p:text-vert/70 prose-p:leading-relaxed prose-p:text-base">
                                                <p className="whitespace-pre-line">
                                                    {selectedSitter.bio || "Cette accompagnante n'a pas encore rédigé de présentation complète. N'hésitez pas à la contacter pour faire connaissance ! 😊"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Availabilities Table */}
                                        {selectedSitter.availabilities && Object.values(selectedSitter.availabilities).some((slots: any) => slots.length > 0) && (
                                            <div>
                                                <h4 className="flex items-center gap-2 text-[10px] font-poppins font-bold text-vert/40 uppercase tracking-widest mb-5">
                                                    <Clock className="w-3.5 h-3.5" /> Disponibilités de principe
                                                </h4>
                                                <div className="bg-white rounded-[32px] p-6 shadow-sm border border-vert/5">
                                                    <div className="space-y-4">
                                                        {Object.entries(selectedSitter.availabilities)
                                                            .filter(([, slots]: any) => slots.length > 0)
                                                            .map(([day, slots]: any) => (
                                                                <div key={day} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 pb-4 border-b border-vert/5 last:border-0 last:pb-0">
                                                                    <div className="w-24 font-poppins font-semibold text-vert/80">{day}</div>
                                                                    <div className="flex flex-wrap gap-2 flex-1">
                                                                        {slots.map((s: string) => (
                                                                            <span key={s} className="px-3 py-1 bg-vert/5 text-vert/60 text-xs font-lato font-medium rounded-lg">
                                                                                {s.split(' ')[0]}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Action Bar inside Modal */}
                                <div className="mt-12 bg-white rounded-[32px] p-6 shadow-lg shadow-vert/5 border border-vert/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <div className="text-center sm:text-left">
                                        <p className="font-poppins font-bold text-vert text-lg">Prête à la rencontrer ?</p>
                                        <p className="text-sm font-lato text-vert/50 mt-1">Échangez gratuitement via notre messagerie sécurisée.</p>
                                    </div>
                                    <button
                                        onClick={() => handleContact(selectedSitter._id)}
                                        className="w-full sm:w-auto px-10 py-5 bg-vert text-white rounded-[24px] font-poppins font-bold text-sm tracking-wide hover:bg-vert/90 transition-all flex items-center justify-center gap-3 shadow-xl shadow-vert/20 hover:shadow-vert/30 hover:-translate-y-1"
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                        {isLoggedIn ? 'Envoyer un message' : 'Créer un compte pour contacter'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Sticky Floating CTA for guests */}
            {!isLoggedIn && mamasitters.length > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-2xl bg-white/90 backdrop-blur-xl border border-white p-2 rounded-[32px] shadow-2xl shadow-vert/10 z-50 flex items-center justify-between animate-[slideUp_0.6s_ease-out_forwards]">
                    <div className="pl-6 hidden sm:block">
                        <p className="font-poppins font-bold text-vert text-sm">Prête à être accompagnée ?</p>
                        <p className="text-vert/50 text-[10px] font-black uppercase tracking-widest mt-0.5">Contactez nos MamaSitters</p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <a href="#/register" className="flex-1 sm:flex-none px-6 py-4 bg-vert text-white font-poppins font-semibold text-xs tracking-wider rounded-[24px] hover:bg-vert/90 transition-colors text-center whitespace-nowrap shadow-md">
                            Créer mon compte
                        </a>
                        <a href="#/login" className="flex-1 sm:flex-none px-6 py-4 bg-beige/50 text-vert font-poppins font-semibold text-xs tracking-wider rounded-[24px] hover:bg-beige transition-colors text-center whitespace-nowrap">
                            Connexion
                        </a>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(40px) translateX(-50%); }
                    to { opacity: 1; transform: translateY(0) translateX(-50%); }
                }
                @keyframes modalSlideUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}} />
            {/* Full Portrait Lightbox */}
            {showFullAvatar && selectedSitter && selectedSitter.avatar && (
                <div
                    className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[150] flex items-center justify-center p-4 animate-in fade-in duration-300"
                    onClick={() => setShowFullAvatar(false)}
                >
                    <button
                        className="absolute top-8 right-8 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all"
                        onClick={(e) => { e.stopPropagation(); setShowFullAvatar(false); }}
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <img
                        src={selectedSitter.avatar}
                        alt={selectedSitter.name}
                        className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl animate-in zoom-in-95 duration-500"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 font-poppins text-sm italic">
                        {selectedSitter.name}
                    </div>
                </div>
            )}
        </div>
    );
}
