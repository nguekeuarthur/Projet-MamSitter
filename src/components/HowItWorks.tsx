import { Calendar, UserCheck, Home, Heart, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Calendar,
    title: 'Réservez votre créneau',
    description: 'Choisissez le forfait qui vous convient et sélectionnez vos dates préférées en ligne.',
    color: '#D39280'
  },
  {
    icon: UserCheck,
    title: 'Rencontrez votre MamaSitter',
    description: 'Nous vous mettons en relation avec une MamaSitter certifiée près de chez vous.',
    color: '#D39280'
  },
  {
    icon: Home,
    title: 'Accueil à domicile',
    description: 'Votre MamaSitter vient chez vous aux horaires convenus pour vous accompagner.',
    color: '#D39280'
  },
  {
    icon: Heart,
    title: 'Profitez de ce moment',
    description: 'Repos, conseils, soutien : concentrez-vous sur vous et votre bébé en toute sérénité.',
    color: '#D39280'
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-sable/5 px-4 py-1.5 rounded-full border border-sable/10 mb-6">
            <span className="text-[10px] font-black text-sable uppercase tracking-[0.2em]">Parcours Sérénité</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-vert font-poppins tracking-tight">
            Comment ça <span className="text-sable italic">marche ?</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto text-vert/60 font-poppins font-light leading-relaxed">
            Un accompagnement simple et bienveillant, conçu pour alléger votre quotidien dès la naissance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative">


          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative z-10 group">
                <div className="flex flex-col items-center">
                  {/* Icon Circle */}
                  <div className="w-24 h-24 rounded-[32px] bg-white flex items-center justify-center mb-8 shadow-xl shadow-sable/5 border border-sable/5 group-hover:scale-110 group-hover:shadow-sable/10 transition-all duration-500 relative">
                    <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-sable text-white flex items-center justify-center text-sm font-black shadow-lg shadow-sable/20 border-4 border-[#FAF7F2]">
                      {index + 1}
                    </div>
                    <Icon className="w-10 h-10 text-sable" />
                  </div>

                  {/* Content */}
                  <div className="bg-white/40 backdrop-blur-sm rounded-[40px] p-8 border border-white/60 shadow-sm group-hover:shadow-xl transition-all duration-500 text-center w-full min-h-[220px] flex flex-col justify-center">
                    <h3 className="text-xl font-bold mb-4 text-vert font-poppins leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-sm font-medium text-vert/60 font-poppins leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <button className="group relative inline-flex items-center gap-3 bg-vert text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-vert/90 transition-all hover:scale-105 shadow-xl shadow-vert/10 uppercase tracking-widest">
            <span>Commencer mon parcours</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
