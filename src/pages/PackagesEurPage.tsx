import Services from '../components/Services';

export default function PackagesEurPage() {
  return (
    <main className="bg-beige">
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-vert mb-4 font-poppins uppercase tracking-wide">
            Nos coffrets - EUR
          </h1>
          <p className="text-lg sm:text-xl text-vert/70 font-poppins">
            Tous nos forfaits en euros, avec une MamaSitter certifiee et bienveillante.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#/packages-chf"
              className="border border-vert text-vert px-6 py-3 rounded-full font-semibold uppercase tracking-wide hover:bg-vert/5 transition-colors"
            >
              Voir les coffrets CHF
            </a>
            <a
              href="#/find-sitter"
              className="bg-sable text-white px-6 py-3 rounded-full font-semibold uppercase tracking-wide shadow-lg hover:bg-sable/90 transition-colors"
            >
              Trouver ma MamaSitter
            </a>
          </div>
        </div>
      </section>
      <Services />
    </main>
  );
}
