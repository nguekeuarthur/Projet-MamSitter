import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, ArrowRight, Heart } from 'lucide-react';
import { verifyBookingSession } from '../services/bookingService';

export default function BookingSuccess() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [booking, setBooking] = useState<any>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.split('?')[1]);
        const sessionId = params.get('session_id');
        if (sessionId) {
            verify(sessionId);
        } else {
            setStatus('error');
        }
    }, []);

    const verify = async (sessionId: string) => {
        try {
            const data = await verifyBookingSession(sessionId!);
            if (data.status === 'paid') {
                setBooking(data.booking);
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-sable mx-auto mb-4" />
                    <p className="text-vert/60 font-poppins font-medium">Validation de votre paiement...</p>
                </div>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-[40px] p-10 text-center shadow-xl border border-red-100">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
                        <ArrowRight className="w-10 h-10 text-red-500 rotate-180" />
                    </div>
                    <h1 className="text-3xl font-bold text-vert mb-4 font-poppins">Oups !</h1>
                    <p className="text-vert/60 mb-8 font-poppins">Nous n'avons pas pu confirmer votre paiement. Si vous avez été débité, veuillez nous contacter.</p>
                    <a href="/#/services" className="inline-block bg-vert text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-lg shadow-vert/10">
                        Retour aux services
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4 py-20 overflow-x-hidden">
            <div className="max-w-2xl w-full bg-white rounded-[60px] p-12 text-center shadow-2xl relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-sable/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-vert/3 rounded-full blur-3xl -ml-32 -mb-32"></div>

                <div className="relative z-10">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-white shadow-lg">
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-vert mb-6 font-poppins">
                        Paiement <span className="text-sable italic">réussi !</span>
                    </h1>

                    <p className="text-xl text-vert/60 mb-10 font-poppins font-light leading-relaxed max-w-lg mx-auto">
                        Merci pour votre confiance. Votre réservation pour le forfait <span className="text-sable font-bold">{booking?.packageName}</span> est confirmée.
                    </p>

                    <div className="bg-[#FAF7F2] rounded-[32px] p-8 mb-10 border border-sable/5 text-left max-w-md mx-auto">
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-sable/10">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <Heart className="w-6 h-6 text-sable" />
                            </div>
                            <div>
                                <h3 className="font-bold text-vert uppercase tracking-widest text-[10px]">Forfait Choisi</h3>
                                <p className="text-lg font-bold text-sable">{booking?.packageName}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-vert/40 font-bold uppercase tracking-widest text-[10px]">Montant payé</span>
                                <span className="font-bold text-vert">{booking?.amount} {booking?.currency}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-vert/40 font-bold uppercase tracking-widest text-[10px]">Statut</span>
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Payé</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/" className="bg-vert text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl shadow-vert/10 hover:-translate-y-1 transition-all">
                            Accueil
                        </a>
                    </div>

                    <p className="mt-12 text-xs text-vert/30 font-medium uppercase tracking-[0.2em]">
                        Un e-mail de confirmation vous a été envoyé.
                    </p>
                </div>
            </div>
        </div>
    );
}
