import React from 'react';
import { Calendar, User, MessageCircle, ChevronRight } from 'lucide-react';

export default function Blog() {
  const articles = [
    {
      id: 1,
      title: "5 idées de cadeaux de naissance originaux pour une jeune maman (et pourquoi éviter les peluches !)",
      date: "novembre 12, 2025",
      author: "Cérina C.",
      category: "Uncategorized",
      comments: 2,
      slug: "5-idees-cadeaux-naissance-originaux",
      excerpt: "Découvrez des idées de cadeaux de naissance vraiment utiles et originaux qui feront la différence pour une jeune maman."
    },
    {
      id: 2,
      title: "Aide post-partum à domicile : comment MamSitter soutient les jeunes mamans dans les premières semaines.",
      date: "novembre 6, 2025",
      author: "Cérina C.",
      category: "Uncategorized",
      comments: 0,
      slug: "aide-post-partum-mamsitter-premieres-semaines",
      excerpt: "Explorez comment MamSitter offre un accompagnement personnalisé et bienveillant aux jeunes mamans durant leurs premières semaines."
    },
    {
      id: 3,
      title: "Aide post-partum : le soutien bienveillant qui change la vie des mamans épuisées.",
      date: "novembre 6, 2025",
      author: "Cérina C.",
      category: "Uncategorized",
      comments: 0,
      slug: "aide-post-partum-soutien-mamans-epuisees",
      excerpt: "Apprenez comment un soutien post-partum réel peut transformer l'expérience des jeunes mamans et les aider à surmonter la fatigue."
    },
    {
      id: 4,
      title: "Cadeau de naissance original : offrir une aide post-partum à une jeune maman.",
      date: "octobre 24, 2025",
      author: "Cérina C.",
      category: "MamSitter, le blog",
      comments: 0,
      slug: "cadeau-naissance-aide-post-partum",
      excerpt: "Quand un bébé arrive, les cadeaux affluent : peluches, bodies, doudous, gigoteuses…Mais qui pense vraiment à la maman…?"
    },
    {
      id: 5,
      title: "Fatigue, baby blues, solitude : pourquoi chaque maman a besoin d'une aide post-partum.",
      date: "octobre 24, 2025",
      author: "Cérina C.",
      category: "MamSitter, le blog",
      comments: 0,
      slug: "fatigue-baby-blues-pourquoi-aide-post-partum",
      excerpt: "Devenir maman est un bonheur immense… mais aussi un bouleversement intense. Entre les nuits courtes, la fatigue accumulée, le baby-blues et les responsabilités nouvelles, la période post-partum peut rapidement devenir écrasante…"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section 
        className="relative overflow-hidden py-20 md:py-32 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/banniere-blog.png)'
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        {/* <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
            MamSitter, <span className="text-sable">le blog</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto text-center">
            Conseils, astuces et histoires pour soutenir chaque maman dans son parcours post-partum.
          </p>
        </div> */}
      </section>

      {/* Blog Articles */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {articles.map((article, index) => (
              <article
                key={article.id}
                className={`pb-8 ${index !== articles.length - 1 ? 'border-b border-beige' : ''}`}
              >
                {/* Category Tag */}
                <div className="mb-3">
                  <span className="inline-block bg-violet/20 text-vert text-xs font-semibold px-3 py-1 rounded">
                    {article.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-vert mb-4 hover:text-sable transition">
                  <a href={`#/blog/${article.slug}`}>
                    {article.title}
                  </a>
                </h2>

                {/* Meta Information */}
                <div className="flex flex-wrap gap-4 md:gap-6 text-sm text-vert/70 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Publié le {article.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>par {article.author}</span>
                  </div>
                  {article.comments > 0 && (
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>{article.comments} Commentaire{article.comments > 1 ? 's' : ''}</span>
                    </div>
                  )}
                </div>

                {/* Excerpt */}
                <p className="text-vert/70 leading-relaxed mb-6 text-lg">
                  {article.excerpt}
                </p>

                {/* Read More Link */}
                <a
                  href={`#/blog/${article.slug}`}
                  className="inline-flex items-center gap-2 text-sable font-semibold hover:gap-3 transition-all"
                >
                  Continuer la lecture
                  <ChevronRight className="w-4 h-4" />
                </a>
              </article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 pt-16 border-t border-beige">
            <div className="bg-violet/10 rounded-lg p-8 md:p-12 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-vert mb-4">
                Recevez nos articles directement dans votre boîte de réception
              </h3>
              <p className="text-vert/70 mb-6">
                Des conseils, des histoires et du soutien pour vous accompagner dans votre maternité.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <input
                  type="email"
                  placeholder="Votre adresse e-mail"
                  className="px-4 py-3 border-2 border-beige rounded-lg focus:outline-none focus:border-sable w-full sm:w-64"
                />
                <button className="bg-sable text-white px-8 py-3 rounded-lg font-semibold hover:bg-sable/90 transition whitespace-nowrap">
                  S'abonner
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-beige/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-vert mb-6">
            Besoin d'aide concrète ?
          </h2>
          <p className="text-xl text-vert/70 mb-8 max-w-2xl mx-auto">
            Au-delà des articles, MamSitter est là pour vous offrir un accompagnement personnalisé et bienveillant.
          </p>
          <a
            href="#/search"
            className="inline-block bg-sable text-white px-8 py-4 rounded-lg font-semibold hover:bg-sable/90 transition text-lg"
          >
            Trouver une MamaSitter
          </a>
        </div>
      </section>
    </div>
  );
}
