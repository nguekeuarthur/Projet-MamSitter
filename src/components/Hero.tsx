import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-beige min-h-[70vh] sm:min-h-[90vh]">
      <div className="absolute inset-0 hidden sm:block">
        <img
          src="/images/banniere.jpg"
          alt="Mamans et bébé"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/50" />
      </div>

      <div className="relative pt-28 pb-12 sm:pt-32 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mx-auto sm:mx-0 space-y-8 text-center sm:text-left text-white">
            <div className="inline-flex items-center justify-center sm:justify-start space-x-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Soutien post-partum personnalisé</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight font-poppins">
              Bienvenue dans votre
              <span className="text-sable"> nouvelle vie de maman</span>
            </h1>

            <div className="block sm:hidden mt-6">
              <div className="overflow-hidden rounded-[32px] border border-white/20 shadow-2xl">
                <img
                  src="/images/banniere.jpg"
                  alt="Mamans et bébé"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>

            <p className="text-base sm:text-lg leading-relaxed font-poppins text-vert sm:text-white bg-white/90 sm:bg-transparent text-vert/90 sm:text-white/85 rounded-3xl p-5 sm:p-0 shadow-lg sm:shadow-none">
              Pensée par une maman, pour les mamans, MamSitter met en relation des accompagnantes de confiance et bienveillantes avec des familles à la recherche de soutien après l'accouchement. Offrir ou s'offrir une MamaSitter, c'est offrir bien plus qu'une aide : c'est un véritable cadeau de naissance, une bulle de réconfort et de sérénité pour chaque jeune maman.
            </p>

            <div className="space-y-4 bg-white/85 rounded-2xl p-6 border border-white/50 text-vert">
              <h3 className="text-base sm:text-lg font-semibold text-vert font-poppins">Une MamaSitter vous aide à :</h3>
              <ul className="space-y-2 text-vert/80 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <span className="text-sable font-bold mt-1">•</span>
                  <span>Apporter une aide pratique à domicile : repas (batch cooking), rangement, organisation, garde de bébé pendant que maman prend un bain…</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sable font-bold mt-1">•</span>
                  <span>Offrir une présence réconfortante et une écoute bienveillante</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sable font-bold mt-1">•</span>
                  <span>Aider les mamans à retrouver équilibre, énergie et sérénité</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <a href='#/search' className="group w-full sm:w-auto bg-sable text-white px-6 py-4 rounded-2xl hover:bg-sable/90 transition-all font-semibold text-base inline-flex items-center justify-center gap-3 shadow-lg hover:shadow-xl">
                <span>Réserver un accompagnement</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" />
              </a>
              <a href='#/services' className="w-full sm:w-auto bg-white text-vert px-6 py-4 rounded-2xl hover:bg-violet/30 transition-colors font-semibold text-base border border-vert/10 inline-flex items-center justify-center text-center">
                Découvrir nos coffrets
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
