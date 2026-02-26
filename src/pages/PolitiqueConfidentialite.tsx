export default function PolitiqueConfidentialite() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-2xl shadow-sm p-8 md:p-12 mb-12">
            <h1 className="text-4xl font-bold text-vert font-poppins mb-8 uppercase tracking-wide">Politique de Confidentialité</h1>

            <div className="space-y-8 text-gray-700 font-lato leading-relaxed">
                <section>
                    <h2 className="text-2xl font-bold text-sable font-poppins mb-4 uppercase">1. Collecte des données</h2>
                    <p>
                        En utilisant la plateforme <strong>MamSitter</strong>, nous collectons et traitons des données personnelles vous concernant pour assurer le bon fonctionnement du service, la gestion de vos rendez-vous, et le paiement des prestations. (ex: nom, prénom, téléphone, email, ville, besoins spécifiques pour l'accompagnement post-partum).
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-sable font-poppins mb-4 uppercase">2. Base légale et finalités</h2>
                    <p>
                        Nous traitons vos données personnelles dans le respect du Règlement Général sur la Protection des Données (RGPD). La finalité principale est de permettre la relation avec les *MamaSitters*, d'optimiser l'organisation des missions, d'assurer la sécurité des échanges et le suivi qualité (témoignages, amélioration continue).
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-sable font-poppins mb-4 uppercase">3. Durée de conservation</h2>
                    <p>
                        Les données liées à votre compte actif sont conservées tant que le compte est ouvert. Dans les 36 mois suivant un compte inactif, nous supprimerons vos informations, sauf obligation légale nécessitant une durée d'archivage encadrée (ex: facturation, preuve de contrat conservée durant 5 ans ou plus en fonction du droit applicable dans votre pays de résidence).
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-sable font-poppins mb-4 uppercase">4. Sécurité et partage</h2>
                    <p>
                        Nous ne revendons jamais vos données à des tiers à des fins publicitaires. Vos données sont hébergées de manière sécurisée et accessibles uniquement à nos prestataires techniques (hébergement, passerelle de paiement) et à la ou les MamaSitter(s) effectuant ou pourvoyant une mission pour vous (dans les strictes limites du nécessaire : adresse, nom, numéro de contact).
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-sable font-poppins mb-4 uppercase">5. Vos droits</h2>
                    <p>
                        Conformément à la réglementation sur la vie privée, vous disposez d'un droit d'accès, de rectification, de portabilité et de suppression sur vos données. Pour exercer vos droits ou pour toute question, merci de nous contacter à <strong>dpo@mamsitter.com</strong> ou <strong>hello@mamsitter.com</strong>.
                    </p>
                </section>
            </div>
        </div>
    );
}
