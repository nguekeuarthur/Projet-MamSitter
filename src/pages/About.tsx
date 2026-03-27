import React from 'react';
import { Heart, Sprout, Users, Star, Gift } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Bienveillance',
      description: 'chaque MamaSitter est avant tout une présence rassurante, sans jugement.'
    },
    {
      icon: Sprout,
      title: 'Authenticité',
      description: 'nous croyons aux relations sincères et aux échanges humains.'
    },
    {
      icon: Users,
      title: 'Confiance',
      description: 'nous faisons tout pour sécuriser et encadrer chaque mise en relation.'
    },
    {
      icon: Star,
      title: 'Solidarité',
      description: 'MamSitter est avant tout un réseau d\'entraide, créé pour alléger le quotidien des mamans.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-beige py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-vert mb-6 text-center">
            L'histoire derrière <span className="text-sable">MamSitter</span>
          </h1>
          <p className="text-xl text-vert/70 max-w-3xl mx-auto text-center">
            MamSitter est née d'une histoire personnelle et d'un constat partagé par de nombreuses mamans : 
            la maternité est une aventure aussi merveilleuse qu'éprouvante.
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/propos.jpg"
                alt="Cérina, fondatrice de MamSitter"
                className="rounded-lg shadow-lg w-full object-cover h-96"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-vert">
                Qui suis-je ?
              </h2>

              <p className="text-vert/70 leading-relaxed">
                Je m'appelle <strong>Cérina</strong>, fondatrice de MamSitter. Après un parcours en finance et en gestion 
                de projets, j'ai choisi de créer une plateforme d'aide post-partum à domicile, pensée pour les mamans 
                de Genève, Annemasse et leurs environs.
              </p>

              <p className="text-vert/70 leading-relaxed">
                Lorsque je suis devenue maman, j'ai compris combien il est précieux d'avoir quelqu'un à ses côtés, 
                non pas pour faire à notre place, mais pour écouter, rassurer et alléger le quotidien.
              </p>

              <p className="text-vert/70 leading-relaxed font-semibold">
                C'est de ce besoin qu'est née MamSitter : un service bienveillant d'accompagnement postnatal, 
                imaginé par une maman, pour les mamans. Ici, chaque femme peut trouver une aide de confiance à domicile, 
                adaptée à sa réalité et à ses besoins.
              </p>

              <div className="bg-violet/20 border-l-4 border-sable p-6 mt-6">
                <p className="italic text-vert/70">
                  "Selon <a href="https://www.santepubliquefrance.fr/" target="_blank" rel="noopener noreferrer" className="underline hover:text-sable transition-colors">Santé publique France</a>, près d'une mère sur cinq ressent une fatigue intense ou un baby blues 
                  après la naissance."
                </p>
              </div>

              <a
                href="#/contact"
                className="inline-block bg-sable text-white px-8 py-3 rounded-lg font-semibold hover:bg-sable/90 transition mt-4"
              >
                Contactez-moi
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-20 bg-violet/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 md:order-1">
              <h2 className="text-3xl font-bold text-vert">
                Notre mission
              </h2>

              <p className="text-vert/70 leading-relaxed text-lg font-semibold">
                Notre mission est claire : Apporter du réconfort, du soutien et de la sérénité aux mamans à travers 
                un service simple, humain et sécurisé.
              </p>

              <p className="text-vert/70 leading-relaxed">
                Parce qu'une maman apaisée, c'est aussi un bébé épanoui, un foyer épanoui.
              </p>

            </div>

            <div className="order-1 md:order-2">
              <img
                src="/images/propos2.jpg"
                alt="Notre mission"
                className="rounded-lg shadow-lg w-full object-cover h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-vert mb-6">
            Une communauté bienveillante
          </h2>

          <p className="text-vert/70 leading-relaxed text-lg max-w-3xl mx-auto mb-12">
            MamSitter, c'est bien plus qu'une plateforme : c'est une communauté d'entraide et de bienveillance 
            dédiée aux jeunes mamans qui traversent la période sensible du post-partum.
          </p>

          <div className="bg-beige/30 rounded-lg p-8 mb-12">
            <p className="text-vert/70 leading-relaxed mb-6">
              Nous mettons en relation des femmes fatiguées, parfois isolées après la naissance, avec des MamaSitters : 
              des accompagnantes à domicile bienveillantes, expérimentées et à l'écoute, formées pour apporter une aide 
              post-partum concrète et humaine.
            </p>

            <p className="text-vert/70 leading-relaxed">
              Qu'il s'agisse d'un soutien émotionnel, d'un coup de main à la maison, d'un moment de répit pour se reposer 
              ou prendre soin de soi, ou simplement d'une présence rassurante, MamSitter permet à chaque maman de retrouver 
              de la sérénité, de se sentir comprise et de ne plus vivre seule sa fatigue, son baby blues ou ses doutes.
            </p>
          </div>

          <p className="text-vert/70 leading-relaxed text-lg font-semibold">
            Parce qu'aucune femme ne devrait affronter seule les premiers mois après la naissance, MamSitter est là — 
            pour alléger le quotidien, écouter sans juger et redonner confiance à chaque maman.
          </p>
        </div>
      </section>

      {/* Why MamSitter */}
      <section className="py-16 md:py-20 bg-violet/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-vert mb-12 text-center">
            Pourquoi MamSitter ?
          </h2>

          <div className="bg-white rounded-lg p-8 mb-8 space-y-4">
            <div className="flex items-start gap-4">
              <span className="text-2xl">✓</span>
              <p className="text-vert/70">Parce qu'aucune maman ne devrait se sentir seule.</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl">✓</span>
              <p className="text-vert/70">Parce que demander de l'aide est une force.</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl">✓</span>
              <p className="text-vert/70">Parce que chaque femme mérite d'être accompagnée dans ce moment unique de sa vie.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="/images/propos3.jpg"
                alt="Pourquoi MamSitter"
                className="rounded-lg shadow-lg w-full object-cover h-96"
              />
            </div>

            <div className="bg-beige rounded-lg p-8">
              <p className="text-vert/70 leading-relaxed text-lg mb-6">
                MamSitter, c'est l'idée simple mais essentielle :
              </p>
              <p className="text-2xl font-bold text-sable mb-6">
                Prendre soin des mamans, pour qu'elles puissent mieux prendre soin de leurs bébés.
              </p>
              <a
                href="#/search"
                className="inline-block bg-sable text-white px-8 py-3 rounded-lg font-semibold hover:bg-sable/90 transition"
              >
                Trouver ma MamaSitter
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-vert mb-12 text-center">
            Nos valeurs
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-beige/20 rounded-lg p-6 flex gap-4">
                  <div className="flex-shrink-0">
                    <Icon className="w-8 h-8 text-sable" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-vert mb-2">{value.title}</h3>
                    <p className="text-vert/70">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gift Section */}
      <section className="py-16 md:py-20 bg-violet/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/propos4.jpg"
                alt="Cadeau de naissance"
                className="rounded-lg shadow-lg w-full object-cover h-96"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-vert flex items-center gap-3">
                <Gift className="w-8 h-8 text-sable" />
                Un cadeau de naissance plein de sens
              </h2>

              <p className="text-vert/70 leading-relaxed">
                Et si le plus beau cadeau de naissance, c'était du repos et du soutien pour la maman ? 
                Offrir quelques heures d'aide post-partum à domicile, c'est offrir du temps, de la douceur 
                et du réconfort à une jeune maman qui en a besoin.
              </p>

              <p className="text-vert/70 leading-relaxed font-semibold">
                Un cadeau de naissance original, utile et plein d'amour, bien plus précieux qu'un simple objet.
              </p>

              <a
                href="#/contact"
                className="inline-block bg-sable text-white px-8 py-3 rounded-lg font-semibold hover:bg-sable/90 transition"
              >
                Offrir une aide post-partum
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-sable to-vert">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Une demande en particulier ?
          </h2>

          <p className="text-xl text-beige mb-8">
            N'attendez-pas pour nous contacter !
          </p>

          <p className="text-lg text-beige mb-12">
            Que ce soit pour trouver une MamaSitter ou pour offrir un accompagnement post-partum en cadeau de naissance, 
            l'équipe MamSitter est là pour vous guider avec douceur et bienveillance.
          </p>

          <a
            href="#/contact"
            className="inline-block bg-beige text-sable px-10 py-4 rounded-lg font-bold text-lg hover:bg-beige/90 transition"
          >
            Nous contacter
          </a>
        </div>
      </section>
    </div>
  );
}
