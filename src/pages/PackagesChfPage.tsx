import { Check, Moon, Heart, Home, Sparkles } from 'lucide-react';

const packages = [
  {
    name: 'Douceur',
    icon: Heart,
    price: '170 CHF',
    duration: '3 heures',
    gradient: 'linear-gradient(135deg, #D39280, #c9c7e6)',
    features: [
      'Accompagnement a domicile',
      'Soutien emotionnel',
      'Conseils pratiques bebe',
      'Support WhatsApp 1 semaine'
    ]
  },
  {
    name: 'Serenite',
    icon: Home,
    price: '310 CHF',
    duration: '6 heures',
    gradient: 'linear-gradient(135deg, #D39280, #c9c7e6)',
    features: [
      'Tout le forfait Douceur',
      'Aide aux taches menageres',
      'Preparation de repas',
      'Support WhatsApp 2 semaines',
      'Garde de bebe pendant repos'
    ],
    popular: true
  },
  {
    name: 'Harmonie',
    icon: Sparkles,
    price: '560 CHF',
    duration: '12 heures',
    gradient: 'linear-gradient(135deg, #D39280, #c9c7e6)',
    features: [
      'Tout le forfait Serenite',
      'Organisation de la maison',
      'Courses incluses',
      'Support WhatsApp 1 mois',
      'Suivi personnalise'
    ]
  },
  {
    name: 'Douce Nuit',
    icon: Moon,
    price: '195 CHF',
    duration: 'Nuit (8h)',
    gradient: 'linear-gradient(135deg, #899484, #c9c7e6)',
    features: [
      'Garde de nuit complete',
      'Gestion des reveils',
      'Biberons si necessaire',
      'Parents peuvent dormir',
      'Rapport matinal detaille'
    ]
  }
];

export default function PackagesChfPage() {
  return (
    <main className="bg-beige">
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-vert mb-4 font-poppins uppercase tracking-wide">
            Nos coffrets - CHF
          </h1>
          <p className="text-lg sm:text-xl text-vert/70 font-poppins">
            Tarifs en francs suisses pour la Suisse et les regions frontalières.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#/packages-eur"
              className="border border-vert text-vert px-6 py-3 rounded-full font-semibold uppercase tracking-wide hover:bg-vert/5 transition-colors"
            >
              Voir les coffrets EUR
            </a>
            <a
              href="#/find-sitter"
              className="bg-sable text-white px-6 py-3 rounded-full font-semibold uppercase tracking-wide shadow-lg hover:bg-sable/90 transition-colors"
            >
              Trouver ma MamaSitter
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => {
              const Icon = pkg.icon;
              return (
                <div
                  key={pkg.name}
                  className={`relative bg-white rounded-2xl border-2 p-6 transition-all ${
                    pkg.popular ? 'shadow-xl scale-105' : 'hover:shadow-lg'
                  }`}
                  style={{borderColor: pkg.popular ? '#D39280' : '#e5e7eb'}}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sable text-white px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wide">
                      Plus populaire
                    </div>
                  )}

                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{background: pkg.gradient}}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-2 text-sable font-poppins">{pkg.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-sable">{pkg.price}</span>
                    <span className="ml-2 text-vert/70">/ {pkg.duration}</span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-sable" />
                        <span className="text-vert/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-xl font-semibold transition-colors text-white uppercase tracking-wide ${
                      pkg.popular ? 'bg-sable hover:bg-sable/90' : 'bg-vert hover:bg-vert/90'
                    }`}
                  >
                    Reserver
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
