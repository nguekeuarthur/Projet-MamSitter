import React from 'react';
import { UserX, ShieldAlert, X } from 'lucide-react';

interface BannedModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BannedModal({ isOpen, onClose }: BannedModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[40px] max-w-md w-full p-8 md:p-10 shadow-2xl border border-red-100 flex flex-col items-center text-center animate-in zoom-in-95 duration-200 relative">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                    <UserX className="w-10 h-10 text-red-500" />
                </div>

                <h3 className="text-2xl font-poppins font-bold text-gray-800 mb-4">
                    Compte Suspendu
                </h3>

                <p className="text-gray-500 font-lato leading-relaxed mb-8">
                    Ton compte a été suspendu pour non-respect des conditions d'utilisation ou de sécurité de la plateforme MamSitter.
                </p>

                <div className="w-full space-y-3">
                    <div className="p-4 bg-orange-50 rounded-2xl flex items-start gap-3 text-left mb-6">
                        <ShieldAlert className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-orange-700 leading-tight">
                            Pour toute contestation ou demande d'information, contacte l'administrateur à <span className="font-bold underline">contact@mamsitter.ch</span>
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-gray-900 text-white font-poppins font-bold rounded-2xl hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-gray-200"
                    >
                        J'ai compris
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
