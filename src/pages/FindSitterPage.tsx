import { Heart, MapPin, Search, CheckCircle, Gift, Phone } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Créez votre profil Maman',
    text: 'MamaSitter aide post-partum jeunes mamans'
  },
  {
    icon: MapPin,
    title: 'Découvrez les MamaSitters proches de chez vous',
    text: 'Choisir Pack aide post-partum Genève Haute-Savoie'
  },
  {
    icon: Heart,
    title: 'Choisissez le pack qui vous correspond',
    text: 'Cadeau de naissance détente post-partum'
  },
  {
    icon: CheckCircle,
    title: 'Profitez de vos moments de répit',
    text: 'Offrir une MamaSitter'
  }
];

const faqs = [
  {
    question: 'Est-ce vraiment sécurisé ?',
    answer: 'Toutes les MamaSitters sont vérifiées : formulaire détaillé, entretien individualisé, pièce d’identité et extrait de casier judiciaire. De cette façon, nous garantissons des rencontres fiables et rassurantes.'
  },
  {
    question: 'Combien ça coûte ?',
    answer: 'Nous proposons 3 packs différents que vous retrouvez sur notre page d’accueil. Par ailleurs, chaque pack est flexible pour s’adapter à vos besoins.'
  },
  {
    question: 'Puis-je annuler ?',
    answer: 'Vous pouvez annuler sans frais avant la première visite. Après le démarrage, il est possible de reporter une visite en prévenant au moins 24h à l’avance. La totalité du paiement se fait directement sur la plateforme lors de la réservation de votre MamaSitter.'
  },
  {
    question: 'Quel est le rôle de MamSitter ?',
    answer: 'MamSitter n’emploie pas directement les MamaSitters. Notre mission consiste avant tout à offrir une plateforme sécurisée et bienveillante, qui sélectionne chaque profil avec soin pour garantir des rencontres de confiance.'
  }
];

export default function FindSitterPage() {
  return (
    <main className="bg-beige">
      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-sable/30">
            <MapPin className="w-4 h-4 text-sable" />
            <span className="text-sm font-medium text-vert">France et Suisse</span>
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-vert mb-4 font-poppins uppercase tracking-wide">
            Comment trouver ma MamaSitter ?
          </h1>
          <p className="text-lg sm:text-xl text-vert/70 font-poppins max-w-4xl mx-auto">
            Avec MamSitter, trouver une aide post-partum bienveillante à Genève, Annemasse & dans toute la France devient simple et rapide. En quelques clics, créez votre profil, découvrez les MamaSitters sélectionnées près de chez vous, puis échangez avec elles avant de réserver le soutien qui vous correspond. Ainsi, vous bénéficiez d'un accompagnement pensé pour alléger votre charge mentale et vous offrir enfin un vrai moment de répit.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-vert text-center mb-8 font-poppins">Trouver une aide post-partum Genève Haute-Savoie</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-sable mx-auto">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-sable mb-2">{index + 1}</div>
                  <h3 className="text-xl font-bold text-sable mb-2 font-poppins">{step.title}</h3>
                  <p className="text-vert/70 font-poppins text-sm">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 shadow-xl border border-sable/20 text-center">
          <h3 className="text-2xl font-bold text-vert font-poppins mb-4">Vos questions, nos réponses…</h3>
          <p className="text-vert/70 font-poppins mb-6">
            Trouvez dès maintenant la MamaSitter qui correspond à vos besoins et profitez de votre moment de répit grâce à une aide post-partum bienveillante et proche de chez vous.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#/services"
              className="bg-sable text-white px-6 py-3 rounded-full font-semibold uppercase tracking-wide shadow-lg hover:bg-sable/90 transition-colors"
            >
              Trouver ma MamaSitter
            </a>
            <a
              href="#/packages-eur"
              className="border border-vert text-vert px-6 py-3 rounded-full font-semibold uppercase tracking-wide hover:bg-vert/5 transition-colors"
            >
              Offrir une MamaSitter
            </a>
          </div>
        </div>
      </section>

      {/* Gift Idea Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-sable/20">
            <div className="text-center mb-6">
              <Gift className="w-12 h-12 text-sable mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-vert font-poppins mb-4">Une idée de cadeau de naissance originale et pleine de sens</h3>
            </div>
            <p className="text-vert/70 font-poppins mb-4">
              Vous cherchez une idée de cadeau de naissance original à offrir à une jeune maman, à votre femme, à votre sœur ou à une amie qui vient d'accoucher ? Offrir une aide post-partum avec MamSitter, c'est bien plus qu'un simple présent : c'est offrir du repos, du soutien et de la douceur.
            </p>
            <p className="text-vert/70 font-poppins mb-4">
              Nos MamaSitters se déplacent à domicile pour aider les mamans à se remettre sereinement de l'accouchement. Un cadeau utile, humain et attentionné, qui montre que vous pensez vraiment à son bien-être.
            </p>
            <p className="text-vert/70 font-poppins">
              Que ce soit pour offrir à votre femme après la naissance, pour une baby shower, ou simplement pour faire plaisir à une maman, MamSitter transforme votre attention en un moment de répit et de bienveillance.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-vert text-center mb-8 font-poppins">Vos questions, nos réponses</h3>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-2xl p-6 shadow-lg border border-sable/20">
                <h4 className="text-xl font-bold text-sable mb-3 font-poppins flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-vert" />
                  {faq.question}
                </h4>
                <p className="text-vert/70 font-poppins">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#727B6E] text-white rounded-3xl p-8 shadow-xl">
            <div className="text-center mb-6">
              <span className="text-4xl">💝</span>
              <h3 className="text-2xl font-bold font-poppins mb-4">Le petit plus</h3>
            </div>
            <p className="font-poppins mb-6">
              Besoin d'une idée de cadeau de naissance original et utile pour une maman ? Offrez une aide post-partum à domicile : rendez-vous sur notre page <a href="#/packages-eur" className="underline hover:no-underline">Offrir une MamaSitter</a>
            </p>
            <p className="font-poppins mb-6">
              Pour en savoir plus sur le post-partum et le soutien aux jeunes mamans – <a href="https://www.santepubliquefrance.fr" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Santé publique France</a>
            </p>
            <div className="text-center">
              <a
                href="#/packages-eur"
                className="bg-white text-[#727B6E] px-6 py-3 rounded-full font-semibold uppercase tracking-wide shadow-lg hover:bg-gray-100 transition-colors inline-block"
              >
                Offrir une MamaSitter
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* À savoir Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 shadow-xl border border-sable/20">
          <h3 className="text-2xl font-bold text-vert font-poppins mb-4">À savoir</h3>
          <p className="text-vert/70 font-poppins mb-4">
            MamSitter n'emploie pas directement les MamaSitters. Chaque MamaSitter est engagée par la famille elle-même.
          </p>
          <p className="text-vert/70 font-poppins mb-6">
            Notre rôle est de vous offrir une plateforme sécurisée et bienveillante : nous sélectionnons chaque profil avec soin (entretiens, vérifications, valeurs humaines) pour garantir aux mamans des rencontres de confiance avec de vraies personnes compétentes.
          </p>
          <div className="flex items-center gap-3">
            <Phone className="w-6 h-6 text-sable" />
            <span className="text-vert font-semibold">Une question ? <a href="mailto:contact@mamsitter.com" className="text-sable hover:underline">contactez-nous !</a></span>
          </div>
        </div>
      </section>
    </main>
  );
}
