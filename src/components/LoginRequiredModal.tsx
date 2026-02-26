import React from 'react';
import { LogIn, ShieldCheck, X } from 'lucide-react';

interface LoginRequiredModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginRequiredModal({ isOpen, onClose }: LoginRequiredModalProps) {
    if (!isOpen) return null;

    const handleGoToLogin = () => {
        onClose();
        window.location.hash = '#/login';
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[40px] max-w-sm w-full p-8 md:p-10 shadow-2xl border border-gray-100 flex flex-col items-center text-center animate-in zoom-in-95 duration-200 relative">
                <div className="w-20 h-20 bg-beige rounded-full flex items-center justify-center mb-6">
                    <LogIn className="w-10 h-10 text-sable" />
                </div>

                <h3 className="text-2xl font-poppins font-bold text-gray-800 mb-4">
                    Session expirée
                </h3>

                <p className="text-gray-500 font-lato leading-relaxed mb-8">
                    Ta session a expiré ou tu dois être connecté pour accéder à cette page.
                </p>

                <div className="w-full space-y-3">
                    <button
                        onClick={handleGoToLogin}
                        className="w-full py-4 bg-sable text-white font-poppins font-bold rounded-2xl hover:bg-sable/90 transition-all active:scale-95 shadow-lg shadow-sable/20"
                    >
                        Se connecter
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full py-3 text-gray-400 font-lato text-sm hover:text-gray-600 transition-colors"
                    >
                        Plus tard
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-gray-400" />
                </button>
            </div>
        </div>
    );
}
