import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-beige">
      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-sable/30">
              <Sparkles className="w-4 h-4 text-sable" />
              <span className="text-sm font-medium text-vert">Soutien post-partum personnalisé</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-vert leading-tight font-poppins">
              Bienvenue dans votre
              <span className="text-sable"> nouvelle vie de maman</span>
            </h1>

            <p className="text-lg text-vert/80 leading-relaxed font-poppins">
              Pensée par une maman, pour les mamans, MamSitter met en relation des accompagnantes de confiance et bienveillantes avec des familles à la recherche de soutien après l'accouchement. Offrir ou s'offrir une MamaSitter, c'est offrir bien plus qu'une aide : c'est un véritable cadeau de naissance, une bulle de réconfort et de sérénité pour chaque jeune maman.
            </p>

            <div className="space-y-4 bg-blanc/50 rounded-2xl p-6 border border-vert/20">
              <h3 className="text-lg font-semibold text-vert font-poppins">Une MamaSitter vous aide à :</h3>
              <ul className="space-y-2 text-vert/80">
                <li className="flex items-start space-x-3">
                  <span className="text-sable font-bold mt-1">•</span>
                  <span>Apporter une aide pratique à domicile : repas (batch cooking), rangement, organisation, garde de bébé pendant que maman prend un bain…</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-sable font-bold mt-1">•</span>
                  <span>Offrir une présence réconfortante et une écoute bienveillante</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-sable font-bold mt-1">•</span>
                  <span>Aider les mamans à retrouver équilibre, énergie et sérénité</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-sable text-white px-8 py-4 rounded-full hover:bg-sable/90 transition-all font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                <span>Réserver un accompagnement</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-vert px-8 py-4 rounded-full hover:bg-violet/30 transition-colors font-semibold text-lg border-2 border-vert/20">
                Découvrir nos coffrets
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-sable/40 to-violet/40 rounded-3xl shadow-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/36215025/pexels-photo-36215025.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Maman avec son bébé"
                className="w-full h-full object-cover"
              />
            </div>
            {/* <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-violet rounded-full flex items-center justify-center">
                  <span className="text-2xl">💝</span>
                </div>
                <div>
                  <div className="font-semibold text-vert font-poppins">Disponible 24/7</div>
                  <div className="text-sm text-vert/70">Support WhatsApp</div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
