import React, { useState } from 'react';
import { Calendar, User, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export default function BlogArticle5Idees() {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Mariah dE',
      date: 'novembre 12, 2025 à 3:05 PM',
      content: 'Merci pour toutes ces idées et cet article bienveillant',
      avatar: '/images/avatar-placeholder.jpg'
    },
    {
      id: 2,
      author: 'Cérina C.',
      date: 'novembre 14, 2025 à 2:10 PM',
      content: "Merci à vous pour votre commentaire, en espérant que l'article vous a aidée dans votre recherche :)",
      avatar: '/images/propos.jpg'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    comment: '',
    subscribe: false,
    remember: false
  });

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmitComment = (e: any) => {
    e.preventDefault();
    const newComment = {
      id: comments.length + 1,
      author: formData.name,
      date: new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      content: formData.comment,
      avatar: '/images/avatar-placeholder.jpg'
    };
    setComments([...comments, newComment]);
    setFormData({ name: '', email: '', website: '', comment: '', subscribe: false, remember: false });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Article Header */}
      <article className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category */}
          <div className="mb-6">
            <span className="inline-block bg-violet/20 text-vert text-xs font-semibold px-3 py-1 rounded">
              Uncategorized
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-vert mb-8">
            5 idées de cadeaux de naissance originaux pour une jeune maman (et pourquoi éviter les peluches !)
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-6 text-vert/70 mb-12 pb-8 border-b border-beige">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Publié le novembre 12, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>par Cérina C.</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>{comments.length} Commentaire{comments.length > 1 ? 's' : ''}</span>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none text-vert/80 space-y-8">
            <p className="text-lg leading-relaxed font-semibold text-vert">
              Quand un bébé arrive, les cadeaux affluent : bodies, peluches, doudous, gigoteuses… Tout le monde pense au nouveau-né, mais qui pense vraiment à la maman ?
            </p>

            <p className="text-lg leading-relaxed">
              Pourtant, c'est elle qui vit les nuits blanches, les montagnes russes émotionnelles, la fatigue extrême du post-partum. Alors, si vous cherchez une idée de cadeau de naissance vraiment utile et pleine de sens, cet article est pour vous.
            </p>

            {/* Section 1 */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-vert">1. Offrir du repos : le plus beau cadeau pour une jeune maman</h2>
              
              <img
                src="/images/article0.jpg"
                alt="Cadeau détente maman naissance post partum"
                className="rounded-lg shadow-lg w-full object-cover h-96"
              />

              <p className="leading-relaxed">
                Le meilleur cadeau de naissance, c'est celui qui soulage la maman. Une aide post-partum à domicile, comme le propose MamSitter, permet à la jeune maman de souffler, se reposer, et reprendre confiance dans ce nouveau rôle parfois déroutant.
              </p>

              <p className="leading-relaxed">
                Une MamaSitter, c'est une présence bienveillante, une grande sœur de cœur qui aide dans les petites tâches du quotidien, s'occupe du bébé quelques heures, ou simplement offre une oreille attentive.
              </p>

              <p className="font-semibold text-sable">
                Offrir une MamaSitter, c'est offrir du temps, de la sérénité et du réconfort.
              </p>

              <p className="text-vert/70 italic">
                Découvrez nos formules « Offrir une MamaSitter » à Genève, Annemasse, Annecy et alentours.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-vert">2. Un massage postnatal à domicile</h2>

              <p className="leading-relaxed">
                Le corps d'une jeune maman a besoin de douceur, pas de jugement. Un massage postnatal est un geste symbolique et réparateur : il aide à relâcher les tensions, à se reconnecter à son corps, et à relancer la circulation après l'accouchement.
              </p>

              <img
                src="/images/article2.jpg"
                alt="Idée cadeau de naissance massage à domicile post-partum"
                className="rounded-lg shadow-lg w-full object-cover h-96"
              />

              <p className="leading-relaxed">
                De plus en plus de praticiennes se déplacent à domicile sur Genève, Annemasse et alentours, pour un moment de détente personnalisé. Un cadeau parfait à glisser dans une jolie carte avec un mot doux.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-vert">3. Un coffret "mom care" plein d'amour</h2>

              <p className="leading-relaxed">
                Au lieu d'un énième pyjama pour bébé, pourquoi ne pas créer un coffret spécial jeune maman ?
              </p>

              <p className="font-semibold text-vert">Quelques idées à y glisser :</p>

              <ul className="space-y-3 text-vert/80">
                <li className="flex gap-3">
                  <span className="text-sable font-bold">•</span>
                  <span><strong>Une infusion allaitement ou détente</strong>, Chez The Maison Bianca, j'aime particulièrement le coffret des futures mamans, qui allie douceur, détente et bienveillance. Une idée parfaite pour accompagner les premiers jours post-partum avec tendresse.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-sable font-bold">•</span>
                  <span><strong>Une bougie naturelle</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-sable font-bold">•</span>
                  <span><strong>Un masque hydratant visage</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-sable font-bold">•</span>
                  <span><strong>Des snacks sains</strong> (parce qu'elle oublie souvent de manger !)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-sable font-bold">•</span>
                  <span><strong>Et une petite carte</strong> avec des mots bienveillants</span>
                </li>
              </ul>

              <img
                src="/images/devenirmamsitter5.jpg"
                alt="Coffret cadeau naissance mom care"
                className="rounded-lg shadow-lg w-full object-cover h-96"
              />

              <p className="leading-relaxed">
                Ce type de coffret existe déjà, mais le plus beau reste celui que vous composez avec le cœur.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-vert">4. Un journal de post-partum ou carnet de gratitude</h2>

              <p className="leading-relaxed">
                Après la naissance, les émotions se bousculent. Un journal de post-partum est un compagnon intime pour noter les petits moments de joie, les peurs, les progrès…
              </p>

              <img
                src="/images/Coffret Douce Nuit.png"
                alt="Idée cadeau de naissance journal post partum"
                className="rounded-lg shadow-lg w-full object-cover h-96"
              />

              <p className="leading-relaxed">
                C'est une belle façon d'encourager la jeune maman à se reconnecter à elle-même, à prendre du recul et à observer son évolution jour après jour.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-vert">5. Une présence bienveillante… pas un objet</h2>

              <p className="leading-relaxed">
                Au fond, la plupart des mamans ne réclament pas des choses, mais une présence. Quelqu'un qui dit : "Je suis là, repose-toi, je m'occupe de tout."
              </p>

              <p className="leading-relaxed">
                C'est exactement ce que propose MamSitter : une aide post-partum à domicile pour les mamans épuisées, isolées, ou en plein baby blues.
              </p>

              <p className="font-semibold text-lg text-sable">
                Parce qu'il n'y a rien de plus précieux qu'une maman qui retrouve le sourire. Et parfois, le plus beau cadeau, c'est simplement un peu d'aide.
              </p>
            </div>
          </div>

          {/* Article Navigation */}
          <div className="grid grid-cols-2 gap-8 mt-16 pt-8 border-t border-beige">
            <a
              href="#/blog/fatigue-baby-blues-pourquoi-aide-post-partum"
              className="flex items-center gap-2 text-sable hover:text-sable/80 transition group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm">Article précédent</span>
            </a>
            <a
              href="#/blog/aide-post-partum-mamsitter-premières-semaines"
              className="flex items-center justify-end gap-2 text-sable hover:text-sable/80 transition group"
            >
              <span className="text-sm">Article suivant</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </article>

      {/* Author Section */}
      <section className="bg-beige/20 py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 items-start">
            <img
              src="/images/propos.jpg"
              alt="Cérina C."
              className="w-20 h-20 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-vert mb-1">CÉRINA C.</h3>
              <p className="text-sm text-vert/70 mb-4">
                Cérina C. fondatrice de MamSitter & créatrice du podcast Mamans & Femmes - Confidences sous bienveillance
              </p>
              
            </div>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-vert mb-12">
            {comments.length} Commentaire{comments.length > 1 ? 's' : ''} sur "5 idées de cadeaux..."
          </h2>

          {/* Comments List */}
          <div className="space-y-8 mb-16">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4 pb-8 border-b border-beige last:border-0">
                <img
                  src={comment.author === 'Cérina C.' ? '/images/propos.jpg' : '/images/avatar-placeholder.jpg'}
                  alt={comment.author}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-vert">{comment.author}</h4>
                    <a href="#" className="text-sm text-sable hover:text-sable/80 transition">
                      Signaler
                    </a>
                  </div>
                  <p className="text-xs text-vert/60 mb-3">{comment.date}</p>
                  <p className="text-vert/80 leading-relaxed">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Comment Form */}
          <div className="border-t-2 border-beige pt-12">
            <h3 className="text-2xl font-bold text-vert mb-6">Laisser un commentaire</h3>
            <p className="text-vert/70 mb-6">
              Votre adresse e-mail ne sera pas publiée. Les champs obligatoires sont indiqués avec <span className="text-sable font-bold">*</span>
            </p>

            <form onSubmit={handleSubmitComment} className="space-y-6">
              {/* Comment Textarea */}
              <div>
                <label className="block font-bold text-vert mb-3">
                  Commentaire <span className="text-sable">*</span>
                </label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-beige rounded-lg focus:outline-none focus:border-sable resize-none"
                  placeholder="Votre commentaire..."
                />
              </div>

              {/* Name, Email, Website */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block font-bold text-vert mb-3">
                    Nom <span className="text-sable">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-beige rounded-lg focus:outline-none focus:border-sable"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block font-bold text-vert mb-3">
                    E-mail <span className="text-sable">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-beige rounded-lg focus:outline-none focus:border-sable"
                    placeholder="Votre email"
                  />
                </div>
                <div>
                  <label className="block font-bold text-vert mb-3">Site web</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-beige rounded-lg focus:outline-none focus:border-sable"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleInputChange}
                    className="w-4 h-4 accent-sable"
                  />
                  <span className="text-sm text-vert">Enregistrer mon nom, mon e-mail et mon site dans le navigateur pour mon prochain commentaire.</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="subscribe"
                    checked={formData.subscribe}
                    onChange={handleInputChange}
                    className="w-4 h-4 accent-sable"
                  />
                  <span className="text-sm text-vert">Oui, je veux recevoir la newsletter MamSitter</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-vert text-white px-8 py-3 rounded-lg font-bold uppercase text-sm hover:bg-vert/90 transition tracking-wide"
              >
                Laisser un commentaire
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Related Articles CTA */}
      <section className="py-16 md:py-24 bg-beige/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-vert mb-6">
            Besoin d'aide concrète ?
          </h2>
          <p className="text-lg text-vert/70 mb-8">
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
