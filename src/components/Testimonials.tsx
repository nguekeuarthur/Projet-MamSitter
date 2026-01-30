import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sophie Martin',
    location: 'Paris',
    rating: 5,
    text: "Ma MamaSitter a été d'un soutien incroyable pendant mes premières semaines. Elle m'a aidée à prendre confiance en moi et m'a donné des conseils précieux. Je recommande à 100% !",
    image: 'https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    name: 'Laura Dubois',
    location: 'Genève',
    rating: 5,
    text: "Le forfait Sérénité m'a littéralement sauvé la vie. Avoir quelqu'un qui s'occupe des repas et du ménage pendant que je me reposais avec bébé : un luxe indispensable !",
    image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    name: 'Emma Rousseau',
    location: 'Lyon',
    rating: 5,
    text: "J'ai opté pour le forfait Douce Nuit après une semaine épuisante. Pouvoir dormir une nuit complète m'a redonné de l'énergie. Service professionnel et bienveillant.",
    image: 'https://images.pexels.com/photos/3755511/pexels-photo-3755511.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
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
          <div className="inline-flex items-center space-x-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-sable">4.9/5</span>
            <span className="text-vert/70">basé sur 320+ avis</span>
          </div>
        </div>
      </div>
    </section>
  );
}
