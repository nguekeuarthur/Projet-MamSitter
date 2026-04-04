import { Check } from 'lucide-react';
import { useState } from 'react';
import SitterSelectionModal from './SitterSelectionModal';

const packages = [
  {
    name: 'Douceur',
    image: '/images/pack-douceur.jpg',
    priceEUR: '557',
    priceCHF: '619',
    duration: '3 heures',
    features: [
      'Accompagnement à domicile',
      'Soutien émotionnel',
      'Conseils pratiques bébé',
      'Support WhatsApp 1 semaine'
    ]
  },
  {
    name: 'Sérénité',
    image: '/images/pack-serenite.jpg',
    priceEUR: '749',
    priceCHF: '864',
    duration: '6 heures',
    features: [
      'Tout le coffret Douceur',
      'Aide aux tâches ménagères',
      'Préparation de repas',
      'Support WhatsApp 2 semaines',
      'Garde de bébé pendant repos'
    ],
    popular: true
  },
  {
    name: 'Harmonie',
    image: '/images/pack-confort.jpg',
    priceEUR: '2230',
    priceCHF: '2589',
    duration: '12 heures',
    features: [
      'Tout le coffret Sérénité',
      'Organisation de la maison',
      'Courses incluses',
      'Support WhatsApp 1 mois',
      'Suivi personnalisé'
    ]
  },
  {
    name: 'Douce Nuit',
    image: '/images/pack-douce-nuit.jpg',
    priceEUR: '350',
    priceCHF: '410',
    duration: 'Nuit (8h)',
    durationNote: 'À partir de',
    features: [
      'Garde de nuit complète',
      'Gestion des réveils',
      'Biberons si nécessaire',
      'Parents peuvent dormir',
      'Rapport matinal détaillé'
    ]
  }
];


export default function Services() {
  const [currency, setCurrency] = useState<'EUR' | 'CHF'>('EUR');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<any>(null);

  const handleReserve = (pkg: any) => {
    setSelectedPkg(pkg);
    setIsModalOpen(true);
  };

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
                className={`relative bg-white rounded-2xl border-2 p-0 overflow-hidden transition-all ${pkg.popular ? 'shadow-xl scale-105' : 'hover:shadow-lg'
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
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-sable">
                      {pkg.durationNote && <span className="text-xs block font-normal text-vert/60">{pkg.durationNote} </span>}
                      {currency === 'EUR' ? `${pkg.priceEUR}€` : `CHF ${pkg.priceCHF}`}
                    </span>
                    <span className="ml-2 text-vert/70">/ {pkg.duration}</span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-sable" />
                        <span className="text-vert/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

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
    </section>
  );
}
