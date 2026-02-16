import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-16 md:pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-beige">
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

            <p className="text-xl text-vert/80 leading-relaxed font-poppins">
              MamSitter vous accompagne durant vos premières semaines avec bébé.
              Nos MamaSitters formées vous apportent soutien, réconfort et conseils pratiques à domicile.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-sable text-white px-8 py-4 rounded-full hover:bg-sable/90 transition-all font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                <span>Réserver un accompagnement</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-vert px-8 py-4 rounded-full hover:bg-violet/30 transition-colors font-semibold text-lg border-2 border-vert/20">
                Découvrir nos forfaits
              </button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-vert font-poppins">500+</div>
                <div className="text-sm text-vert/70">Mamans accompagnées</div>
              </div>
              <div className="h-12 w-px bg-vert/30"></div>
              <div>
                <div className="text-3xl font-bold text-vert font-poppins">98%</div>
                <div className="text-sm text-vert/70">Satisfaction</div>
              </div>
              <div className="h-12 w-px bg-vert/30"></div>
              <div>
                <div className="text-3xl font-bold text-vert font-poppins">2</div>
                <div className="text-sm text-vert/70">Pays (FR/CH)</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-sable/40 to-violet/40 rounded-3xl shadow-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3737576/pexels-photo-3737576.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Maman avec son bébé"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-violet rounded-full flex items-center justify-center">
                  <span className="text-2xl">💝</span>
                </div>
                <div>
                  <div className="font-semibold text-vert font-poppins">Disponible 24/7</div>
                  <div className="text-sm text-vert/70">Support WhatsApp</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
