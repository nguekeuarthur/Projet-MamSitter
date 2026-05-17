import { useState, useEffect, useRef } from 'react';
import { Send, User, ChevronLeft, Loader2, ShieldAlert, Clock, CheckCheck } from 'lucide-react';
import { fetchMessages, sendMessage, fetchConversations, Message } from '../services/messageService';
import { getCurrentUser } from '../services/authService';

export default function Messages() {
    const [conversations, setConversations] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null);

    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const messagesCountRef = useRef(0);
    const shouldAutoScroll = useRef(true);

    useEffect(() => {
        async function init() {
            const user = await getCurrentUser();
            if (!user) {
                window.location.hash = '#/login';
                return;
            }
            setCurrentUser(user);
            await loadConversations();

            // Si un ID est passé en URL (ex: de la recherche)
            const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
            const userIdFromUrl = urlParams.get('userId');
            if (userIdFromUrl) {
                // On charge cet utilisateur pour lancer le chat
                // Dans un vrai projet on ferait un fetch de l'user par ID
                // Ici on va juste préparer l'interface
                setSelectedUser({ _id: userIdFromUrl, name: 'Nouvelle conversation' });
                loadMessages(userIdFromUrl);
            }

            setLoading(false);
        }
        init();

        // Polling pour les nouveaux messages (car pas de WebSockets ici)
        const interval = setInterval(() => {
            if (selectedUser) refreshMessages(selectedUser._id);
        }, 5000);

        return () => clearInterval(interval);
    }, [selectedUser?._id]);

    useEffect(() => {
        // Ne scroller que si de NOUVEAUX messages sont arrivés
        if (messages.length > messagesCountRef.current && shouldAutoScroll.current) {
            scrollToBottom();
        }
        messagesCountRef.current = messages.length;
    }, [messages]);

    const scrollToBottom = () => {
        const container = messagesContainerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    };

    // Détecter si l'utilisateur a scrollé vers le haut
    const handleScroll = () => {
        const container = messagesContainerRef.current;
        if (container) {
            const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
            // Si on est à moins de 100px du bas, on autorise l'auto-scroll
            shouldAutoScroll.current = distanceFromBottom < 100;
        }
    };

    const loadConversations = async () => {
        try {
            const data = await fetchConversations();
            setConversations(data);
        } catch (err) {
            console.error(err);
        }
    };

    const loadMessages = async (userId: string) => {
        try {
            const data = await fetchMessages(userId);
            setMessages(data);
        } catch (err) {
            console.error(err);
        }
    };

    const refreshMessages = async (userId: string) => {
        try {
            const data = await fetchMessages(userId);
            // Comparer avec le ref (pas le state) pour éviter les closures stale
            if (data.length !== messagesCountRef.current) {
                setMessages(data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSelectConversation = (conv: any) => {
        const otherUser = conv.lastMessage.sender === currentUser.id
            ? conv.receiverInfo[0]
            : conv.senderInfo[0];

        messagesCountRef.current = 0; // Reset pour forcer le scroll sur le nouveau chat
        setSelectedUser(otherUser);
        loadMessages(otherUser._id);
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedUser || sending) return;

        try {
            setSending(true);
            const msg = await sendMessage(selectedUser._id, newMessage);
            setMessages([...messages, msg]);
            setNewMessage('');
            loadConversations(); // Update sidebar
        } catch (err: any) {
            alert(err.message);
        } finally {
            setSending(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-beige/30">
            <Loader2 className="w-10 h-10 animate-spin text-sable" />
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:h-[calc(100vh-160px)] flex flex-col md:flex-row gap-6">
            {/* Sidebar: Conversations */}
            <div className={`flex-shrink-0 md:w-80 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col ${selectedUser ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-poppins font-bold text-gray-800">Messages</h2>
                </div>
                <div className="flex-grow overflow-y-auto p-4 space-y-2">
                    {conversations.length === 0 ? (
                        <div className="text-center py-10 px-4">
                            <p className="text-gray-400 text-sm font-lato italic">Aucune conversation pour le moment.</p>
                        </div>
                    ) : (
                        conversations.map((conv) => {
                            const otherUser = conv.lastMessage.sender === currentUser.id
                                ? conv.receiverInfo[0]
                                : conv.senderInfo[0];
                            const isUnread = !conv.lastMessage.read && conv.lastMessage.receiver === currentUser.id;

                            return (
                                <button
                                    key={conv._id.s + conv._id.r}
                                    onClick={() => handleSelectConversation(conv)}
                                    className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all ${selectedUser?._id === otherUser?._id ? 'bg-beige/50 border border-sable/20' : 'hover:bg-gray-50 border border-transparent'}`}
                                >
                                    <div className="w-12 h-12 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                                        {otherUser?.avatar ? (
                                            <img src={otherUser.avatar} className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-6 h-6 text-gray-300" />
                                        )}
                                    </div>
                                    <div className="flex-grow text-left overflow-hidden">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-poppins font-bold text-sm text-gray-800 truncate">{otherUser?.name}</span>
                                            <span className="text-[10px] text-gray-400">{new Date(conv.lastMessage.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <p className={`text-xs truncate ${isUnread ? 'font-bold text-vert' : 'text-gray-500'}`}>
                                            {conv.lastMessage.content}
                                        </p>
                                    </div>
                                </button>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`flex-grow bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden ${!selectedUser ? 'hidden md:flex items-center justify-center bg-gray-50/50' : 'flex'}`}>
                {!selectedUser ? (
                    <div className="text-center opacity-40">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-gray-300">
                            <Send className="w-8 h-8 text-gray-400 -rotate-12" />
                        </div>
                        <p className="font-poppins font-bold text-gray-800">Sélectionnez une conversation</p>
                        <p className="text-sm font-lato">Pour commencer à discuter</p>
                    </div>
                ) : (
                    <>
                        {/* Header Chat */}
                        <div className="p-4 md:p-6 border-b border-gray-100 flex items-center gap-4">
                            <button onClick={() => setSelectedUser(null)} className="md:hidden p-2 -ml-2 hover:bg-gray-50 rounded-full">
                                <ChevronLeft className="w-5 h-5 text-gray-500" />
                            </button>
                            <div className="w-10 h-10 rounded-full bg-beige flex items-center justify-center overflow-hidden">
                                {selectedUser.avatar ? (
                                    <img src={selectedUser.avatar} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-5 h-5 text-gray-300" />
                                )}
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-poppins font-bold text-gray-800 leading-none">{selectedUser.name}</h3>
                                <span className="text-[11px] text-green-500 font-bold flex items-center gap-1 mt-1 uppercase tracking-tight">
                                    <Clock className="w-3 h-3" /> Chat Sécurisé
                                </span>
                            </div>
                        </div>

                        {/* Messages List */}
                        <div ref={messagesContainerRef} onScroll={handleScroll} className="flex-grow overflow-y-auto p-4 md:p-8 space-y-6">
                            <div className="flex flex-col gap-6">
                                {messages.map((msg) => {
                                    const isMe = msg.sender === currentUser.id;
                                    return (
                                        <div key={msg._id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[85%] md:max-w-[70%] ${isMe ? 'bg-vert text-white rounded-t-2xl rounded-bl-2xl shadow-sm' : 'bg-gray-100 text-gray-800 rounded-t-2xl rounded-br-2xl'} p-4 text-sm font-lato leading-relaxed relative group`}>
                                                {msg.isFlagged && (
                                                    <div className="mb-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-orange-200">
                                                        <ShieldAlert className="w-3 h-3" /> Contenu Censuré pour votre sécurité
                                                    </div>
                                                )}
                                                {msg.content}
                                                <div className={`text-[9px] mt-2 flex items-center gap-1 ${isMe ? 'text-white/60 justify-end' : 'text-gray-400'}`}>
                                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    {isMe && <CheckCheck className={`w-3 h-3 ${msg.read ? 'text-white' : 'text-white/40'}`} />}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-100">
                            <form onSubmit={handleSend} className="flex gap-4">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Écrivez votre message ici..."
                                    className="flex-grow px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-vert focus:ring-4 focus:ring-vert/5 transition-all font-lato"
                                />
                                <button
                                    type="submit"
                                    disabled={!newMessage.trim() || sending}
                                    className="w-14 h-14 bg-vert text-white rounded-2xl shadow-lg shadow-vert/20 hover:bg-vert/90 flex items-center justify-center transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 mr-0.5" />}
                                </button>
                            </form>
                            <p className="mt-3 text-center text-[10px] text-gray-400 font-lato">
                                Pour votre sécurité, tout échange de coordonnées personnelles (téléphone, email) sera automatiquement masqué.
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
