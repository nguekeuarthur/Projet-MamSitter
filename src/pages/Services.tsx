import { Check, Moon, Heart, Home, Sparkles, Clock, Users, Shield, ArrowRight, Zap, Globe } from 'lucide-react';
import { useState } from 'react';

const packages = [
  {
    name: 'Douceur',
    icon: Heart,
    priceEUR: '557',
    priceCHF: '619',
    duration: '3 heures',
    color: '#D39280',
    bgColor: 'from-sable/5 to-transparent',
    image: '/images/Coffret Douceur.jpg',
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
    bgColor: 'from-sable/10 to-violet/5',
    image: '/images/Coffret Sérénité.jpg',
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
    color: '#c9a382',
    bgColor: 'from-orange-50 to-transparent',
    image: '/images/Coffret Harmonie.jpg',
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
    bgColor: 'from-slate-50 to-transparent',
    image: '/images/Coffret Douce Nuit.png',
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
    title: 'MamaSitters Certifiées',
    description: 'Tous nos accompagnants sont formés, vérifiés et assurés',
    color: 'bg-blue-100 border-blue-300'
  },
  {
    icon: Clock,
    title: 'Flexible',
    description: 'Adaptez l\'accompagnement à votre emploi du temps',
    color: 'bg-purple-100 border-purple-300'
  },
  {
    icon: Zap,
    title: 'Réactif',
    description: 'Disponibilité rapide selon vos besoins urgents',
    color: 'bg-amber-100 border-amber-300'
  },
  {
    icon: Heart,
    title: 'Empathique',
    description: 'Une approche bienveillante et rassurante',
    color: 'bg-pink-100 border-pink-300'
  }
];

export default function ServicesPage() {
  const [currency, setCurrency] = useState<'EUR' | 'CHF'>(() => {
    // Récupère le paramètre 'currency' de l'URL
    const params = new URLSearchParams(window.location.search);
    const currencyParam = params.get('currency');
    return (currencyParam === 'CHF' ? 'CHF' : 'EUR') as 'EUR' | 'CHF';
  });
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-sable/5 to-violet/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-violet/5 to-sable/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-sable/10 backdrop-blur-sm px-4 py-2 rounded-full border border-sable/20 mb-8">
            <Sparkles className="w-4 h-4 text-sable" />
            <span className="text-sm font-semibold text-sable uppercase tracking-wide">Nos services</span>
          </div>

          <h1 className="text-6xl sm:text-7xl font-bold text-vert mb-6 font-poppins leading-tight">
            L'accompagnement <span className="bg-gradient-to-r from-sable to-violet bg-clip-text text-transparent">qui rassure</span>
          </h1>
          <p className="text-2xl text-vert/70 max-w-3xl mx-auto font-poppins mb-6 leading-relaxed">
            Des solutions complètes adaptées à chaque étape de votre parentalité
          </p>
          <p className="text-lg text-vert/60 max-w-2xl mx-auto mb-8">
            Concentrez-vous sur votre bébé et votre repos. Nos MamaSitters gèrent le reste.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-beige/30 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-vert mb-4 font-poppins">
              Pourquoi choisir MamSitter ?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className={`group ${benefit.color} rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 border-2`}
                >
                  <div className="w-14 h-14 rounded-xl bg-white/90 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                    <Icon className="w-7 h-7 text-sable" />
                  </div>
                  <h3 className="text-xl font-bold text-vert mb-3 font-poppins">{benefit.title}</h3>
                  <p className="text-vert/80 leading-relaxed font-medium">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet/5 to-transparent"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Currency Toggle */}
          <div className="flex justify-center items-center gap-4 mb-20">
            <span className="text-vert/70 font-semibold">Choisir votre région :</span>
            <div className="flex gap-3">
              <button
                onClick={() => setCurrency('EUR')}
                className={`px-6 py-3 rounded-full font-semibold transition-all uppercase tracking-wide ${
                  currency === 'EUR'
                    ? 'bg-sable text-white shadow-lg'
                    : 'bg-white text-sable border-2 border-sable/30 hover:border-sable'
                }`}
              >
                🇫🇷 EUR - France
              </button>
              <button
                onClick={() => setCurrency('CHF')}
                className={`px-6 py-3 rounded-full font-semibold transition-all uppercase tracking-wide ${
                  currency === 'CHF'
                    ? 'bg-sable text-white shadow-lg'
                    : 'bg-white text-sable border-2 border-sable/30 hover:border-sable'
                }`}
              >
                🇨🇭 CHF - Suisse
              </button>
            </div>
          </div>

          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-vert mb-6 font-poppins">
              Forfaits selon votre région
            </h2>
            <p className="text-xl text-vert/70 max-w-2xl mx-auto font-poppins">
              Sélectionnez le package qui correspond à votre situation. Tous incluent notre garantie satisfaction 100%.
            </p>
          </div>

          {/* Quick View Grid with Images */}
          <div className="mb-24 bg-gradient-to-br from-sable/10 to-violet/10 rounded-4xl p-12 md:p-16">
            <h3 className="text-center text-3xl font-bold text-white mb-12 font-poppins uppercase tracking-wide">
              Nos différents coffrets
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Price Info */}
                  <div className="p-8 text-center">
                    <h4 className="text-2xl font-bold text-sable mb-2 font-poppins">Coffret {pkg.name}</h4>
                    <div className="text-xl text-vert/70 mb-6">
                      {pkg.durationNote && <span className="block text-sm">{pkg.durationNote}</span>}
                      {currency === 'EUR' ? (
                        <span className="text-2xl font-bold text-sable">{pkg.priceEUR}€</span>
                      ) : (
                        <span className="text-2xl font-bold text-sable">CHF {pkg.priceCHF}</span>
                      )}
                    </div>

                    <button className="bg-sable text-white px-6 py-2.5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-sable/90 transition-colors">
                      INFOS & PAIEMENT
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-beige/50 to-violet/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-bold text-sable mb-3 font-poppins">500+</div>
              <p className="text-lg text-vert/70">Mamans accompagnées</p>
            </div>
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-sable to-violet bg-clip-text text-transparent mb-3 font-poppins">98%</div>
              <p className="text-lg text-vert/70">De satisfaction</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-violet mb-3 font-poppins">24/7</div>
              <p className="text-lg text-vert/70">Support disponible</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sable/10 via-violet/5 to-sable/10 rounded-3xl"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center">
            <h2 className="text-5xl sm:text-6xl font-bold text-vert mb-6 font-poppins leading-tight">
              <span className="bg-gradient-to-r from-sable to-violet bg-clip-text text-transparent">Commencez dès maintenant</span>
            </h2>
            <p className="text-xl text-vert/70 mb-10 font-poppins max-w-2xl mx-auto leading-relaxed">
              Nos MamaSitters sont formées, certifiées et prêtes à vous accompagner dès cette semaine
            </p>

            <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-sable to-violet text-white px-12 py-5 rounded-full font-bold text-lg uppercase tracking-widest hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <span>Réserver un accompagnement</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>

            <p className="text-vert/60 text-sm mt-8">
              ✓ Première consultation gratuite • ✓ Sans engagement • ✓ Disponibilité en 48h
            </p>
          </div>
        </div>
      </section>

      {/* Before Choosing Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-beige to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            {/* Images */}
            <div className="relative h-96">
              <img 
                src="https://images.pexels.com/photos/3957985/pexels-photo-3957985.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Maman heureuse avec bébé"
                className="absolute top-0 left-0 w-2/3 h-48 rounded-2xl object-cover shadow-lg"
              />
              <img 
                src="https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="MamaSitter avec bébé"
                className="absolute bottom-0 right-0 w-2/3 h-56 rounded-2xl object-cover shadow-lg"
              />
            </div>

            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-sable/10 px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-sable" />
                <span className="text-sm font-semibold text-sable uppercase tracking-wide">Pourquoi choisir MamSitter</span>
              </div>

              <h2 className="text-5xl font-bold text-vert mb-6 font-poppins leading-tight">
                <span className="text-sable">Moins de fatigue,</span> <br /> plus de soutien.
              </h2>

              <p className="text-lg text-vert/70 mb-8 font-poppins leading-relaxed">
                Un vrai relais pour souffler après la naissance
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-vert mb-3 text-lg">Après la naissance, beaucoup de mamans tiennent jusqu'à ne plus pouvoir.</h3>
                  <p className="text-vert/70">La fatigue s'accumule, le manque de sommeil s'installe, la charge mentale devient lourde. Et souvent, tout repose sur vous.</p>
                </div>

                <div>
                  <h3 className="font-bold text-vert mb-3 text-lg">Chez MamSitter, nous pensons qu'une maman ne devrait pas attendre d'être épuisée pour être soutenue.</h3>
                  <p className="text-vert/70">Nos packs ont été conçus pour vous offrir un véritable relais post-partum émotionnel et logistique !</p>
                </div>

                <div>
                  <h3 className="font-bold text-vert mb-3 text-lg">Grâce à l'accompagnement d'une MamaSitter :</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-sable" />
                      <span className="text-vert/70"><strong className="text-vert">la fatigue est contenue</strong> et ne s'accumule pas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-sable" />
                      <span className="text-vert/70"><strong className="text-vert">la charge mentale d'allège réellement</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-sable" />
                      <span className="text-vert/70">vous bénéficiez d'un <strong className="text-vert">temps de repos autorisé</strong>, sans culpabilité</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-sable" />
                      <span className="text-vert/70"><strong className="text-vert">votre foyer retrouve plus de calme et d'apaisement</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-sable" />
                      <span className="text-vert/70"><strong className="text-vert">votre couple est soulagé,</strong> car vous n'êtes plus la seule à tout porter</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-sable/5 rounded-2xl p-6 border border-sable/20">
                  <p className="text-vert/80">Chaque pack MamSitter vous propose un niveau de soutien différent, mais tous ont un même objectif : <strong>prendre soin de la mère, pour préserver l'équilibre de toute la famille.</strong></p>
                </div>

                <p className="text-vert/70 italic pt-4">
                  Prenez le temps de découvrir celui qui correspond le mieux à votre rythme, votre fatigue et vos besoins du moment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Needs Evolution Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-beige/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <h2 className="text-5xl font-bold text-sable mb-8 font-poppins">
                Et si vos besoins évoluent ?
              </h2>

              <div className="space-y-6">
                <p className="text-lg text-vert/70 leading-relaxed">
                  Le post-partum n'est jamais linéaire. Vos besoins peuvent changer, s'intensifier ou durer plus longtemps que prévu (et c'est normal).
                </p>

                <div className="bg-white rounded-2xl p-8 border border-sable/20">
                  <p className="text-vert/80 leading-relaxed mb-4">
                    Si vous avez opté pour le <strong>Coffret Sérénité</strong> et que vous ressentez le besoin de <strong>prolonger l'accompagnement d'un mois supplémentaire,</strong> il vous suffit de <strong>nous contacter par mail à l'adresse suivante : <span className="text-sable font-semibold">hello@mamsitter.com</span></strong>
                  </p>
                </div>

                <p className="text-vert/70 leading-relaxed">
                  Nous vous proposerons alors un <strong>code de réduction de 17 euros,</strong> pour ajuster votre accompagnement en douceur, sans repartir de zéro.
                </p>

                <div className="bg-gradient-to-r from-violet/5 to-sable/5 rounded-2xl p-8 border border-violet/10">
                  <p className="text-vert/80 leading-relaxed">
                    <strong className="text-vert">Chez MamSitter, l'accompagnement s'adapte à votre réalité, pas l'inverse.</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Image Collage */}
            <div className="relative h-96">
              <div className="absolute top-0 left-0 w-1/2 h-40 bg-white rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.pexels.com/photos/4307962/pexels-photo-4307962.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Maman avec bébé"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute top-32 right-0 w-1/2 h-40 bg-white rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.pexels.com/photos/3985221/pexels-photo-3985221.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Bébé"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute bottom-0 left-1/4 w-1/2 h-48 bg-white rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="MamaSitter"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
