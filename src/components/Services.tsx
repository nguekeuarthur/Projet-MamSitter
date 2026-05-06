import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import SitterSelectionModal from './SitterSelectionModal';

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


export default function Services() {
  const [currency, setCurrency] = useState<'EUR' | 'CHF'>('EUR');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<ServicePackage | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [detailsPkg, setDetailsPkg] = useState<ServicePackage | null>(null);

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

    const scrollY = window.scrollY;
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseDetails();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      window.scrollTo(0, scrollY);
    };
  }, [isDetailsModalOpen]);

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-beige">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-vert mb-4 font-poppins uppercase tracking-wide">
            Nos coffrets d'accompagnement
          </h2>
          <p className="text-xl text-vert/70 max-w-2xl mx-auto font-poppins mb-8">
            Choisissez le soutien qui correspond à vos besoins.
          </p>

          {/* Currency Toggle */}
          <div className="flex justify-center items-center gap-4 mb-12">
            <div className="flex p-1 bg-beige rounded-full border border-sable/10">
              <button
                onClick={() => setCurrency('EUR')}
                className={`px-6 py-2 rounded-full font-bold transition-all text-sm ${currency === 'EUR'
                  ? 'bg-sable text-white shadow-md'
                  : 'text-vert/40 hover:text-vert/60'
                  }`}
              >
                FRANCE (EUR)
              </button>
              <button
                onClick={() => setCurrency('CHF')}
                className={`px-6 py-2 rounded-full font-bold transition-all text-sm ${currency === 'CHF'
                  ? 'bg-sable text-white shadow-md'
                  : 'text-vert/40 hover:text-vert/60'
                  }`}
              >
                SUISSE (CHF)
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => {
            return (
              <div
                key={pkg.name}
                className={`relative bg-white rounded-2xl border-2 p-0 overflow-hidden transition-all ${pkg.popular ? 'shadow-xl md:scale-105' : 'hover:shadow-lg'
                  }`}
                style={{ borderColor: pkg.popular ? '#D39280' : '#e5e7eb' }}
              >
                {pkg.popular && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-sable text-white px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wide z-10">
                    Plus populaire
                  </div>
                )}

                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-sable font-poppins">{pkg.name}</h3>
                  {pkg.badge && (
                    <p className="text-[11px] uppercase font-black tracking-[0.15em] text-vert/40 mb-2">({pkg.badge})</p>
                  )}
                  <p className="text-sm text-vert/70 leading-relaxed mb-4">{pkg.shortDescription}</p>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-sable">
                      {pkg.pricePrefix && <span className="text-xs block font-normal text-vert/60">{pkg.pricePrefix} </span>}
                      {currency === 'EUR' ? `${pkg.priceEUR}€` : `CHF ${pkg.priceCHF}`}
                    </span>
                    <p className="text-vert/70 mt-1">{pkg.duration}</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {pkg.previewFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-sable" />
                        <span className="text-vert/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleOpenDetails(pkg)}
                    className="w-full py-3 rounded-xl font-semibold transition-colors border border-sable/30 text-sable uppercase tracking-wide hover:bg-sable/5 mb-3"
                  >
                    Voir plus
                  </button>

                  <button
                    onClick={() => handleReserve(pkg)}
                    className={`w-full py-3 rounded-xl font-semibold transition-colors text-white uppercase tracking-wide ${pkg.popular ? 'bg-sable hover:bg-sable/90' : 'bg-vert hover:bg-vert/90'
                      }`}
                  >
                    Réserver
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

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
          className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-3 pt-6 md:p-4 bg-black/40 backdrop-blur-sm overflow-y-auto"
          onClick={handleCloseDetails}
        >
          <div
            className="w-full max-w-3xl bg-white rounded-[26px] md:rounded-3xl shadow-2xl overflow-hidden max-h-[calc(100dvh-1.5rem)] md:max-h-[90vh] flex flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-10 px-5 md:px-8 py-4 md:py-5 border-b border-sable/15 flex items-start justify-between gap-4 bg-white/95 backdrop-blur-sm">
              <div>
                <h3 className="text-xl md:text-3xl font-bold text-sable font-poppins">Coffret {detailsPkg.name}</h3>
                <p className="text-sm text-vert/70 mt-1">{detailsPkg.shortDescription}</p>
              </div>
              <button
                onClick={handleCloseDetails}
                className="text-vert/50 hover:text-vert text-xs md:text-sm font-bold uppercase tracking-wider"
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
    </section>
  );
}
