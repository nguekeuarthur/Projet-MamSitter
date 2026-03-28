import React, { useState } from 'react';
import { Calendar, User, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export default function BlogArticleAidePostPartum() {
  const [comments, setComments] = useState<any[]>([]);

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
            Aide post-partum à domicile : comment MamSitter soutient les jeunes mamans dans les premières semaines
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-6 text-vert/70 mb-12 pb-8 border-b border-beige">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Publié le novembre 6, 2025</span>
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
              Les premières semaines après la naissance peuvent être un vrai défi.
            </p>

            <p className="text-lg leading-relaxed">
              Entre les nuits courtes, les nouvelles responsabilités et le corps qui se remet de l'accouchement, il est facile pour une maman de se sentir dépassée. C'est là que MamSitter intervient, avec un accompagnement pratique et bienveillant.
            </p>

            {/* Section 1 */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-vert">Un soutien concret au quotidien</h2>

              <h3 className="text-2xl font-bold text-sable">Organisation et gestion du quotidien</h3>

              <p className="leading-relaxed">
                MamSitter aide la maman à gérer les tâches quotidiennes : préparation de repas, organisation de l'espace pour le bébé, suivi des rendez-vous médicaux. Cela libère du temps pour se reposer et profiter de son bébé.
              </p>

              <img
                src="/images/article5.jpg"
                alt="MamaSitter aide post-partum batch cooking"
                className="rounded-lg shadow-lg w-full object-cover h-96"
              />
            </div>

            {/* Section 2 */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-sable">Accompagnement pour l'allaitement et les soins du bébé</h3>

              <p className="leading-relaxed">
                Nos MamSitters formées apportent des conseils pour l'allaitement, le change, le bain et l'hygiène, avec une approche douce et rassurante.
              </p>

              <img
                src="/images/article6.jpg"
                alt="Aide post-partum et soins du bébé"
                className="rounded-lg shadow-lg w-full object-cover h-96"
              />
            </div>

            {/* Section 3 */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-sable">Soutien émotionnel et écoute</h3>

              <p className="leading-relaxed">
                La maternité peut être intense émotionnellement. MamSitter est là pour écouter, encourager et offrir un espace sûr où la maman peut exprimer ses ressentis sans jugement.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-sable">Comment obtenir une réduction sur ma MamaSitter en France avec le CESUS</h3>

              <p className="leading-relaxed">
                Le Chèque Emploi Service Universel (CESUS) est un dispositif qui permet aux familles de bénéficier d'aides fiscales pour l'emploi de services à la personne. MamSitter est éligible au CESUS, ce qui peut représenter une économie significative pour votre budget post-partum.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-6 bg-violet/10 p-8 rounded-lg border-l-4 border-sable">
              <h2 className="text-3xl font-bold text-vert">Pourquoi chaque maman mérite cet accompagnement post-partum</h2>

              <p className="leading-relaxed">
                Offrir ou bénéficier d'un service post-partum, c'est bien plus qu'une aide pratique : c'est un soutien émotionnel, une sécurité et une confiance retrouvée. MamSitter transforme les premières semaines en moments plus sereins, pour que la maman profite pleinement de son bébé sans se sentir seule ou débordée.
              </p>

              <p className="text-lg font-semibold text-sable">
                Découvrez nos MamaSitters, présentes pour le moment sur Genève et en Haute Savoie !
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-vert">En conclusion</h2>

              <p className="text-lg leading-relaxed">
                Que ce soit pour se reposer, se sentir soutenue ou simplement profiter des instants précieux avec son bébé, MamSitter est là pour rendre la maternité plus douce.
              </p>

              <p className="text-lg font-semibold text-vert italic">
                Et vous, êtes-vous prêt(e) à offrir ou à demander cet accompagnement unique pour ces premières semaines ?
              </p>
            </div>
          </div>

          {/* Article Navigation */}
          <div className="grid grid-cols-2 gap-8 mt-16 pt-8 border-t border-beige">
            <a
              href="#/blog/5-idees-cadeaux-naissance-originaux"
              className="flex items-center gap-2 text-sable hover:text-sable/80 transition group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm">Article précédent</span>
            </a>
            <a
              href="#/blog/aide-post-partum-soutien-mamans-epuisees"
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
            {comments.length} Commentaire{comments.length > 1 ? 's' : ''} sur "Aide post-partum à domicile..."
          </h2>

          {/* Comments List */}
          {comments.length > 0 && (
            <div className="space-y-8 mb-16">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4 pb-8 border-b border-beige last:border-0">
                  <img
                    src={comment.avatar}
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
          )}

          {/* Comment Form */}
          <div className={comments.length > 0 ? 'border-t-2 border-beige pt-12' : ''}>
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
