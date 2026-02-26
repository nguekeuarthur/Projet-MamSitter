import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        // Simulation d'envoi
        setTimeout(() => { setStatus('success') }, 1000);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-bold text-vert font-poppins mb-6 uppercase tracking-wide">
                    Contactez-nous
                </h1>
                <p className="text-xl text-gray-600 font-lato max-w-2xl mx-auto leading-relaxed">
                    Une question sur nos forfaits ? Vous souhaitez devenir MamaSitter ou
                    proposer un partenariat ? Notre équipe vous répond rapidement.
                </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg border border-beige flex flex-col md:flex-row overflow-hidden">

                {/* Informations */}
                <div className="bg-vert text-beige p-10 md:w-1/3 flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-bold font-poppins mb-6 uppercase text-sable">Garder le contact</h2>
                        <p className="font-lato opacity-80 mb-10 leading-relaxed">
                            Nous sommes joignables du lundi au samedi pour échanger autour de vos besoins.
                        </p>
                        <ul className="space-y-8 font-lato">
                            <li className="flex items-start space-x-4">
                                <Mail className="w-6 h-6 text-sable flex-shrink-0" />
                                <span>hello@mamsitter.com</span>
                            </li>
                            <li className="flex items-start space-x-4">
                                <Phone className="w-6 h-6 text-sable flex-shrink-0" />
                                <span>+33 6 16 41 82 16 <br /><small className="opacity-70">(WhatsApp disponible)</small></span>
                            </li>
                            <li className="flex items-start space-x-4">
                                <MapPin className="w-6 h-6 text-sable flex-shrink-0" />
                                <span>Siège : Paris, France <br /><small className="opacity-70">Services en France / Suisse</small></span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Formulaire */}
                <div className="p-10 md:w-2/3 bg-white">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h2 className="text-2xl font-bold font-poppins text-sable mb-6 uppercase">Envoyez un message</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block font-poppins font-semibold text-sm text-gray-700 mb-2">Nom complet</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-sable focus:ring-2 focus:ring-sable/20 transition font-lato"
                                    placeholder="Jeanne Dupont"
                                />
                            </div>
                            <div>
                                <label className="block font-poppins font-semibold text-sm text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-sable focus:ring-2 focus:ring-sable/20 transition font-lato"
                                    placeholder="jeanne@email.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block font-poppins font-semibold text-sm text-gray-700 mb-2">Message</label>
                            <textarea
                                required
                                rows={5}
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-sable focus:ring-2 focus:ring-sable/20 transition font-lato"
                                placeholder="Comment pouvons-nous vous aider ?"
                            ></textarea>
                        </div>
                        {status === 'success' && (
                            <div className="p-4 bg-green-50 text-green-700 rounded-lg font-lato font-semibold border border-green-200">
                                ✅ Merci ! Votre message a été envoyé avec succès. Nous vous répondons très vite.
                            </div>
                        )}
                        <button
                            disabled={status === 'sending' || status === 'success'}
                            className="px-8 py-4 bg-sable text-white font-bold rounded-lg uppercase tracking-wide hover:bg-sable/90 transition shadow-md w-full sm:w-auto flex items-center justify-center space-x-3 disabled:opacity-50"
                        >
                            <span>{status === 'sending' ? 'Envoi...' : 'Envoyer'}</span>
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
