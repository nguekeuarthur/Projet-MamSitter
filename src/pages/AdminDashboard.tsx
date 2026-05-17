import { useState, useEffect } from 'react';
import {
    CheckCircle, XCircle, Eye, EyeOff, Loader2, ShieldCheck, Mail, MapPin,
    UserCheck, AlertTriangle, Ban, History, Search, Receipt, Banknote, Save, ChevronRight, MessageSquareWarning, Copy, Check, Download, Zap
} from 'lucide-react';
import {
    fetchPendingSitters, approveSitter, fetchAllSitters, banUser, adminUpdateUser, fetchUserBankDetails
} from '../services/userService';
import { fetchFlaggedMessages } from '../services/messageService';
import { fetchAllBookings } from '../services/bookingService';
import { getCurrentUser } from '../services/authService';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'pending' | 'all' | 'flagged' | 'transactions' | 'blacklist'>('pending');
    const [sitters, setSitters] = useState<any[]>([]);
    const [allSitters, setAllSitters] = useState<any[]>([]);
    const [flaggedMessages, setFlaggedMessages] = useState<any[]>([]);
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const [selectedIdCard, setSelectedIdCard] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingRib, setEditingRib] = useState<string | null>(null);
    const [ribValue, setRibValue] = useState('');
    const [revealedRibs, setRevealedRibs] = useState<{ [key: string]: string }>({});
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [payoutModal, setPayoutModal] = useState<{
        isOpen: boolean;
        booking: any | null;
    }>({ isOpen: false, booking: null });

    const toggleRib = async (userId: string) => {
        if (revealedRibs[userId]) {
            const newRevealed = { ...revealedRibs };
            delete newRevealed[userId];
            setRevealedRibs(newRevealed);
        } else {
            try {
                const data = await fetchUserBankDetails(userId);
                setRevealedRibs(prev => ({ ...prev, [userId]: data.rib || 'Non renseigné' }));
            } catch (err) {
                setMessage('Erreur lors de la récupération du RIB sécurisé.');
            }
        }
    };

    const copyRibToClipboard = async (userId: string) => {
        try {
            let rib = revealedRibs[userId];
            if (!rib) {
                const data = await fetchUserBankDetails(userId);
                rib = data.rib;
                setRevealedRibs(prev => ({ ...prev, [userId]: rib || 'Non renseigné' }));
            }
            if (rib) {
                await navigator.clipboard.writeText(rib);
                setCopiedId(userId);
                setTimeout(() => setCopiedId(null), 2000);
            }
        } catch (err) {
            setMessage('Erreur lors de la copie du RIB.');
        }
    };

    const openPayoutModal = async (booking: any) => {
        const sitterId = booking.sitterId?._id;
        if (sitterId && !revealedRibs[sitterId]) {
            try {
                const data = await fetchUserBankDetails(sitterId);
                setRevealedRibs(prev => ({ ...prev, [sitterId]: data.rib || 'Non renseigné' }));
            } catch (err) {
                console.error("Erreur auto-fetch RIB");
            }
        }
        setPayoutModal({ isOpen: true, booking });
    };

    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean,
        type: 'approve' | 'ban' | 'unban',
        userId: string | null,
        userName: string | null
    }>({
        isOpen: false,
        type: 'approve',
        userId: null,
        userName: null
    });

    useEffect(() => {
        async function init() {
            const user = await getCurrentUser();
            if (!user || user.role !== 'Admin') {
                window.location.hash = '#/';
                return;
            }
            loadData();
        }
        init();
    }, [activeTab]);

    async function loadData() {
        try {
            setLoading(true);
            if (activeTab === 'pending') {
                const data = await fetchPendingSitters();
                setSitters(data);
            } else if (activeTab === 'all' || activeTab === 'blacklist') {
                const data = await fetchAllSitters();
                setAllSitters(data);
            } else if (activeTab === 'flagged') {
                const data = await fetchFlaggedMessages();
                setFlaggedMessages(data);
            } else if (activeTab === 'transactions') {
                const data = await fetchAllBookings();
                setBookings(data);
            }
        } catch (err) {
            setMessage('Erreur lors du chargement des données.');
        } finally {
            setLoading(false);
        }
    }

    const exportTransactionsCSV = () => {
        const paidBookings = bookings.filter((b: any) => b.status === 'paid');
        if (paidBookings.length === 0) return;
        const headers = 'Date,Maman,MamaSitter,Forfait,Montant Total,Commission Admin,Part Sitter,Devise,Statut,ID Stripe';
        const rows = paidBookings.map((b: any) => {
            const date = new Date(b.createdAt).toLocaleDateString('fr-FR');
            return `${date},"${b.mamanId?.name || ''}","${b.sitterId?.name || ''}","${b.packageName}",${b.amount},${b.splitAdminAmount?.toFixed(2)},${b.splitSitterAmount?.toFixed(2)},${b.currency},${b.status},${b.paymentIntentId || b.stripeSessionId || ''}`;
        });
        const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows.join('\n')}`;
        const link = document.createElement('a');
        link.setAttribute('href', encodeURI(csvContent));
        link.setAttribute('download', `transactions_mamsitter_${new Date().toISOString().slice(0, 7)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleAction = (type: 'approve' | 'ban' | 'unban', userId: string, name: string) => {
        setConfirmModal({
            isOpen: true,
            type,
            userId,
            userName: name
        });
    };

    async function executeConfirmAction() {
        if (!confirmModal.userId) return;
        const { userId, type } = confirmModal;
        setConfirmModal({ ...confirmModal, isOpen: false });

        try {
            setActionLoading(userId);
            if (type === 'approve') {
                await approveSitter(userId, true);
                setMessage('MamaSitter approuvée avec succès.');
                setSitters(sitters.filter(s => s._id !== userId));
            } else if (type === 'ban') {
                await banUser(userId, true);
                setMessage('Utilisateur banni avec succès.');
                loadData();
            } else if (type === 'unban') {
                await banUser(userId, false);
                setMessage('Utilisateur réactivé avec succès.');
                loadData();
            }
        } catch (err) {
            setMessage('Une erreur est survenue.');
        } finally {
            setActionLoading(null);
        }
    }

    const filteredAllSitters = allSitters.filter(s =>
        (activeTab === 'blacklist' ? s.isBanned : !s.isBanned) &&
        (s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-sable" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-poppins font-bold text-gray-800 flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-vert" />
                        Espace Modération
                    </h1>
                    <p className="text-gray-500 font-lato mt-1 text-lg">
                        Gérez la sécurité et la communauté MamSitter
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto no-scrollbar">
                    {[
                        { id: 'pending', label: 'En attente', icon: History, count: sitters.length },
                        { id: 'all', label: 'Communauté', icon: UserCheck },
                        { id: 'blacklist', label: 'Blacklist', icon: AlertTriangle, count: allSitters.filter(s => s.isBanned).length },
                        { id: 'flagged', label: 'Signalements', icon: MessageSquareWarning, count: flaggedMessages.length },
                        { id: 'transactions', label: 'Finance', icon: Receipt },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-poppins font-bold text-sm transition-all whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-vert text-white shadow-md'
                                : 'text-gray-400 hover:text-vert hover:bg-vert/5'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                            {tab.count !== undefined && tab.count > 0 && (
                                <span className={`ml-1 px-2 py-0.5 rounded-full text-[10px] ${activeTab === tab.id ? 'bg-white text-vert' : 'bg-vert/10 text-vert'}`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {message && (
                <div className="mb-8 p-4 bg-white border-l-4 border-vert rounded-r-xl shadow-sm flex items-center justify-between animate-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-vert" />
                        <span className="text-gray-700 font-lato font-semibold">{message}</span>
                    </div>
                    <button onClick={() => setMessage('')} className="text-gray-400 hover:text-gray-600">
                        <XCircle className="w-5 h-5" />
                    </button>
                </div>
            )}

            {/* --- Tab: PENDING SITTERS --- */}
            {activeTab === 'pending' && (
                <div className="space-y-6">
                    {sitters.length === 0 ? (
                        <EmptyState icon={UserCheck} title="Tout est à jour !" text="Aucune nouvelle MamaSitter en attente de validation." />
                    ) : (
                        sitters.map((sitter) => (
                            <SitterCard
                                key={sitter._id}
                                sitter={sitter}
                                onViewId={() => setSelectedIdCard(sitter.idCard)}
                                onApprove={() => handleAction('approve', sitter._id, sitter.name)}
                                actionLoading={actionLoading === sitter._id}
                            />
                        ))
                    )}
                </div>
            )}

            {/* --- Tab: ALL SITTERS / COMMUNITY --- */}
            {activeTab === 'all' && (
                <div className="space-y-6">
                    <div className="relative max-w-md mx-auto mb-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Rechercher une sitter par nom ou email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-vert/20 font-lato"
                        />
                    </div>

                    <div className="grid gap-4">
                        {filteredAllSitters.map((sitter) => (
                            <div key={sitter._id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold overflow-hidden ${sitter.isBanned ? 'bg-red-50 text-red-300' : 'bg-beige text-sable'}`}>
                                        {sitter.avatar ? <img src={sitter.avatar} className="w-full h-full object-cover" /> : sitter.name[0]}
                                    </div>
                                    <div>
                                        <h4 className="font-poppins font-bold text-gray-800 flex items-center gap-2">
                                            {sitter.name}
                                            {sitter.isBanned && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full uppercase tracking-wider">Banni</span>}
                                            {!sitter.isApproved && <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full uppercase tracking-wider">En attente</span>}
                                        </h4>
                                        <p className="text-sm text-gray-400 font-lato">{sitter.email} • {sitter.role} • {sitter.city || 'Ville non renseignée'}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col md:items-end gap-2">
                                    <div className="flex items-center gap-3">
                                        {editingRib === sitter._id ? (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={ribValue}
                                                    onChange={(e) => setRibValue(e.target.value)}
                                                    className="text-xs border rounded px-2 py-1 font-mono focus:border-sable outline-none"
                                                    placeholder="Nouveau RIB/IBAN"
                                                />
                                                <button
                                                    onClick={async () => {
                                                        await adminUpdateUser(sitter._id, { rib: ribValue });
                                                        setEditingRib(null);
                                                        loadData();
                                                        setMessage('RIB mis à jour avec succès.');
                                                    }}
                                                    className="p-1.5 bg-vert text-white rounded-lg"><Save className="w-3 h-3" /></button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-xs">
                                                <span className="text-gray-400 uppercase font-bold tracking-tighter">RIB:</span>
                                                <span className="font-mono text-gray-600 bg-gray-50 px-2 py-0.5 rounded select-all">
                                                    {revealedRibs[sitter._id] || '•••• •••• •••• ••••'}
                                                </span>
                                                <button
                                                    onClick={() => toggleRib(sitter._id)}
                                                    className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-sable transition-colors"
                                                >
                                                    {revealedRibs[sitter._id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                                </button>
                                                <button
                                                    onClick={() => copyRibToClipboard(sitter._id)}
                                                    className={`p-1 rounded transition-all ${copiedId === sitter._id ? 'text-green-500 bg-green-50' : 'text-gray-400 hover:text-sable hover:bg-gray-100'}`}
                                                    title="Copier le RIB"
                                                >
                                                    {copiedId === sitter._id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setEditingRib(sitter._id);
                                                        setRibValue(revealedRibs[sitter._id] || '');
                                                    }}
                                                    className="text-sable hover:underline font-bold ml-1">Modifier</button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        {sitter.isBanned ? (
                                            <button
                                                onClick={() => handleAction('unban', sitter._id, sitter.name)}
                                                className="px-4 py-2 bg-green-50 text-green-500 rounded-xl font-bold text-xs" title="Réactiver">
                                                Réactiver le compte
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleAction('ban', sitter._id, sitter.name)}
                                                className="px-4 py-2 bg-red-50 text-red-400 rounded-xl font-bold text-xs opacity-0 group-hover:opacity-100 transition-all" title="Bannir">
                                                Bannir
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --- Tab: TRANSACTIONS --- */}
            {activeTab === 'transactions' && (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-[32px] border border-gray-100 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                                <Banknote className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">Volume Total (Payé)</h3>
                                <p className="text-gray-400 text-sm">{bookings.filter(b => b.status === 'paid').length} transactions confirmées</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <div className="text-2xl font-black text-vert">
                                    {bookings.filter(b => b.status === 'paid').reduce((acc, b) => acc + b.amount, 0).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                                </div>
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Commission plateforme : {bookings.filter(b => b.status === 'paid').reduce((acc, b) => acc + (b.splitAdminAmount || 0), 0).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €</p>
                            </div>
                            <button
                                onClick={exportTransactionsCSV}
                                className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl border border-gray-100 text-gray-500 hover:text-vert transition-all"
                                title="Exporter l'historique en CSV"
                            >
                                <Download className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {bookings.length === 0 ? (
                            <EmptyState icon={Receipt} title="Aucune transaction" text="Les premiers paiements apparaîtront ici." />
                        ) : (
                            [...bookings].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((booking) => (
                                <div key={booking._id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-md transition-all">
                                    <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-beige rounded-full flex items-center justify-center text-sable font-bold">
                                                {booking.mamanId?.name?.[0]}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800">{booking.mamanId?.name}</div>
                                                <div className="text-xs text-gray-400">Forfait <span className="text-sable font-bold">{booking.packageName}</span> • {new Date(booking.createdAt).toLocaleDateString('fr-FR')}</div>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-gray-200 hidden md:block" />
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-vert/5 flex items-center justify-center text-vert text-[10px] font-bold">
                                                    MS
                                                </div>
                                                <div className="text-sm font-medium text-gray-700">{booking.sitterId?.name}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <div className="font-black text-gray-800">{booking.amount}{booking.currency === 'EUR' ? '€' : 'CHF'}</div>
                                                <div className="text-[10px] text-gray-400 font-bold">Admin: {booking.splitAdminAmount?.toFixed(2)}€</div>
                                                <div className="text-xs text-sable font-black mt-1 bg-sable/5 px-2 py-1 rounded-lg">
                                                    Sitter: {booking.splitSitterAmount?.toFixed(2)}€
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${booking.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                                    {booking.status === 'paid' ? 'Payé' : 'En attente'}
                                                </div>
                                                {booking.status === 'paid' && booking.sitterId?.stripeAccountId && (
                                                    <div className="flex items-center gap-1 text-[9px] font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md">
                                                        <Zap className="w-2.5 h-2.5" />
                                                        Stripe Connect
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {booking.status === 'paid' && (
                                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex flex-wrap items-center gap-x-12 gap-y-2">
                                            <div className="text-xs">
                                                <span className="text-gray-400 mr-2 uppercase tracking-tighter font-bold">ID Transaction:</span>
                                                <span className="text-gray-500 font-mono">{booking.paymentIntentId || booking.stripeSessionId}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )))}
                    </div>
                </div>
            )}

            {/* --- Tab: BLACKLIST --- */}
            {activeTab === 'blacklist' && (
                <div className="space-y-6">
                    <div className="relative max-w-md mx-auto mb-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Rechercher dans la liste noire..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-white border border-red-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-200 font-lato"
                        />
                    </div>

                    <div className="grid gap-4">
                        {filteredAllSitters.length === 0 ? (
                            <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                                <ShieldCheck className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                                <h3 className="text-xl font-bold font-poppins text-gray-800">Blacklist vide</h3>
                                <p className="text-gray-400 font-lato">Aucun utilisateur n'est banni actuellement.</p>
                            </div>
                        ) : (
                            filteredAllSitters.map((sitter) => (
                                <div key={sitter._id} className="bg-red-50/30 p-6 rounded-3xl border border-red-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center font-bold text-red-500 overflow-hidden">
                                            {sitter.avatar ? <img src={sitter.avatar} className="w-full h-full object-cover opacity-50" /> : sitter.name[0]}
                                        </div>
                                        <div>
                                            <h4 className="font-poppins font-bold text-gray-800 flex items-center gap-2">
                                                {sitter.name}
                                                <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Banni</span>
                                            </h4>
                                            <p className="text-sm text-gray-500 font-lato">{sitter.email} • {sitter.role} • {sitter.city || 'Ville non renseignée'}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleAction('unban', sitter._id, sitter.name)}
                                        className="px-6 py-2 bg-white text-vert border border-vert/20 rounded-xl font-bold text-xs hover:bg-vert hover:text-white transition-all shadow-sm"
                                    >
                                        Réintégrer dans la communauté
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* --- Tab: FLAGGED MESSAGES --- */}
            {activeTab === 'flagged' && (
                <div className="space-y-6">
                    {flaggedMessages.length === 0 ? (
                        <EmptyState icon={MessageSquareWarning} title="Aucun signalement" text="Aucun message suspect détecté pour le moment." />
                    ) : (
                        <div className="grid gap-4">
                            {flaggedMessages.map((msg: any) => (
                                <div key={msg._id} className="bg-white rounded-3xl border border-red-100 overflow-hidden hover:shadow-md transition-all">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between gap-4 mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-500 font-bold text-sm">
                                                    {msg.sender?.name?.[0] || '?'}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-800 text-sm">{msg.sender?.name || 'Inconnu'}</div>
                                                    <div className="text-[10px] text-gray-400">{msg.sender?.email} • {msg.sender?.role}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <ChevronRight className="w-4 h-4 text-gray-300" />
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold text-xs">
                                                        {msg.receiver?.name?.[0] || '?'}
                                                    </div>
                                                    <div className="text-sm text-gray-600">{msg.receiver?.name || 'Inconnu'}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-red-50/50 border border-red-100 rounded-2xl p-4 mb-3">
                                            <p className="text-gray-700 font-lato text-sm leading-relaxed">{msg.content}</p>
                                        </div>

                                        {msg.originalContent && msg.originalContent !== msg.content && (
                                            <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 mb-3">
                                                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Message original</p>
                                                <p className="text-gray-500 font-lato text-xs italic">{msg.originalContent}</p>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                                                    <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Contenu suspect</span>
                                                </div>
                                                <button
                                                    onClick={() => handleAction('ban', msg.sender?._id, msg.sender?.name)}
                                                    className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-red-600 hover:text-white transition-all"
                                                >
                                                    Bannir l'expéditeur
                                                </button>
                                            </div>
                                            <span className="text-[10px] text-gray-400">{new Date(msg.createdAt).toLocaleString('fr-FR')}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Modal - Pièce d'identité */}
            {selectedIdCard && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-lg font-poppins font-bold text-gray-800">Vérification de la pièce d'identité</h3>
                            <button onClick={() => setSelectedIdCard(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <XCircle className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>
                        <div className="flex-grow overflow-auto p-4 bg-gray-100 flex items-center justify-center">
                            {selectedIdCard.startsWith('data:image') || selectedIdCard.startsWith('http') ? (
                                <img src={selectedIdCard} alt="ID Document" className="max-w-full h-auto rounded-lg shadow-sm" />
                            ) : (
                                <div className="p-10 text-center">
                                    <p className="text-gray-500 mb-4">Format de fichier non pris en charge pour l'aperçu direct.</p>
                                    <a href={selectedIdCard} download="ID_Document" className="px-6 py-3 bg-sable text-white rounded-xl font-bold">Télécharger le document</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Modal - Confirmation Action (Ban/Approve) */}
            {confirmModal.isOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-[40px] max-w-md w-full p-8 md:p-10 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-210">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${confirmModal.type === 'approve' ? 'bg-vert/10 text-vert' : 'bg-red-50 text-red-500'
                            }`}>
                            {confirmModal.type === 'approve' ? <AlertTriangle className="w-10 h-10 text-vert" /> : <Ban className="w-10 h-10" />}
                        </div>

                        <h3 className="text-2xl font-poppins font-bold text-gray-800 text-center mb-4">
                            {confirmModal.type === 'approve' ? `Approuver ${confirmModal.userName} ?` :
                                confirmModal.type === 'ban' ? `Bannir ${confirmModal.userName} ?` : `Réactiver ${confirmModal.userName} ?`}
                        </h3>

                        <p className="text-gray-500 font-lato text-center leading-relaxed mb-8">
                            {confirmModal.type === 'approve' ? "En validant ce profil, cette MamaSitter sera immédiatement visible et pourra travailler." :
                                confirmModal.type === 'ban' ? "L'utilisateur ne pourra plus se connecter à la plateforme. Ses messages resteront visibles pour l'admin." :
                                    "L'utilisateur retrouvera l'accès à son compte et ses fonctionnalités."}
                        </p>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={executeConfirmAction}
                                className={`w-full py-4 font-poppins font-bold rounded-2xl shadow-lg transition-all active:scale-95 ${confirmModal.type === 'approve' ? 'bg-vert text-white shadow-vert/20' :
                                    confirmModal.type === 'ban' ? 'bg-red-500 text-white shadow-red-200' : 'bg-green-500 text-white shadow-green-200'
                                    }`}
                            >
                                Confirmer l'action
                            </button>
                            <button
                                onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                                className="w-full py-4 bg-gray-50 text-gray-400 font-poppins font-bold rounded-2xl hover:bg-gray-100 transition-all"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal - Virement Direct */}
            {payoutModal.isOpen && payoutModal.booking && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-[40px] max-w-lg w-full p-8 md:p-10 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-210">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-poppins font-bold text-gray-800">Finaliser le Virement</h3>
                            <button onClick={() => setPayoutModal({ isOpen: false, booking: null })} className="p-2 hover:bg-gray-100 rounded-full">
                                <XCircle className="w-6 h-6 text-gray-300" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Recap Montant */}
                            <div className="bg-sable/5 p-6 rounded-3xl border border-sable/10 text-center">
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Montant Net à Reverser</p>
                                <div className="text-4xl font-black text-sable">
                                    {(payoutModal.booking.splitSitterAmount)?.toFixed(2)} €
                                </div>
                            </div>

                            {/* Infos Destinataire */}
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2">Bénéficiaire</label>
                                    <div className="mt-1 w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 text-gray-700 font-bold flex items-center gap-3">
                                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[10px] shadow-sm">MS</div>
                                        {payoutModal.booking.sitterId?.name}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2">IBAN / RIB de destination</label>
                                    <div className="mt-1 w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between group">
                                        <span className="font-mono text-sm text-gray-600 tracking-wider">
                                            {revealedRibs[payoutModal.booking.sitterId?._id] || "Veuillez copier le RIB d'abord"}
                                        </span>
                                        <button
                                            onClick={() => copyRibToClipboard(payoutModal.booking.sitterId?._id)}
                                            className="text-sable opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <Copy className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2">Libellé du virement</label>
                                    <div className="mt-1 w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 text-gray-500 italic text-sm">
                                        MamSitter - Forfait {payoutModal.booking.packageName} - ID {payoutModal.booking._id.slice(-6)}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-4 space-y-3">
                                <button
                                    onClick={() => {
                                        alert("Ceci lancerait l'API de virement (Wise/Qonto) avec l'IBAN pré-rempli.");
                                        setPayoutModal({ isOpen: false, booking: null });
                                        setMessage("Virement exécuté avec succès via API (Simulation).");
                                    }}
                                    className="w-full py-5 bg-vert text-white font-poppins font-bold rounded-2xl shadow-xl shadow-vert/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                                >
                                    <Banknote className="w-5 h-5" />
                                    Lancer le virement maintenant
                                </button>

                                <button
                                    onClick={() => {
                                        // Logique d'export CSV
                                        const csvContent = `data:text/csv;charset=utf-8,Nom,IBAN,Montant,Libellé\n${payoutModal.booking.sitterId?.name},${revealedRibs[payoutModal.booking.sitterId?._id] || 'N/A'},${payoutModal.booking.splitSitterAmount},"MamSitter - ${payoutModal.booking.packageName}"`;
                                        const encodedUri = encodeURI(csvContent);
                                        const link = document.createElement("a");
                                        link.setAttribute("href", encodedUri);
                                        link.setAttribute("download", `virement_${payoutModal.booking.sitterId?.name}.csv`);
                                        document.body.appendChild(link);
                                        link.click();
                                    }}
                                    className="w-full py-4 bg-white text-gray-400 font-poppins font-bold rounded-2xl border border-gray-100 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 text-sm"
                                >
                                    <Save className="w-4 h-4" />
                                    Exporter pour ma banque (.CSV)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Sub-components
function EmptyState({ icon: Icon, title, text }: any) {
    return (
        <div className="bg-white rounded-[40px] p-20 text-center border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-xl font-poppins font-bold text-gray-800">{title}</h2>
            <p className="text-gray-500 font-lato mt-2">{text}</p>
        </div>
    );
}

function SitterCard({ sitter, onViewId, onApprove, actionLoading }: any) {
    return (
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-beige flex-shrink-0">
                        {sitter.avatar ? (
                            <img src={sitter.avatar} alt={sitter.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-xl font-bold text-sable">
                                {sitter.name?.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-xl font-poppins font-bold text-gray-800">{sitter.name}</h3>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-400 font-lato">
                            <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-gray-300" /> {sitter.email}</span>
                            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gray-300" /> {sitter.city}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button onClick={onViewId} className="flex-1 md:flex-none px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-600 font-poppins font-bold rounded-xl transition-colors border border-gray-100 flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" /> Voir ID
                    </button>
                    <button onClick={onApprove} disabled={actionLoading} className="flex-1 md:flex-none px-6 py-3 bg-vert text-white font-poppins font-bold rounded-xl shadow-lg shadow-vert/10 hover:shadow-vert/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
                        {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                        Approuver
                    </button>
                </div>
            </div>
            <div className="px-8 pb-8">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100/50">
                    <p className="text-gray-600 font-lato text-sm italic">"{sitter.bio || 'Aucune biographie.'}"</p>
                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center text-sm font-bold text-gray-700">
                        Tarif : {sitter.hourlyRate}€/h
                    </div>
                </div>
            </div>
        </div>
    );
}
