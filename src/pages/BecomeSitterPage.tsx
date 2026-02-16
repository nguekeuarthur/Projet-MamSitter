import BecomeSitter from '../components/BecomeSitter';

export default function BecomeSitterPage() {
  return (
    <main className="bg-white">
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-vert mb-4 font-poppins uppercase tracking-wide">
            Devenir MamaSitter
          </h1>
          <p className="text-lg sm:text-xl text-vert/70 font-poppins">
            Rejoignez une communaute bienveillante et accompagnez les jeunes mamans avec professionnalisme.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#/register"
              className="bg-sable text-white px-6 py-3 rounded-full font-semibold uppercase tracking-wide shadow-lg hover:bg-sable/90 transition-colors"
            >
              Candidater
            </a>
            <a
              href="#/how-it-works"
              className="border border-vert text-vert px-6 py-3 rounded-full font-semibold uppercase tracking-wide hover:bg-vert/5 transition-colors"
            >
              Voir le parcours
            </a>
          </div>
        </div>
      </section>
      <BecomeSitter />
    </main>
  );
}
