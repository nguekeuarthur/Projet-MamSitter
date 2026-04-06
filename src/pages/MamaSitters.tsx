import { Star, Heart, Shield, Sparkles, Check, Coffee, Utensils, ArrowRight } from 'lucide-react';

const coreValues = [
    {
        icon: Heart,
        title: 'Soutien Maman',
        description: "Prioriser votre bien-être pour un foyer équilibré.",
        details: ["Temps de sommeil garanti", "Récupération physique", "Écoute bienveillante"]
    },
    {
        icon: Coffee,
        title: 'Relais Bébé',
        description: "Une présence douce et experte pour votre nouveau-né.",
        details: ["Aide aux soins", "Relais biberon/change", "Éveil en douceur"]
    },
    {
        icon: Utensils,
        title: 'Relais Logistique',
        description: "Libérer votre esprit des tâches quotidiennes.",
        details: ["Repas sains", "Entretien d'appoint", "Organisation"]
    },
    {
        icon: Sparkles,
        title: 'Transmission',
        description: "Des conseils pour prendre confiance sereinement.",
        details: ["Astuces quotidiennes", "Soutien allaitement", "Accompagnement"]
    }
];

export default function MamaSitters() {
    return (
        <div className="min-h-screen bg-[#FAF7F2]">
            {/* Hero & Selection Grid - Combined for a more dynamic feel */}
            <section className="relative pt-8 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Soft blur background */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sable/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">

                        {/* Left Content: Hero Text */}
                        <div className="text-left max-w-2xl">
                            <div className="inline-flex items-center space-x-2 bg-white/40 backdrop-blur-sm px-5 py-2 rounded-full border border-sable/10 mb-8 shadow-sm">
                                <Star className="w-3.5 h-3.5 text-sable fill-sable" />
                                <span className="text-[10px] font-black text-sable uppercase tracking-[0.2em]">Des profils d'exception</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold text-vert mb-8 font-poppins leading-tight tracking-tight">
                                Une MamaSitter,la grande soeur de coeur bienveillante <br />
                                <span className="text-sable italic font-light"> dont toute femme a besoin durant son post-partum.</span>
                            </h1>

                            <p className="text-lg md:text-xl text-vert/60 font-poppins font-light leading-relaxed mb-10">
                                Découvrez les femmes qui veillent sur votre équilibre, entre expertise bienveillante et soutien quotidien.
                            </p>

                            {/* <div className="flex flex-wrap gap-4">
                                <a href='#search' className="bg-vert text-white px-8 py-4 rounded-2xl font-bold text-sm hover:translate-y-[-2px] transition-all shadow-lg shadow-vert/10 uppercase tracking-widest">
                                    Trouver ma MamaSitter
                                </a>
                            </div> */}
                        </div>

                        {/* Right Content: Selection Grid */}
                        <div className="space-y-8">
                            <div className="mb-10 text-center">
                                <h2 className="text-2xl md:text-3xl font-bold text-vert font-poppins mb-4">
                                    Une sélection <span className="text-sable italic">haute exigence</span>
                                </h2>
                                <p className="text-sm text-vert/60 font-poppins font-light leading-relaxed max-w-md mx-auto">
                                    Nous sélectionnons uniquement des profils justifiant d'une expérience concrète et d'une motivation profonde.
                                </p>
                            </div>

                            <div className="grid gap-6">
                                {[
                                    { title: "Formation Batch Cooking", desc: "Avec une cheffe culinaire pour préparer des repas sains et adaptés au post-partum." },
                                    { title: "Formation Psychologie Post-Partum", desc: "Avec une psychologue professionnelle pour écouter, conseiller et accompagner avec bienveillance." }
                                ].map((type, i) => (
                                    <div key={i} className="flex gap-6 bg-white/50 backdrop-blur-sm p-6 rounded-[32px] border border-white/60 hover:bg-white transition-all duration-300 group">
                                        <div className="w-12 h-12 rounded-2xl bg-sable/10 flex items-center justify-center shrink-0 group-hover:bg-sable transition-all">
                                            <Check className="w-5 h-5 text-sable group-hover:text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-vert font-poppins mb-1">{type.title}</h4>
                                            <p className="text-sm text-vert/50 font-poppins leading-relaxed">{type.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* The Missions - Elegant & Minimal Grid */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-vert mb-6 font-poppins tracking-tight">
                            Quelles sont ses <span className="text-sable italic">missions ?</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {coreValues.map((value, i) => {
                            const Icon = value.icon;
                            return (
                                <div key={i} className="group p-8 rounded-[40px] hover:bg-white/40 transition-all duration-500">
                                    <div className="w-12 h-12 rounded-2xl bg-beige flex items-center justify-center mb-6 border border-sable/5 group-hover:bg-white group-hover:scale-110 transition-all">
                                        <Icon className="w-6 h-6 text-sable" />
                                    </div>
                                    <h3 className="text-xl font-bold text-vert font-poppins mb-3">{value.title}</h3>
                                    <p className="text-sm text-vert/60 font-poppins leading-relaxed mb-6">
                                        {value.description}
                                    </p>
                                    <ul className="space-y-2">
                                        {value.details.map((detail, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-[10px] font-black text-sable uppercase tracking-wider">
                                                <div className="w-1 h-1 rounded-full bg-sable/30"></div>
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Trust Section - Transparent & Light */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto text-center border-t border-sable/10 pt-12">
                    <div className="inline-flex items-center gap-2 bg-sable/5 px-4 py-1.5 rounded-full mb-8">
                        <Shield className="w-3.5 h-3.5 text-sable" />
                        <span className="text-[10px] font-black text-sable uppercase tracking-[0.2em]">Confiance & Engagement</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold text-vert mb-12 font-poppins leading-tight">
                        Une charte rigoureuse <br />
                        <span className="text-sable italic font-light">pour votre sérénité.</span>
                    </h2>

                    <div className="grid md:grid-cols-2 gap-12 mb-16 max-w-4xl mx-auto">
                        {[
                            { title: "Identité Vérifiée", desc: "Pièce d'identité et casier judiciaire systématique." },
                            { title: "Formation", desc: "Accès à des formations spécifiques post-partum." }
                        ].map((item, i) => (
                            <div key={i} className="space-y-3">
                                <h5 className="font-bold text-sable uppercase tracking-widest text-[10px]">{item.title}</h5>
                                <p className="text-sm text-vert/60 font-poppins font-light leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a href='#/search' className="bg-vert text-white px-8 py-4 rounded-2xl font-bold text-sm hover:translate-y-[-2px] transition-all shadow-lg shadow-vert/10 uppercase tracking-widest">
                            Trouver ma MamaSitter
                        </a>
                        <a href='#/register' className="text-vert/40 hover:text-vert font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2">
                            Devenir MamaSitter <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>

            <div className="h-20"></div>
        </div>
    );
}
