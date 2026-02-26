import { Link } from "react-router-dom";
import {
  MapPin,
  Calendar,
  ShieldCheck,
  Baby,
  Star,
  Phone,
  Mail,
  BadgeCheck,
  FileText,
  Clock,
  Ban,
  XCircle,
} from "lucide-react";

const availability = [
  { day: "Lundi", hours: "9h - 18h" },
  { day: "Mardi", hours: "9h - 18h" },
  { day: "Mercredi", hours: "9h - 13h" },
  { day: "Jeudi", hours: "9h - 18h" },
  { day: "Vendredi", hours: "9h - 16h" },
];

const reviews = [
  {
    id: "r1",
    name: "Camille B.",
    date: "12 jan. 2026",
    rating: 5,
    text: "Claire a été d’une douceur incroyable. Elle m’a aidée à reprendre confiance et à instaurer une routine apaisante avec bébé.",
  },
  {
    id: "r2",
    name: "Sarah M.",
    date: "03 déc. 2025",
    rating: 4,
    text: "Très disponible et à l’écoute. J’ai particulièrement apprécié ses conseils pratiques post‑partum.",
  },
];

const status = "validé";
const isAdmin = false;

const statusConfig = {
  "en attente": { label: "En attente", icon: Clock, tone: "bg-yellow-100 text-yellow-700" },
  "validé": { label: "Validé", icon: BadgeCheck, tone: "bg-green-100 text-green-700" },
  "refusé": { label: "Refusé", icon: XCircle, tone: "bg-red-100 text-red-700" },
  "blacklisté": { label: "Blacklisté", icon: Ban, tone: "bg-red-100 text-red-700" },
};

export default function ProfileMamaSitter() {
  return (
    <section className="bg-beige px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-green font-lato">
              Profil MamaSitter
            </p>
            <div className="flex items-center gap-3 mt-2">
              <h1 className="text-3xl md:text-4xl font-bold text-green">
                Claire D.
              </h1>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400" />
                <span className="text-sm text-gray-600 ml-1">4.9</span>
              </div>
            </div>
          </div>
          <Link
            to="/"
            className="bg-white text-green border border-green/30 px-5 py-2.5 rounded-full font-lato uppercase tracking-wide text-sm hover:bg-green hover:text-white transition"
          >
            Retour à l’accueil
          </Link>
        </div>

        <div className="mt-8 grid lg:grid-cols-[1.2fr_1fr] gap-10">
          <div className="bg-white rounded-3xl shadow p-8 space-y-8">
            <div className="flex flex-wrap items-center gap-6">
              <img
                src="https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="MamaSitter Claire"
                className="w-28 h-28 rounded-2xl object-cover"
              />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-green">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Lyon 69006</span>
                </div>
                <div className="flex items-center gap-2 text-green">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-sm">Profil vérifié</span>
                </div>
                <div className="flex items-center gap-2 text-green">
                  <Baby className="w-4 h-4" />
                  <span className="text-sm">4 ans d’expérience</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-green">Informations personnelles</h2>
              <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <p className="text-gray-500">Prénom</p>
                  <p className="font-semibold">Claire</p>
                </div>
                <div>
                  <p className="text-gray-500">Nom</p>
                  <p className="font-semibold">D.</p>
                </div>
                <div>
                  <p className="text-gray-500">Ville</p>
                  <p className="font-semibold">Lyon</p>
                </div>
                <div>
                  <p className="text-gray-500">Code postal</p>
                  <p className="font-semibold">69006</p>
                </div>
                <div>
                  <p className="text-gray-500">Téléphone</p>
                  <p className="font-semibold">+33 6 12 34 56 78</p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-semibold">claire@mamsitter.com</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-green">Description</h2>
              <p className="text-gray-700 mt-3 leading-relaxed">
                Je suis accompagnante post-partum, formée à l’écoute active et aux
                soins de base du nouveau-né. J’aide les jeunes mamans à retrouver
                confiance, à se reposer et à vivre sereinement les premières semaines
                avec bébé.
              </p>
            </div>

            <div className="bg-beige rounded-2xl p-4 text-sm text-green flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Zone d’intervention : Lyon, Villeurbanne, Tassin, Écully (10 km)
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow p-8">
              <h2 className="text-xl font-semibold text-green">Statut du profil</h2>
              <div className="mt-4 flex items-center gap-2">
                {(() => {
                  const cfg = statusConfig[status as keyof typeof statusConfig];
                  const Icon = cfg.icon;
                  return (
                    <span className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm ${cfg.tone}`}>
                      <Icon className="w-4 h-4" />
                      {cfg.label}
                    </span>
                  );
                })()}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow p-8">
              <h2 className="text-xl font-semibold text-green">Disponibilités</h2>
              <div className="mt-4 space-y-3">
                {availability.map((slot) => (
                  <div key={slot.day} className="flex items-center justify-between">
                    <span className="text-gray-700">{slot.day}</span>
                    <span className="text-green font-semibold">{slot.hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-green">
                <Calendar className="w-4 h-4" />
                Réservation possible sous 48h
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow p-8">
              <h2 className="text-xl font-semibold text-green">Avis des mamans</h2>
              <div className="mt-4 space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border border-gray-100 rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-green">{review.name}</p>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500 mt-2">
                      {Array(review.rating)
                        .fill(0)
                        .map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400" />
                        ))}
                    </div>
                    <p className="text-sm text-gray-700 mt-2">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {isAdmin && (
              <div className="bg-white rounded-3xl shadow p-8">
                <h2 className="text-xl font-semibold text-green">
                  RIB / Informations bancaires
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Champ sécurisé — visible uniquement par l’administratrice.
                </p>
                <div className="mt-4 grid gap-3 text-sm text-gray-700">
                  <div>
                    <p className="text-gray-500">Titulaire</p>
                    <p className="font-semibold">Claire D.</p>
                  </div>
                  <div>
                    <p className="text-gray-500">IBAN</p>
                    <p className="font-semibold">FR76 XXXX XXXX XXXX XXXX XXXX XXX</p>
                  </div>
                  <div>
                    <p className="text-gray-500">BIC</p>
                    <p className="font-semibold">XXXXFRPP</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
