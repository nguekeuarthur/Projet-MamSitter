import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ola B.',
    location: 'Ambilly',
    rating: 5,
    text: "Après la naissance de ma fille, je me sentais débordée. Grâce à MamSitter, j'ai enfin pu souffler en toute confiance et soulager ma charge mentale. Une vraie bouffée d'oxygène pour moi et de douceur pour mon bébé !",
    image: 'https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    name: 'Dalya D.',
    location: 'Genève',
    rating: 5,
    text: "Au-delà de la garde, ma MamaSitter m'a apporté une écoute et un soutien moral dont j'avais vraiment besoin. J'ai eu l'impression d'être comprise et accompagnée. C'est une aide précieuse pour chaque maman.",
    image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    name: 'Hanna B.',
    location: 'Annemass',
    rating: 5,
    text: "Être près de mon bébé tout en ayant du temps pour moi a été un véritable soulagement. Avec ma MamaSitter, j'ai eu confiance tout de suite. J'ai pu prendre du temps pour moi tout en étant sereine. Merci encore.",
    image: 'https://images.pexels.com/photos/3755511/pexels-photo-3755511.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-beige">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-vert font-poppins uppercase tracking-wide">
            Elles nous font confiance
          </h2>
          <p className="text-xl max-w-2xl mx-auto text-vert/70 font-poppins">
            Découvrez les expériences de mamans qui ont été accompagnées par nos MamaSitters.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow relative bg-beige"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-sable opacity-30" />

              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                />
                <div>
                  <h4 className="font-bold text-sable font-poppins">{testimonial.name}</h4>
                  <p className="text-sm text-vert/70">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="leading-relaxed relative z-10 text-vert/80 font-poppins">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
         
        </div>
      </div>
    </section>
  );
}
