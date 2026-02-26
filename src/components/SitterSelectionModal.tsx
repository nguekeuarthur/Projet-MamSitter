import { useEffect, useState } from 'react';
import { X, Search, MapPin, Star, Loader2 } from 'lucide-react';
import { searchMamaSitters, MamaSitter } from '../services/userService';
import { createCheckoutSession } from '../services/bookingService';

interface SitterSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    pkg: {
        name: string;
        priceEUR: string;
        priceCHF: string;
    };
    currency: 'EUR' | 'CHF';
}

export default function SitterSelectionModal({ isOpen, onClose, pkg, currency }: SitterSelectionModalProps) {
    const [sitters, setSitters] = useState<MamaSitter[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSitter, setSelectedSitter] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            loadSitters();
        }
    }, [isOpen]);

    const loadSitters = async () => {
        setLoading(true);
        try {
            const data = await searchMamaSitters({});
            // On ne garde que les sitters approuvées
            setSitters(data.filter((s: any) => s.isApproved && !s.isBanned));
        } catch (err: any) {
            setError(err.message || 'Impossible de charger les MamaSitters');
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmBooking = async () => {
        if (!selectedSitter) return;
        setIsProcessing(true);
        setError('');
        try {
            const amount = currency === 'EUR' ? parseFloat(pkg.priceEUR) : parseFloat(pkg.priceCHF);
            const { url } = await createCheckoutSession({
                sitterId: selectedSitter,
                packageName: pkg.name,
                amount,
                currency
            });

            // Redirection vers Stripe
            window.location.href = url;
        } catch (err: any) {
            setError(err.message || 'Erreur lors de la redirection vers le paiement');
            setIsProcessing(false);
        }
    };

    if (!isOpen) return null;

    const filteredSitters = sitters.filter(sitter =>
        sitter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sitter.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-vert/20 backdrop-blur-md" onClick={onClose}></div>

            <div className="relative bg-[#FAF7F2] w-full max-w-2xl max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col border border-white">
                {/* Header */}
                <div className="p-8 border-b border-sable/10 flex items-center justify-between bg-white/50">
                    <div>
                        <h2 className="text-2xl font-bold text-vert font-poppins">Choisissez votre MamaSitter</h2>
                        <p className="text-sm text-vert/60 font-poppins">Pour votre forfait <span className="text-sable font-bold">{pkg.name}</span></p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-beige rounded-full transition-colors">
                        <X className="w-6 h-6 text-vert" />
                    </button>
                </div>

                {/* Search */}
                <div className="p-6 bg-white/30">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher par nom ou ville..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-sable/10 focus:outline-none focus:ring-2 focus:ring-sable/20 font-poppins text-sm shadow-sm"
                        />
                        <Search className="absolute left-4 top-4 w-5 h-5 text-sable" />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-grow overflow-y-auto p-6 space-y-4">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="w-10 h-10 animate-spin text-sable" />
                            <p className="text-vert/40 font-bold uppercase tracking-widest text-xs">Chargement des profils...</p>
                        </div>
                    ) : filteredSitters.length > 0 ? (
                        filteredSitters.map((sitter) => (
                            <div
                                key={sitter._id}
                                onClick={() => setSelectedSitter(sitter._id)}
                                className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex items-center gap-6 group ${selectedSitter === sitter._id
                                    ? 'border-sable bg-white shadow-xl shadow-sable/5 scale-[1.02]'
                                    : 'border-transparent bg-white/40 hover:border-sable/20 hover:bg-white'
                                    }`}
                            >
                                <div className="w-16 h-16 rounded-full bg-sable/10 shrink-0 overflow-hidden border-2 border-white">
                                    {sitter.avatar ? (
                                        <img src={sitter.avatar} alt={sitter.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-sable font-bold text-xl uppercase">
                                            {sitter.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-bold text-vert font-poppins text-lg group-hover:text-sable transition-colors">{sitter.name}</h4>
                                    <div className="flex items-center gap-4 mt-1">
                                        <div className="flex items-center text-xs text-vert/40 font-bold uppercase tracking-tighter">
                                            <MapPin className="w-3 h-3 mr-1 text-sable" />
                                            {sitter.city}
                                        </div>
                                        <div className="flex items-center text-xs text-sable font-black bg-sable/5 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                            <Star className="w-3 h-3 mr-1 fill-sable" />
                                            Vérifiée
                                        </div>
                                    </div>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedSitter === sitter._id ? 'border-sable bg-sable' : 'border-sable/20'
                                    }`}>
                                    {selectedSitter === sitter._id && <div className="w-2 h-2 rounded-full bg-white"></div>}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-vert/40 font-poppins">Aucune MamaSitter ne correspond à votre recherche.</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-8 border-t border-sable/10 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
                    {error && (
                        <p className="text-red-500 text-xs font-bold uppercase mb-4 text-center tracking-wide">{error}</p>
                    )}
                    <button
                        disabled={!selectedSitter || isProcessing}
                        onClick={handleConfirmBooking}
                        className={`w-full py-5 rounded-2xl font-bold text-lg uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-3 ${selectedSitter && !isProcessing
                            ? 'bg-vert text-white hover:bg-vert/90 hover:scale-[1.02] shadow-vert/10'
                            : 'bg-vert/20 text-vert/40 cursor-not-allowed'
                            }`}
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Redirection...
                            </>
                        ) : (
                            `Confirmer & Payer ${currency === 'EUR' ? pkg.priceEUR + '€' : 'CHF ' + pkg.priceCHF}`
                        )}
                    </button>
                    <p className="text-center text-[10px] text-vert/40 mt-4 font-bold uppercase tracking-widest">
                        Paiement sécurisé via Stripe • 27% Admin / 73% MamaSitter
                    </p>
                </div>
            </div>
        </div>
    );
}
