import { ArrowRight } from 'lucide-react';

const steps = [
  {
    image: '/images/trouver1.jpg',
    title: 'Créez votre profil Maman',
    description: 'Inscrivez-vous et créez votre profil en quelques minutes pour accéder à nos services.',
    color: '#D39280'
  },
  {
    image: '/images/trouver2.jpg',
    title: 'Découvrez les MamaSitters proches de chez vous',
    description: 'Parcourez les profils de nos MamaSitters certifiées et trouvez celle qui vous convient.',
    color: '#D39280'
  },
  {
    image: '/images/trouver3.jpg',
    title: 'Choisissez le coffret qui vous correspond',
    description: 'Sélectionnez le forfait qui répond à vos besoins et réservez vos dates.',
    color: '#D39280'
  },
  {
    image: '/images/trouver4.jpg',
    title: 'Profitez de vos moments de répit',
    description: 'Laissez votre MamaSitter prendre soin de vous et de votre bébé en toute confiance.',
    color: '#D39280'
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-vert font-poppins tracking-tight">
            Comment ça <span className="text-sable italic">marche ?</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto text-vert/60 font-poppins font-light leading-relaxed">
            Un accompagnement simple et bienveillant, conçu pour alléger votre quotidien dès la naissance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative">


          {steps.map((step, index) => {
            return (
              <div key={index} className="relative z-10 group">
                <div className="flex flex-col items-center">
                  {/* Image Container */}
                  <div className="w-full rounded-[32px] bg-white flex items-center justify-center mb-8 shadow-xl shadow-sable/5 border border-sable/5 group-hover:scale-110 group-hover:shadow-sable/10 transition-all duration-500 relative overflow-hidden h-48">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-sable text-white flex items-center justify-center text-2xl font-black shadow-xl shadow-black/30">
                        {index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-white/40 backdrop-blur-sm rounded-[40px] p-8 border border-white/60 shadow-sm group-hover:shadow-xl transition-all duration-500 text-center w-full h-[220px] flex flex-col justify-center">
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
          <a href="#/register" className="group relative inline-flex items-center gap-3 bg-vert text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-vert/90 transition-all hover:scale-105 shadow-xl shadow-vert/10 uppercase tracking-widest">
            <span>Commencer mon parcours</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
