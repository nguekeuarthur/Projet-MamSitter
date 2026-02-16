import { Calendar, Heart, MapPin, Search } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Decrivez vos besoins',
    text: 'Indiquez vos dates, votre ville et le type de soutien souhaite.'
  },
  {
    icon: Calendar,
    title: 'Selectionnez un creneau',
    text: 'Choisissez le moment ideal pour etre accompagnee a domicile.'
  },
  {
    icon: Heart,
    title: 'Rencontrez votre MamaSitter',
    text: 'Une professionnelle douce et certifiee vient chez vous.'
  }
];

export default function FindSitterPage() {
  return (
    <main className="bg-beige">
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-sable/30">
            <MapPin className="w-4 h-4 text-sable" />
            <span className="text-sm font-medium text-vert">France et Suisse</span>
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-vert mb-4 font-poppins uppercase tracking-wide">
            Trouver ma MamaSitter
          </h1>
          <p className="text-lg sm:text-xl text-vert/70 font-poppins">
            Un accompagnement post-partum sur mesure, chez vous, avec une MamaSitter certifiee.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#/services"
              className="bg-sable text-white px-6 py-3 rounded-full font-semibold uppercase tracking-wide shadow-lg hover:bg-sable/90 transition-colors"
            >
              Choisir un forfait
            </a>
            <a
              href="#/packages-eur"
              className="border border-vert text-vert px-6 py-3 rounded-full font-semibold uppercase tracking-wide hover:bg-vert/5 transition-colors"
            >
              Voir les coffrets
            </a>
          </div>
        </div>
      </section>

      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-sable">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-sable mb-2 font-poppins">{step.title}</h3>
                <p className="text-vert/70 font-poppins">{step.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 shadow-xl border border-sable/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[#727B6E]">
              <Search className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-vert font-poppins">Demarrer une demande</h3>
              <p className="text-vert/70 font-poppins">
                Nous vous recontactons rapidement pour trouver la MamaSitter ideale.
              </p>
            </div>
            <a
              href="#/services"
              className="bg-sable text-white px-6 py-3 rounded-full font-semibold uppercase tracking-wide shadow-lg hover:bg-sable/90 transition-colors"
            >
              Commencer
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
