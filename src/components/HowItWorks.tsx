import { Calendar, UserCheck, Home, Heart } from 'lucide-react';

const steps = [
  {
    icon: Calendar,
    title: 'Réservez votre créneau',
    description: 'Choisissez le forfait qui vous convient et sélectionnez vos dates préférées en ligne.',
    bgColor: '#c9c7e6',
    iconColor: '#899484'
  },
  {
    icon: UserCheck,
    title: 'Rencontrez votre MamaSitter',
    description: 'Nous vous mettons en relation avec une MamaSitter certifiée près de chez vous.',
    bgColor: '#c9c7e6',
    iconColor: '#899484'
  },
  {
    icon: Home,
    title: 'Accueil à domicile',
    description: 'Votre MamaSitter vient chez vous aux horaires convenus pour vous accompagner.',
    bgColor: '#c9c7e6',
    iconColor: '#899484'
  },
  {
    icon: Heart,
    title: 'Profitez de ce moment',
    description: 'Repos, conseils, soutien : concentrez-vous sur vous et votre bébé en toute sérénité.',
    bgColor: '#c9c7e6',
    iconColor: '#899484'
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-beige">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-vert font-poppins uppercase tracking-wide">
            Comment ça marche ?
          </h2>
          <p className="text-xl max-w-2xl mx-auto text-vert/70 font-poppins">
            Un accompagnement simple et sans stress, conçu pour vous faciliter la vie.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 -translate-x-1/2 z-0 bg-sable"></div>
                )}
                <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{backgroundColor: step.bgColor}}>
                      <Icon className="w-8 h-8" style={{color: step.iconColor}} />
                    </div>
                  </div>
                  <div className="text-center mb-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 text-white rounded-full text-sm font-bold mb-3 bg-sable">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-3 text-sable font-poppins">
                    {step.title}
                  </h3>
                  <p className="text-center text-vert/70 font-poppins">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <button className="text-white px-8 py-4 rounded-full transition-colors font-semibold text-lg shadow-lg bg-sable hover:bg-sable/90 uppercase tracking-wide">
            Commencer maintenant
          </button>
        </div>
      </div>
    </section>
  );
}
