import { Star, Ribbon, Users } from 'lucide-react';

export default function MamaSitters() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-bold text-vert font-poppins mb-6 uppercase tracking-wide">
                    Nos MamaSitters
                </h1>
                <p className="text-xl text-gray-600 font-lato max-w-3xl mx-auto leading-relaxed">
                    À mi-chemin entre nounou, fée du logis, doula post-natale et grande sœur,
                    qui sont les femmes exceptionnelles constituant la communauté MamSitter ?
                </p>
            </div>

            <div className="bg-beige/40 rounded-3xl p-8 sm:p-12 shadow-sm mb-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img
                            src="https://images.pexels.com/photos/1018695/pexels-photo-1018695.jpeg?auto=compress&cs=tinysrgb&w=800"
                            alt="Profil MamaSitter"
                            className="rounded-full shadow-lg border-4 border-white w-full h-auto object-cover max-w-md mx-auto aspect-square"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-sable font-poppins uppercase">
                            Une sélection rigoureuse et bienveillante
                        </h2>
                        <p className="text-gray-700 font-lato leading-relaxed">
                            Nous portons une attention toute particulière aux profils retenus sur notre plateforme. Ce ne sont pas des prestataires de santé ni des expertes médicales, mais des auxiliaires expérimentées : puéricultrices retraitées, mères accomplies, gardes d'enfants en bas âge certifiées.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center space-x-3 text-vert font-lato font-semibold">
                                <Star className="text-sable w-6 h-6" />
                                <span>Expérience ou certification post-partum validée</span>
                            </li>
                            <li className="flex items-center space-x-3 text-vert font-lato font-semibold">
                                <Ribbon className="text-sable w-6 h-6" />
                                <span>Validation du casier judiciaire</span>
                            </li>
                            <li className="flex items-center space-x-3 text-vert font-lato font-semibold">
                                <Users className="text-sable w-6 h-6" />
                                <span>Formation interne MamSitter suivie avec succès</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="text-center bg-sable rounded-3xl p-8 sm:p-16 text-white shadow-md">
                <h2 className="text-3xl font-bold font-poppins mb-6 uppercase">
                    Vous souhaitez rejoindre l'aventure ?
                </h2>
                <p className="text-lg font-lato mb-8 max-w-2xl mx-auto">
                    Devenez l'alliée dont vous auriez rêvé, et apportez sérénité et réconfort dans le foyer des jeunes parents.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#/register" className="bg-white text-sable px-8 py-4 rounded-full font-bold uppercase tracking-wide hover:bg-beige transition-colors">
                        Créer mon compte
                    </a>
                    <a href="#become-sitter" className="bg-transparent border-2 border-white px-8 py-4 rounded-full font-bold uppercase tracking-wide hover:bg-white/10 transition-colors">
                        En savoir plus
                    </a>
                </div>
            </div>
        </div>
    );
}
