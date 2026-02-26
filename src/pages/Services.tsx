import { Check, Moon, Heart, Home, Sparkles, Clock, Shield, Zap, Star } from 'lucide-react';
import { useState } from 'react';
import SitterSelectionModal from '../components/SitterSelectionModal';

const packages = [
  {
    name: 'Douceur',
    icon: Heart,
    priceEUR: '557',
    priceCHF: '619',
    duration: '3 heures',
    color: '#D39280',
    features: [
      'Accompagnement à domicile',
      'Soutien émotionnel',
      'Conseils pratiques bébé',
      'Support WhatsApp 1 semaine'
    ]
  },
  {
    name: 'Sérénité',
    icon: Home,
    priceEUR: '749',
    priceCHF: '864',
    duration: '6 heures',
    color: '#D39280',
    features: [
      'Tout le forfait Douceur',
      'Aide aux tâches ménagères',
      'Préparation de repas',
      'Support WhatsApp 2 semaines',
      'Garde de bébé pendant repos'
    ],
    popular: true
  },
  {
    name: 'Harmonie',
    icon: Sparkles,
    priceEUR: '2230',
    priceCHF: '2589',
    duration: '12 heures',
    color: '#D39280',
    features: [
      'Tout le forfait Sérénité',
      'Organisation de la maison',
      'Courses incluses',
      'Support WhatsApp 1 mois',
      'Suivi personnalisé'
    ]
  },
  {
    name: 'Douce Nuit',
    icon: Moon,
    priceEUR: '350',
    priceCHF: '410',
    duration: 'Nuit (8h)',
    durationNote: 'À partir de',
    color: '#899484',
    features: [
      'Garde de nuit complète',
      'Gestion des réveils',
      'Biberons si nécessaire',
      'Parents peuvent dormir',
      'Rapport matinal détaillé'
    ]
  }
];

const benefits = [
  {
    icon: Shield,
    title: 'Sérénité Totale',
    description: 'Toutes nos MamaSitters passent par une sélection rigoureuse et sont certifiées'
  },
  {
    icon: Clock,
    title: 'Flexibilité Douce',
    description: 'Nous adaptons nos horaires à votre nouveau rythme de vie nocturne et diurne'
  },
  {
    icon: Zap,
    title: 'Soutien Immédiat',
    description: 'Une disponibilité rapide pour ne jamais vous laisser seule face aux doutes'
  },
  {
    icon: Heart,
    title: 'Bienveillance Émotionnelle',
    description: 'Parce que votre santé mentale est aussi importante que celle de bébé'
  }
];

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<any>(null);
  const [currency, setCurrency] = useState<'EUR' | 'CHF'>(() => {
    const params = new URLSearchParams(window.location.search);
    const currencyParam = params.get('currency');
    return (currencyParam === 'CHF' ? 'CHF' : 'EUR') as 'EUR' | 'CHF';
  });

  const handleReserve = (pkg: any) => {
    setSelectedPkg(pkg);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Hero Section - Softer Design */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Soft blur backgrounds */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sable/5 rounded-full blur-[120px] -mr-32 -mt-32"></div>
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-vert/3 rounded-full blur-[100px] -ml-32"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-md px-6 py-2.5 rounded-full border border-sable/10 mb-8 shadow-sm">
              <Star className="w-4 h-4 text-sable fill-sable" />
              <span className="text-xs font-bold text-sable uppercase tracking-[0.2em]">L'art du soutien post-partum</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-vert mb-8 font-poppins leading-[1.1] tracking-tight">
              Pour que chaque maman se sente <span className="text-sable italic">écoutée & épaulée.</span>
            </h1>

            <p className="text-xl md:text-2xl text-vert/60 max-w-2xl mx-auto font-poppins font-light leading-relaxed mb-12">
              Des solutions douces et sur-mesure pour transformer vos premières semaines avec bébé en souvenirs sereins.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-vert text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-vert/90 transition-all hover:scale-[1.02] shadow-xl shadow-vert/10 uppercase tracking-wide">
                Découvrir nos forfaits
              </button>
              <button className="bg-white text-vert border-2 border-vert/5 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/80 transition-all shadow-lg shadow-black/5 uppercase tracking-wide">
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Glassmorphism & Soft Colors */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-white/40 backdrop-blur-sm p-10 rounded-[40px] border border-white/60 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-inner border border-sable/5">
                    <Icon className="w-8 h-8 text-sable" />
                  </div>
                  <h3 className="text-xl font-bold text-vert mb-4 font-poppins">{benefit.title}</h3>
                  <p className="text-vert/60 leading-relaxed font-poppins font-medium">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Packages Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-vert mb-8 font-poppins tracking-tight">
              Choisissez votre <span className="text-sable">période de douceur</span>
            </h2>

            {/* Soft Currency Toggle */}
            <div className="inline-flex p-1.5 bg-beige/50 backdrop-blur-md rounded-2xl border border-sable/10 shadow-inner">
              <button
                onClick={() => setCurrency('EUR')}
                className={`px-8 py-3 rounded-xl font-bold transition-all uppercase tracking-widest text-xs ${currency === 'EUR'
                  ? 'bg-white text-sable shadow-md border border-sable/5'
                  : 'text-vert/40 hover:text-vert/60'
                  }`}
              >
                🇫🇷 France (EUR)
              </button>
              <button
                onClick={() => setCurrency('CHF')}
                className={`px-8 py-3 rounded-xl font-bold transition-all uppercase tracking-widest text-xs ${currency === 'CHF'
                  ? 'bg-white text-sable shadow-md border border-sable/5'
                  : 'text-vert/40 hover:text-vert/60'
                  }`}
              >
                🇨🇭 Suisse (CHF)
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 px-2">
            {packages.map((pkg) => {
              const Icon = pkg.icon;
              const isPopular = pkg.popular;
              return (
                <div
                  key={pkg.name}
                  className={`group relative bg-white rounded-[32px] p-8 transition-all duration-500 border-2 ${isPopular
                    ? 'border-sable shadow-2xl scale-105 z-10 shadow-sable/5'
                    : 'border-transparent hover:border-sable/20 shadow-xl shadow-black/5'
                    }`}
                >
                  {isPopular && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-sable text-white px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-sable/20">
                      Plus populaire
                    </div>
                  )}

                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-white/20 transition-transform group-hover:scale-110 duration-500"
                    style={{
                      background: pkg.name === 'Douce Nuit'
                        ? 'linear-gradient(135deg, #899484, #D39280)'
                        : 'linear-gradient(135deg, #D39280, #C9C7E6)'
                    }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-3xl font-bold mb-4 text-sable font-poppins">{pkg.name}</h3>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-vert/40 uppercase tracking-tighter">Budget</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-bold text-sable font-poppins tracking-tighter italic">
                        {currency === 'EUR' ? `${pkg.priceEUR}€` : `CHF ${pkg.priceCHF}`}
                      </span>
                      <span className="text-sm font-medium text-vert/50">/ {pkg.duration}</span>
                    </div>
                    {pkg.durationNote && (
                      <span className="text-[10px] uppercase font-bold text-vert/30 tracking-widest">{pkg.durationNote}</span>
                    )}
                  </div>

                  <ul className="space-y-4 mb-10 overflow-hidden">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-3 group/item">
                        <div className="mt-1 w-5 h-5 rounded-full bg-sable/5 flex items-center justify-center shrink-0 border border-sable/10 group-hover/item:border-sable/30 transition-colors">
                          <Check className="w-3 h-3 text-sable" />
                        </div>
                        <span className="text-sm font-medium text-vert/70 leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleReserve(pkg)}
                    className={`w-full py-4 rounded-2xl font-bold transition-all uppercase tracking-widest text-xs shadow-lg shadow-black/5 hover:-translate-y-1 ${isPopular
                      ? 'bg-sable text-white hover:bg-sable/90'
                      : 'bg-vert text-white hover:bg-vert/90'
                      }`}
                  >
                    Réserver ce forfait
                  </button>
                </div>
              );
            })}
          </div>


        </div>
      </section>

      {/* Why Section - Centered & Optimized */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[60px] p-8 md:p-14 shadow-2xl shadow-sable/5 overflow-hidden relative">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-beige p-20 rounded-full blur-3xl -mr-20 -mt-20 opacity-50"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 bg-sable/10 px-6 py-2 rounded-full mb-8 border border-sable/5">
                <Heart className="w-4 h-4 text-sable fill-sable/20" />
                <span className="text-[10px] font-black text-sable uppercase tracking-[0.2em]">Prendre soin de vous</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-vert mb-6 font-poppins leading-[1.1]">
                Moins de fatigue,<br />
                <span className="text-sable italic">plus de soutien réel.</span>
              </h2>

              <div className="space-y-8 max-w-2xl mx-auto">
                <p className="text-lg md:text-xl text-vert/80 font-poppins font-light leading-relaxed">
                  Le post-partum n'est pas une course de fond, c'est une traversée.
                  Chez MamSitter, nous ne vous aidons pas seulement à garder bébé.
                  Nous veillons sur <span className="text-sable font-bold underline decoration-sable/20 underline-offset-4">votre équilibre.</span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left w-full">
                  {[
                    'Récupération physique active',
                    'Accompagnement émotionnel',
                    'Relais ménager & cuisine',
                    'Temps de sommeil garanti'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 bg-[#FAF7F2] p-4 rounded-[24px] border border-black/5 hover:border-sable/10 hover:bg-white transition-all duration-300">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                        <Check className="w-4 h-4 text-sable" />
                      </div>
                      <span className="text-[11px] font-bold text-vert/70 uppercase tracking-tighter leading-tight">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <p className="text-base text-vert/60 italic border-l-4 border-sable/20 pl-6 leading-relaxed text-left">
                    "Une maman reposée est une maman qui peut pleinement savourer les premiers instants de vie de son enfant."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Style tweaks for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}} />

      {selectedPkg && (
        <SitterSelectionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          pkg={selectedPkg}
          currency={currency}
        />
      )}
    </div>
  );
}
