import { useState, useEffect } from 'react';
import {
    CheckCircle, XCircle, Eye, Loader2, ShieldCheck, Mail, MapPin,
    UserCheck, AlertTriangle, Ban, Unlock, MessageSquareWarning,
    ShieldAlert, UserX, History, Search
} from 'lucide-react';
import {
    fetchPendingSitters, approveSitter, fetchAllSitters, banUser
} from '../services/userService';
import { fetchFlaggedMessages } from '../services/messageService';
import { getCurrentUser } from '../services/authService';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'pending' | 'all' | 'flagged'>('pending');
    const [sitters, setSitters] = useState<any[]>([]);
    const [allSitters, setAllSitters] = useState<any[]>([]);
    const [flaggedMessages, setFlaggedMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const [selectedIdCard, setSelectedIdCard] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

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
            } else if (activeTab === 'all') {
                const data = await fetchAllSitters();
                setAllSitters(data);
            } else if (activeTab === 'flagged') {
                const data = await fetchFlaggedMessages();
                setFlaggedMessages(data);
            }
        } catch (err) {
            setMessage('Erreur lors du chargement des données.');
        } finally {
            setLoading(false);
        }
    }

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
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
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
                        { id: 'flagged', label: 'Signalements', icon: MessageSquareWarning, count: flaggedMessages.length }
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
                            <div key={sitter._id} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold overflow-hidden ${sitter.isBanned ? 'bg-red-50 text-red-300' : 'bg-beige text-sable'}`}>
                                        {sitter.avatar ? <img src={sitter.avatar} className="w-full h-full object-cover" /> : sitter.name[0]}
                                    </div>
                                    <div>
                                        <h4 className="font-poppins font-bold text-gray-800 flex items-center gap-2">
                                            {sitter.name}
                                            {sitter.isBanned && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full uppercase tracking-wider">Banni</span>}
                                            {!sitter.isApproved && <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full uppercase tracking-wider">En attente</span>}
                                        </h4>
                                        <p className="text-sm text-gray-400 font-lato">{sitter.email} • {sitter.city}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {sitter.isBanned ? (
                                        <button
                                            onClick={() => handleAction('unban', sitter._id, sitter.name)}
                                            className="p-3 text-green-500 hover:bg-green-50 rounded-xl transition-colors" title="Réactiver">
                                            <Unlock className="w-5 h-5" />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleAction('ban', sitter._id, sitter.name)}
                                            className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition-colors opacity-0 group-hover:opacity-100" title="Bannir">
                                            <Ban className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --- Tab: FLAGGED MESSAGES --- */}
            {activeTab === 'flagged' && (
                <div className="space-y-6">
                    {flaggedMessages.length === 0 ? (
                        <EmptyState icon={ShieldAlert} title="Aucun signalement" text="Toutes les conversations sont conformes aux règles." />
                    ) : (
                        <div className="grid gap-6">
                            {flaggedMessages.map((msg) => (
                                <div key={msg._id} className="bg-white rounded-3xl border-2 border-orange-100 overflow-hidden">
                                    <div className="bg-orange-50 px-6 py-4 border-b border-orange-100 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-orange-700 font-bold">
                                            <ShieldAlert className="w-5 h-5" />
                                            Tentative d'échange de coordonnées détectée
                                        </div>
                                        <span className="text-xs text-orange-400 font-lato">{new Date(msg.createdAt).toLocaleString()}</span>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex flex-col md:flex-row gap-8 mb-6">
                                            <div className="flex-1">
                                                <span className="block text-[10px] uppercase font-black text-gray-400 mb-2 tracking-widest">Expéditeur</span>
                                                <div className="flex items-center gap-3">
                                                    <div className="text-sm font-bold text-gray-800">{msg.sender.name}</div>
                                                    <div className="text-xs text-gray-400">({msg.sender.role})</div>
                                                </div>
                                                <button
                                                    onClick={() => handleAction('ban', msg.sender._id, msg.sender.name)}
                                                    className="mt-3 text-xs text-red-500 font-bold flex items-center gap-1 hover:underline">
                                                    <UserX className="w-3 h-3" /> Bannir l'expéditeur
                                                </button>
                                            </div>
                                            <div className="flex-1">
                                                <span className="block text-[10px] uppercase font-black text-gray-400 mb-2 tracking-widest">Message Bloqué</span>
                                                <div className="p-4 bg-gray-50 rounded-2xl text-gray-600 font-lato italic text-sm">
                                                    "{msg.originalContent}"
                                                </div>
                                            </div>
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
