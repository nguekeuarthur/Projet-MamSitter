import { Gift, Search } from 'lucide-react';

export default function HeaderBanner() {
  return (
    <section className="pt-24 pb-6 bg-vert/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <a
            href="#/find-sitter"
            className="banner-pill flex items-center gap-2 bg-[#727B6E] text-white px-6 py-3 rounded-full font-lato font-bold uppercase text-sm tracking-wide shadow-sm hover:shadow-md hover:bg-[#646c61] transition"
          >
            <Search className="w-4 h-4" />
            Trouver ma Mamasitter
          </a>
          <a
            href="#/packages-eur"
            className="banner-pill flex items-center gap-2 bg-[#727B6E] text-white px-6 py-3 rounded-full font-lato font-bold uppercase text-sm tracking-wide shadow-sm hover:shadow-md hover:bg-[#646c61] transition"
          >
            <Gift className="w-4 h-4" />
            EUR - Nos coffrets
          </a>
          <a
            href="#/packages-chf"
            className="banner-pill flex items-center gap-2 bg-[#727B6E] text-white px-6 py-3 rounded-full font-lato font-bold uppercase text-sm tracking-wide shadow-sm hover:shadow-md hover:bg-[#646c61] transition"
          >
            <Gift className="w-4 h-4" />
            CHF - Nos coffrets
          </a>
        </div>
      </div>
    </section>
  );
}
