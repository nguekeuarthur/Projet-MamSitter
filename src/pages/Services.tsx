import { Check, Clock, Shield, Zap, Star, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import SitterSelectionModal from '../components/SitterSelectionModal';

type ServicePackage = {
  name: string;
  image: string;
  priceEUR: string;
  priceCHF: string;
  duration: string;
  shortDescription: string;
  previewFeatures: string[];
  fullFeatures: string[];
  badge?: string;
  pricePrefix?: string;
  popular?: boolean;
};

const packages: ServicePackage[] = [
  {
    name: 'Douceur',
    image: '/images/pack-douceur.jpg',
    priceEUR: '557',
    priceCHF: '619',
    badge: 'classique',
    shortDescription: 'Pour un premier soutien post-accouchement.',
    duration: '5 visites de 3h chacune',
    previewFeatures: [
      'Écoute et conseils personnalisés pour vous soutenir et vous guider dans votre quotidien post-partum'
    ],
    fullFeatures: [
      'Écoute et conseils personnalisés pour vous soutenir et vous guider dans votre quotidien post-partum',
      'Aide sur-mesure : garde du bébé le temps d’un moment pour vous, rangement, organisation de la maison, préparation de repas adaptés à vos besoins, balades accompagnées avec bébé pour prendre l’air et vous détendre, aide au bain de bébé',
      'Guidance pour la semaine : planification, conseils pratiques et astuces pour gagner du temps',
      'Suivi WhatsApp 5j/7 pendant la durée du pack pour répondre à vos questions et ajuster l’accompagnement selon vos besoins',
      'Chaque visite est flexible : vous choisissez ce qui est le plus utile pour vous ce jour-là'
    ]
  },
  {
    name: 'Sérénité',
    image: '/images/pack-serenite.jpg',
    priceEUR: '749',
    priceCHF: '864',
    badge: 'le plus choisi',
    shortDescription: 'Un accompagnement complet pour vous sentir sereine et soutenue',
    duration: '21 heures de visites réparties sur 4 semaines selon vos besoins.',
    previewFeatures: [
      'Écoute et conseils personnalisés pour vous soutenir et vous guider dans votre quotidien post-partum'
    ],
    fullFeatures: [
      'Écoute et conseils personnalisés pour vous soutenir et vous guider dans votre quotidien post-partum',
      'Aide sur-mesure : garde du bébé le temps d’un moment pour vous, rangement, organisation de la maison, batch cooking pour 3 jours d’avance, balades accompagnées avec bébé pour prendre l’air et vous détendre, aide au bain de bébé',
      'Guidance pour la semaine : planification, conseils pratiques et astuces pour gagner du temps',
      'Suivi WhatsApp 5j/7 pendant la durée du pack pour répondre à vos questions et ajuster l’accompagnement selon vos besoins',
      'Chaque visite est flexible : vous choisissez ce qui est le plus utile pour vous ce jour-là'
    ],
    popular: true
  },
  {
    name: 'Harmonie',
    image: '/images/pack-confort.jpg',
    priceEUR: '2230',
    priceCHF: '2589',
    badge: 'premium',
    shortDescription: 'Un accompagnement complet et sur-mesure pour vous offrir sérénité et bien-être pendant plusieurs semaines',
    duration: '63 heures de visites, réparties selon vos besoins sur 3 mois.',
    previewFeatures: [
      'Écoute et conseils personnalisés pour vous soutenir pleinement dans votre quotidien post-partum'
    ],
    fullFeatures: [
      'Écoute et conseils personnalisés pour vous soutenir pleinement dans votre quotidien post-partum',
      'Soutien au quotidien : garde du bébé le temps d’un moment pour vous, rangement, organisation de la maison, préparation de repas adaptés à vos besoins, balades accompagnées avec bébé pour prendre l’air et vous détendre, aide au bain de bébé',
      'Batch cooking et préparation de repas plus élaborés pour la semaine',
      'Petites attentions bien-être : tisane spéciale allaitement, astuces détente, mini collation santé, huile de massage pour bébé',
      'Guidance pour la semaine : planification, conseils pratiques, suivi de routines, astuces pour gagner du temps et mieux s’organiser',
      'Temps de repos garanti pour vous : chaque visite peut inclure un bon moment où vous pouvez vous détendre pleinement pendant que votre MamaSitter s’occupe de bébé',
      'Suivi WhatsApp illimité pendant 3 mois pour répondre à vos questions et ajuster l’accompagnement selon vos besoins',
      'Chaque visite est flexible et personnalisée : vous choisissez ce qui est le plus utile pour vous ce jour-là'
    ]
  },
  {
    name: 'Douce Nuit',
    image: '/images/pack-douce-nuit.jpg',
    priceEUR: '350',
    priceCHF: '410',
    pricePrefix: 'À partir de',
    shortDescription: 'Un accompagnement post-partum nocturne pensé pour les mamans qui ressentent le besoin d’être relayées la nuit.',
    duration: 'À partir d\'une nuit de 10 heures.',
    previewFeatures: [
      'Prise en charge du bébé ou des bébés en cas de jumeaux/jumelles (changes, biberons, rendormissement)'
    ],
    fullFeatures: [
      'Prise en charge du bébé ou des bébés en cas de jumeaux/jumelles (changes, biberons, rendormissement)',
      'Une présence calme, douce et sécurisante, favorisant un climat apaisé',
      'Un relais nocturne, pour que vous puissiez dormir et vous reposer pleinement',
      'Une transmission au matin pour vous permettre de reprendre le relais en douceur',
      'Des conseils si besoin',
      'Les horaires peuvent être ajustés selon votre situation et vos besoins mais chaque nuit accompagnée par une MamaSitter est de 10 heures.'
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
    description: 'Nous adaptons nos horaires à votre nouveau rythme de vie'
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
  const [selectedPkg, setSelectedPkg] = useState<ServicePackage | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [detailsPkg, setDetailsPkg] = useState<ServicePackage | null>(null);
  const [currency, setCurrency] = useState<'EUR' | 'CHF'>(() => {
    const params = new URLSearchParams(window.location.search);
    const currencyParam = params.get('currency');
    return (currencyParam === 'CHF' ? 'CHF' : 'EUR') as 'EUR' | 'CHF';
  });

  const handleReserve = (pkg: ServicePackage) => {
    setSelectedPkg(pkg);
    setIsModalOpen(true);
  };

  const handleOpenDetails = (pkg: ServicePackage) => {
    setDetailsPkg(pkg);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsModalOpen(false);
    setDetailsPkg(null);
  };

  useEffect(() => {
    if (!isDetailsModalOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseDetails();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDetailsModalOpen]);

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

            {/* <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-vert text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-vert/90 transition-all hover:scale-[1.02] shadow-xl shadow-vert/10 uppercase tracking-wide">
                Découvrir nos forfaits
              </button>
              <button className="bg-white text-vert border-2 border-vert/5 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/80 transition-all shadow-lg shadow-black/5 uppercase tracking-wide">
                Nous contacter
              </button>
            </div> */}
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
              const isPopular = pkg.popular;
              return (
                <div
                  key={pkg.name}
                  className={`group relative bg-white rounded-[32px] overflow-hidden transition-all duration-500 border-2 ${isPopular
                    ? 'border-sable shadow-2xl scale-105 z-10 shadow-sable/5'
                    : 'border-transparent hover:border-sable/20 shadow-xl shadow-black/5'
                    }`}
                >
                  {isPopular && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-sable text-white px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-sable/20 z-20">
                      Plus populaire
                    </div>
                  )}

                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="p-8">
                    <h3 className="text-3xl font-bold mb-4 text-sable font-poppins">{pkg.name}</h3>
                    {pkg.badge && (
                      <p className="text-[11px] uppercase font-black tracking-[0.18em] text-vert/40 mb-2">({pkg.badge})</p>
                    )}
                    <p className="text-sm text-vert/70 leading-relaxed mb-5">{pkg.shortDescription}</p>

                    <div className="mb-8">
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-bold text-vert/40 uppercase tracking-tighter">Budget</span>
                      </div>
                      {pkg.pricePrefix && (
                        <span className="text-[10px] uppercase font-bold text-vert/30 tracking-widest">{pkg.pricePrefix}</span>
                      )}
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-4xl font-bold text-sable font-poppins tracking-tighter italic">
                          {currency === 'EUR' ? `${pkg.priceEUR}€` : `CHF ${pkg.priceCHF}`}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-vert/50 mt-1">{pkg.duration}</p>
                    </div>

                    <ul className="space-y-4 mb-10 overflow-hidden">
                      {pkg.previewFeatures.map((feature, i) => (
                        <li key={i} className="flex items-start space-x-3 group/item">
                          <div className="mt-1 w-5 h-5 rounded-full bg-sable/5 flex items-center justify-center shrink-0 border border-sable/10 group-hover/item:border-sable/30 transition-colors">
                            <Check className="w-3 h-3 text-sable" />
                          </div>
                          <span className="text-sm font-medium text-vert/70 leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleOpenDetails(pkg)}
                      className="w-full py-3 rounded-2xl font-bold transition-all uppercase tracking-widest text-xs border border-sable/30 text-sable hover:bg-sable/5 mb-4"
                    >
                      Voir plus
                    </button>

                    <button
                      onClick={() => handleReserve(pkg)}
                      className={`w-full py-4 rounded-2xl font-bold transition-all uppercase tracking-widest text-xs shadow-lg shadow-black/5 hover:-translate-y-1 ${isPopular
                        ? 'bg-sable text-white hover:bg-sable/90'
                        : 'bg-vert text-white hover:bg-vert/90'
                        }`}
                    >
                      Réserver ce coffret
                    </button>
                  </div>
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

      {isDetailsModalOpen && detailsPkg && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={handleCloseDetails}
        >
          <div
            className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="px-6 md:px-8 py-5 border-b border-sable/15 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-sable font-poppins">Coffret {detailsPkg.name}</h3>
                <p className="text-sm text-vert/70 mt-1">{detailsPkg.shortDescription}</p>
              </div>
              <button
                onClick={handleCloseDetails}
                className="text-vert/50 hover:text-vert text-sm font-bold uppercase tracking-wider"
              >
                Fermer
              </button>
            </div>

            <div className="px-6 md:px-8 py-6 overflow-y-auto">
              <div className="mb-6">
                {detailsPkg.pricePrefix && (
                  <p className="text-xs uppercase tracking-wider font-bold text-vert/40">{detailsPkg.pricePrefix}</p>
                )}
                <p className="text-3xl font-bold text-sable font-poppins italic">
                  {currency === 'EUR' ? `${detailsPkg.priceEUR}€` : `CHF ${detailsPkg.priceCHF}`}
                </p>
                <p className="text-sm text-vert/60 mt-1">{detailsPkg.duration}</p>
              </div>

              <ul className="space-y-4">
                {detailsPkg.fullFeatures.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-sable/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-sable" />
                    </div>
                    <span className="text-sm md:text-base text-vert/80 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
