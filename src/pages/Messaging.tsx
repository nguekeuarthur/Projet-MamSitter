import { useMemo, useState } from "react";
import { Search, Send, Paperclip, CheckCheck, ShieldAlert, LifeBuoy } from "lucide-react";

type Message = {
  id: string;
  author: "me" | "other";
  text: string;
  time: string;
};

type Thread = {
  id: string;
  name: string;
  role: string;
  preview: string;
  time: string;
  unread: number;
  messages: Message[];
};

const THREADS: Thread[] = [
  {
    id: "t1",
    name: "Claire D.",
    role: "MamaSitter • Lyon",
    preview: "Je suis dispo jeudi matin si ça vous convient.",
    time: "09:32",
    unread: 2,
    messages: [
      { id: "m1", author: "other", text: "Bonjour Maryam, comment allez-vous ?", time: "09:10" },
      { id: "m2", author: "me", text: "Bonjour Claire, merci ! Est-ce que vous êtes dispo cette semaine ?", time: "09:18" },
      { id: "m3", author: "other", text: "Je suis dispo jeudi matin si ça vous convient.", time: "09:32" },
    ],
  },
  {
    id: "t2",
    name: "Sonia M.",
    role: "MamaSitter • Paris",
    preview: "Je peux passer samedi après-midi.",
    time: "Hier",
    unread: 0,
    messages: [
      { id: "m1", author: "me", text: "Bonjour Sonia, avez-vous des créneaux ce week-end ?", time: "Hier 16:20" },
      { id: "m2", author: "other", text: "Je peux passer samedi après-midi.", time: "Hier 16:35" },
    ],
  },
  {
    id: "t3",
    name: "Élodie R.",
    role: "MamaSitter • Genève",
    preview: "Vous pouvez me joindre au +33 6 12 34 56 78.",
    time: "Lun.",
    unread: 0,
    messages: [
      { id: "m1", author: "other", text: "Vous pouvez me joindre au +33 6 12 34 56 78.", time: "Lun. 11:03" },
      { id: "m2", author: "me", text: "Merci ! Mon email est maryam@example.com", time: "Lun. 11:05" },
    ],
  },
];

const blockedPatterns = {
  email: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
  url: /\b((https?:\/\/)?(www\.)?([A-Z0-9-]+\.)+[A-Z]{2,})(\/\S*)?\b/i,
  phone: /\b(\+?\d[\d\s().-]{6,}\d)\b/i,
};

function hasBlockedContent(text: string) {
  return (
    blockedPatterns.email.test(text) ||
    blockedPatterns.url.test(text) ||
    blockedPatterns.phone.test(text)
  );
}

function maskBlockedContent(text: string) {
  return text
    .replace(blockedPatterns.email, "[email bloqué]")
    .replace(blockedPatterns.url, "[lien bloqué]")
    .replace(blockedPatterns.phone, "[numéro bloqué]");
}

export default function Messaging() {
  const [selectedId, setSelectedId] = useState(THREADS[0].id);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [warning, setWarning] = useState("");
  const [threadsState, setThreadsState] = useState<Thread[]>(THREADS);

  const threads = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return threadsState;
    return threadsState.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.preview.toLowerCase().includes(q)
    );
  }, [query, threadsState]);

  const current = threads.find((t) => t.id === selectedId) ?? threads[0];

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;
    if (hasBlockedContent(text)) {
      setWarning(
        "Pour votre sécurité, les emails, liens et numéros sont bloqués."
      );
      return;
    }

    setWarning("");
    const newMessage: Message = {
      id: `m-${Date.now()}`,
      author: "me",
      text,
      time: "À l’instant",
    };

    setThreadsState((prev) =>
      prev.map((t) => {
        if (t.id !== current.id) return t;
        return {
          ...t,
          preview: text,
          time: "À l’instant",
          messages: [...t.messages, newMessage],
        };
      })
    );
    setDraft("");
  };

  return (
    <section className="bg-beige px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm uppercase tracking-wide text-green font-lato">
              Messagerie
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-green mt-2">
              Messagerie
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              {threadsState.length} conversations actives
            </span>
            <a
              href="mailto:hello@mamsitter.com"
              className="inline-flex items-center gap-2 bg-green text-white px-4 py-2 rounded-full text-sm font-lato uppercase tracking-wide hover:opacity-90 transition"
            >
              <LifeBuoy className="w-4 h-4" />
              Contacter MamSitter
            </a>
          </div>
        </div>

        <div className="mt-6 bg-white border border-green/20 text-green rounded-2xl px-4 py-3 text-sm flex items-center gap-2">
          <ShieldAlert className="w-4 h-4" />
          Sécurité activée : emails, liens et numéros de téléphone sont bloqués.
        </div>

        <div className="mt-8 grid lg:grid-cols-[320px_1fr] gap-6">
          <aside className="bg-white rounded-3xl shadow p-5 h-[620px] flex flex-col">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher..."
                className="w-full border border-gray-200 rounded-full py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-green/40"
              />
            </div>

            <div className="mt-4 space-y-2 overflow-y-auto pr-1">
              {threads.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedId(t.id)}
                  className={`w-full text-left p-3 rounded-2xl border transition ${
                    t.id === current.id ? "border-green bg-beige" : "border-gray-100 hover:border-green/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-green">{t.name}</p>
                    <span className="text-xs text-gray-500">{t.time}</span>
                  </div>
                  <p className="text-xs text-gray-500">{t.role}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm text-gray-700 line-clamp-1">
                      {maskBlockedContent(t.preview)}
                    </p>
                    {t.unread > 0 && (
                      <span className="ml-2 bg-sand text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {t.unread}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </aside>

          <div className="bg-white rounded-3xl shadow p-6 h-[620px] flex flex-col">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-semibold text-green">{current.name}</p>
                <p className="text-xs text-gray-500">{current.role}</p>
              </div>
              <span className="text-xs text-gray-500">Réponse sous 24h</span>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {current.messages.map((m) => (
                <div
                  key={m.id}
                  className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
                    m.author === "me"
                      ? "ml-auto bg-sand text-white"
                      : "bg-beige text-gray-700"
                  }`}
                >
                  <p>{maskBlockedContent(m.text)}</p>
                  <div className="mt-2 flex items-center justify-end text-xs opacity-80 gap-1">
                    <span>{m.time}</span>
                    {m.author === "me" && <CheckCheck className="w-3 h-3" />}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              {warning && (
                <div className="mb-3 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                  <ShieldAlert className="w-4 h-4" />
                  {warning}
                </div>
              )}
              <div className="flex items-center gap-2">
                <button
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-green/40"
                  aria-label="Ajouter une pièce jointe"
                >
                  <Paperclip className="w-4 h-4 text-gray-500" />
                </button>
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Écrire un message..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                  className="flex-1 border border-gray-200 rounded-full py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green/40"
                />
                <button
                  onClick={handleSend}
                  className="w-10 h-10 rounded-full bg-sand text-white flex items-center justify-center hover:opacity-90"
                  aria-label="Envoyer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
