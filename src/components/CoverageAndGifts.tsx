import { Heart } from 'lucide-react';

export default function CoverageAndGifts() {
  return (
    <>
      {/* Coverage Section - France & Suisse Romande */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-sable font-poppins uppercase tracking-wide">
              MamSitter, le soutien bienveillant des mamans
            </h2>
            <p className="text-xl text-gray-700 font-poppins">
              En France & Suisse Romande
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* France */}
            <div className="flex flex-col items-center">
              <img
                src="/images/carte-france.png"
                alt="MamSitter France"
                className="w-full h-64 object-contain mb-6"
              />
              <h3 className="text-2xl font-bold text-sable font-poppins mb-3">
                MamSitter France aide jeunes mamans
              </h3>
              <p className="text-gray-700 text-center font-poppins">
                Accompagnement personnalisé après la naissance dans toute la France
              </p>
            </div>

            {/* Suisse Romande */}
            <div className="flex flex-col items-center">
              <img
                src="/images/drapeau-suisse.png"
                alt="MamSitter Suisse Romande"
                className="w-full h-64 object-contain mb-6"
              />
              <h3 className="text-2xl font-bold text-sable font-poppins mb-3">
                MamSitter Suisse aide jeunes mamans
              </h3>
              <p className="text-gray-700 text-center font-poppins">
                En Suisse Romande (canton de Genève et Lausanne)
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-beige/10 rounded-2xl p-8 md:p-12 mb-12">
            <p className="text-lg text-gray-700 leading-relaxed font-poppins mb-6">
              Parce qu'aucune maman ne devrait vivre son post-partum seule, MamSitter propose un accompagnement personnalisé après la naissance : aide à domicile, soutien émotionnel, conseils pour l'allaitement et la récupération.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed font-poppins mb-6">
              Nos MamaSitters accompagnent les jeunes mamans dans plusieurs villes en France et en Suisse Romande (canton de Genève et Lausanne). Chaque jour, nous aidons les familles à vivre un post-partum plus doux, plus serein et plus humain.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed font-poppins mb-6">
              Et ce n'est qu'un début : MamSitter poursuit son développement dans toute la Suisse romande et dans l'intégralité de la France, pour offrir à chaque maman le soutien bienveillant qu'elle mérite.
            </p>

            <p className="text-sm text-gray-600 italic font-poppins">
              Pour en savoir plus sur le congé maternité et le retour à la maison, vous pouvez consulter le site de l'assurance maladie.
            </p>
          </div>
        </div>
      </section>

      {/* Gifts Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-vert">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="order-2 lg:order-1">
              <img
                src="/images/cadeau.jpg"
                alt="Cadeau de naissance MamSitter"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>

            {/* Content Section */}
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white font-poppins uppercase tracking-wide">
                Le plus beau cadeau de naissance
              </h2>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 font-poppins">
                    Besoin d'une idée de cadeau de naissance original à offrir à la maman ?
                  </h3>
                  <p className="text-lg text-beige leading-relaxed font-poppins">
                    Et si le plus beau cadeau de naissance, c'était du repos, de la douceur et du soutien pour la maman ?
                  </p>
                </div>

                <div className="bg-white/10 rounded-xl p-6">
                  <p className="text-lg text-beige leading-relaxed font-poppins">
                    Avec MamSitter, offrez-vous ou offrez une aide post-partum à domicile. Nos MamaSitters expérimentées offrent aux jeunes mamans un soutien bienveillant, pratique et émotionnel pour mieux vivre les premières semaines après la naissance.
                  </p>
                </div>

                <p className="text-lg text-beige leading-relaxed font-poppins">
                  C'est un cadeau de naissance original, unique et profondément humain, bien plus précieux qu'un simple objet : un geste d'amour qui aide vraiment la maman à se reposer, se recentrer et profiter pleinement de son bébé.
                </p>
              </div>

              <div className="space-y-3 mb-8 text-beige font-poppins">
                <p className="flex items-start">
                  <Heart className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                  <span><strong>Chers Papas</strong>, offrez le meilleur cadeau de naissance à votre femme</span>
                </p>
                <p className="flex items-start">
                  <Heart className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                  <span><strong>Chères Amies, Chers Proches</strong>, offrez un cadeau de naissance original et utile à Maman</span>
                </p>
                <p className="flex items-start">
                  <Heart className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                  <span><strong>Chères Mamans</strong>, prenez soin de vous en vous offrant un cadeau de naissance utile qui allègera votre charge mentale</span>
                </p>
              </div>

              <a
                href="#/blog"
                className="inline-block text-white px-8 py-4 rounded-full transition-colors font-semibold text-lg shadow-lg bg-white/20 hover:bg-white/30 uppercase tracking-wide border-2 border-white"
              >
                Découvrir nos cadeaux
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
