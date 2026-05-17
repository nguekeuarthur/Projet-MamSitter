import React from 'react';

export default function BecomeMamaSitter() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-beige py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-vert mb-6">
                Devenir <span className="text-sable">MamaSitter</span> : un métier de cœur pour les mamans bienveillantes
              </h1>
              <p className="text-xl text-vert/70 mb-8">
                Faites la différence dans la vie des mamans.
              </p>
              <a
                href="#/register"
                className="inline-block bg-sable text-white px-8 py-3 rounded-lg font-semibold hover:bg-sable/90 transition"
              >
                Postuler maintenant
              </a>
            </div>
            <div>
              <img
                src="/images/devenirmamsitter.png"
                alt="Devenir MamaSitter"
                className="rounded-lg shadow-lg w-full object-cover h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 text-lg text-vert/70">
            <p>
              Et si votre maternité devenait votre plus belle mission ?
            </p>
            <p>
              Vous êtes maman, et depuis la naissance de votre enfant, votre regard sur la vie a changé ? 
              Votre ancien métier ne fait plus vraiment sens. Vous rêvez d'un travail qui a du cœur, d'un emploi 
              flexible qui respecte votre rythme, votre vie de famille et vos valeurs ?
            </p>
            <p className="text-xl font-semibold text-sable">
              Et si vous deveniez MamaSitter, une aide post-partum bienveillante à domicile ?
            </p>
            <p>
              Parce que, qui mieux qu'une maman peut comprendre les besoins d'une autre maman ? Vous avez vécu 
              la fatigue, les doutes, le baby blues parfois… et vous savez combien une présence douce et rassurante 
              peut tout changer.
            </p>
            <p className="text-xl font-semibold">
              Avec MamSitter, transformez cette expérience en force et devenez celle qui redonne le sourire à d'autres mamans.
            </p>
          </div>
        </div>
      </section>

      {/* What is MamaSitter */}
      <section className="py-16 md:py-20 bg-violet/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-vert mb-4 text-center">
            Être MamaSitter, c'est bien plus qu'un job.
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 mt-12 items-center">
            <div>
              <img
                src="/images/devenirmamsitter2.jpg"
                alt="Accompagner une maman"
                className="rounded-lg shadow-lg w-full object-cover h-96"
              />
            </div>
            
            <div className="space-y-6">
              <p className="text-vert/70">
                Être MamaSitter, ce n'est pas "faire du ménage" ou "garder un bébé". C'est accompagner une jeune 
                maman dans l'un des moments les plus sensibles de sa vie.
              </p>
              
              <p className="text-vert/70">
                C'est offrir du réconfort, de l'écoute, une aide concrète et une présence bienveillante.
              </p>
              
              <p className="text-vert/70 font-semibold">
                C'est permettre à une femme épuisée, isolée ou dépassée de souffler enfin un peu, en toute confiance.
              </p>

              <div className="bg-white rounded-lg p-6 space-y-4">
                <h3 className="font-bold text-lg text-vert">Vous apportez :</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-sable font-bold mr-3">•</span>
                    <span>
                      <strong>Du soutien émotionnel</strong> — une oreille qui comprend, une parole qui rassure.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sable font-bold mr-3">•</span>
                    <span>
                      <strong>Une aide pratique</strong> — quelques tâches du quotidien allégées, un repas préparé, un bébé veillé.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sable font-bold mr-3">•</span>
                    <span>
                      <strong>Une bulle de douceur</strong> — un espace de répit où la maman peut se retrouver.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Become */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-vert mb-12 text-center">
            Comment devenir MamaSitter ?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-violet/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sable">1</span>
              </div>
              <h3 className="text-lg font-semibold text-vert mb-2">Postulez en ligne</h3>
              <p className="text-vert/70">
                Via notre formulaire simple et rapide
              </p>
            </div>

            <div className="text-center">
              <div className="bg-violet/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sable">2</span>
              </div>
              <h3 className="text-lg font-semibold text-vert mb-2">Entretien bienveillant</h3>
              <p className="text-vert/70">
                Nous apprenons à vous connaître
              </p>
            </div>

            <div className="text-center">
              <div className="bg-violet/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sable">3</span>
              </div>
              <h3 className="text-lg font-semibold text-vert mb-2">Rejoignez la communauté</h3>
              <p className="text-vert/70">
                Recevez notre eBook et débutez
              </p>
            </div>
          </div>

          <div className="bg-violet/10 rounded-lg p-8 text-center">
            <p className="text-vert/70 mb-4">
              Accompagnez vos premières mamans près de chez vous.
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Selection */}
      <section className="py-16 md:py-20 bg-beige/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/devenirmamsitter3.jpg"
                alt="Sélection des MamaSitters"
                className="rounded-lg shadow-lg w-full object-cover h-96"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-vert mb-6">
                Une sélection basée sur la confiance
              </h2>
              
              <p className="text-vert/70 mb-6">
                Chaque MamaSitter est sélectionnée avec soin : entretien, vérification d'identité, valeurs humaines 
                et casier judiciaire. Nous protégeons aussi bien les mamans accompagnées que les MamaSitters, car 
                la confiance est le cœur de notre mission.
              </p>

              <div className="bg-violet/20 border-l-4 border-sable p-6">
                <p className="italic text-vert/70 mb-2">
                  "Le rôle de l'aide post-partum est reconnu comme essentiel au bien-être des jeunes mamans."
                </p>
                <p className="text-sm text-vert/50">
                  Source : Santé publique France
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-vert mb-12 text-center">
            Pourquoi rejoindre MamSitter ?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-sable text-white">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-vert">Un rôle précieux</h3>
                <p className="text-vert/70 mt-2">
                  Vous contribuez au bien-être et à la santé mentale des mamans.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-sable text-white">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-vert">Une communauté engagée</h3>
                <p className="text-vert/70 mt-2">
                  Vous rejoignez un réseau de femmes bienveillantes et solidaires.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-sable text-white">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-vert">Une activité flexible</h3>
                <p className="text-vert/70 mt-2">
                  Choisissez vos missions, vos horaires et les familles que vous accompagnez.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-sable text-white">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-vert">Une vraie reconnaissance</h3>
                <p className="text-vert/70 mt-2">
                  Votre temps, votre écoute et vos valeurs sont enfin valorisés.
                </p>
              </div>
            </div>

            <div className="flex gap-4 md:col-span-2">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-sable text-white">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-vert">Une mission pleine de sens</h3>
                <p className="text-vert/70 mt-2">
                  Vous redonnez confiance et sérénité à celles qui en ont le plus besoin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="py-16 md:py-20 bg-violet/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-vert mb-8 text-center">
            En résumé
          </h2>

          <div className="bg-white rounded-lg p-8 mb-8">
            <p className="text-vert/70 mb-4">
              Devenir MamaSitter, c'est :
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-sable font-bold mr-3">✓</span>
                <span className="text-vert/70">Offrir du soutien à d'autres mamans.</span>
              </li>
              <li className="flex items-start">
                <span className="text-sable font-bold mr-3">✓</span>
                <span className="text-vert/70">Travailler à votre rythme, à proximité de chez vous.</span>
              </li>
              <li className="flex items-start">
                <span className="text-sable font-bold mr-3">✓</span>
                <span className="text-vert/70">Trouver un sens nouveau à votre vie professionnelle.</span>
              </li>
              <li className="flex items-start">
                <span className="text-sable font-bold mr-3">✓</span>
                <span className="text-vert/70">Rejoindre un réseau de femmes alignées, solidaires et inspirantes.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-sable to-vert">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Rejoignez l'aventure MamSitter !
          </h2>
          
          <p className="text-xl text-beige mb-8">
            Si vous êtes une maman, une femme douce, patiente et à l'écoute. Si vous aimez aider, partager et transmettre, 
            alors vous avez tout pour devenir MamaSitter.
          </p>

          <p className="text-xl text-beige mb-12 font-semibold">
            Faites la différence dans la vie d'une maman. Faites la différence dans la vôtre.
          </p>

          <a
            href="#/register"
            className="inline-block bg-beige text-sable px-10 py-4 rounded-lg font-bold text-lg hover:bg-beige/90 transition"
          >
            Postuler maintenant
          </a>
        </div>
      </section>
    </div>
  );
}
