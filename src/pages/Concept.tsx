import { Heart, ShieldCheck, Sun } from 'lucide-react';

export default function Concept() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-bold text-vert font-poppins mb-6 uppercase tracking-wide">
                    Notre Concept
                </h1>
                <p className="text-xl text-gray-600 font-lato max-w-3xl mx-auto leading-relaxed">
                    MamSitter est née d'une conviction profonde : le post-partum ne devrait jamais être traversé dans l'isolement ou l'épuisement. Nous avons créé ce réseau de soutien pour choyer chaque jeune maman comme elle chérit son propre enfant.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 mb-16">
                <div className="bg-beige/40 rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 mx-auto bg-sable rounded-full flex items-center justify-center mb-6 shadow-inner">
                        <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-vert font-poppins mb-4 uppercase">Bienveillance</h3>
                    <p className="text-gray-700 font-lato leading-relaxed">
                        Nous valorisons le non-jugement absolu. Chaque maman est unique et l'accompagnement prodigué respecte ses choix, son rythme et ses émotions propres.
                    </p>
                </div>

                <div className="bg-beige/40 rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 mx-auto bg-vert rounded-full flex items-center justify-center mb-6 shadow-inner">
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-vert font-poppins mb-4 uppercase">Soutien logistique et moral</h3>
                    <p className="text-gray-700 font-lato leading-relaxed">
                        Des tâches ménagères à la préparation de repas nutritifs, sans oublier une oreille attentive. La MamaSitter allège physiquement et mentalement le quotidien de la famille.
                    </p>
                </div>

                <div className="bg-beige/40 rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 mx-auto bg-sable rounded-full flex items-center justify-center mb-6 shadow-inner">
                        <Sun className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-vert font-poppins mb-4 uppercase">Le Village Recréé</h3>
                    <p className="text-gray-700 font-lato leading-relaxed">
                        "Il faut un village pour élever un enfant." MamSitter remplace le village manquant et reconnecte les jeunes parents au confort d'une présence douce et rassurante en convalescence post-natale.
                    </p>
                </div>
            </div>

            <div className="bg-gradient-to-br from-beige to-white rounded-3xl p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center gap-12 border border-vert/10">
                <div className="md:w-1/2 space-y-6">
                    <h2 className="text-3xl font-bold text-sable font-poppins uppercase">
                        Une fondation solide pour une vie de famille épanouie
                    </h2>
                    <p className="font-lato text-gray-700 leading-relaxed">
                        Les quatre premières semaines après l'accouchement (le quatrième trimestre) exigent repos réparateur et récupération. MamSitter met un point d'honneur à offrir un service "à la carte" selon le besoin du moment (sieste de la maman, écharpe de portage, repas, conversation, etc.).
                    </p>
                    <p className="font-lato text-gray-700 leading-relaxed">
                        Nous faisons le pont entre le milieu hospitalier et le domicile. Pas d'ambition médicale, mais la création d'un cocon émotionnel où toute anxiété liée au retour à la maison est désamorcée par l'action de "MamaSitters" passionnées et expérimentées.
                    </p>
                </div>
                <div className="md:w-1/2">
                    <img
                        src="https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Concept MamSitter"
                        className="rounded-2xl shadow-lg w-full h-auto object-cover max-h-[400px]"
                    />
                </div>
            </div>
        </div>
    );
}
