import Link from "next/link";

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-24 px-6 text-center rounded-2xl m-1">
        <h1 className="text-5xl font-bold mb-4">A11yLab ♿</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto mb-6">
          Impara a creare siti accessibili, inclusivi e conformi alle normative.
        </p>
        <p className="text-sm opacity-80 mb-8">
          Per sviluppatori, designer e aziende che vogliono fare la differenza.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/auth/register"
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100"
          >
            Inizia gratis
          </Link>

          <Link
            href="/courses"
            className="border border-white px-6 py-3 rounded-xl hover:bg-white/10"
          >
            Esplora corsi
          </Link>
        </div>
      </div>

      {/* WHY */}
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Perché l&apos;accessibilità è importante?
        </h2>

        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Milioni di persone utilizzano tecnologie assistive per navigare il
          web. Un sito non accessibile significa escludere utenti, perdere
          opportunità e non rispettare la legge.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="bg-card p-6 rounded-2xl shadow">
            <h3 className="font-semibold mb-2">Inclusione</h3>
            <p className="text-sm text-gray-500">
              Rendi il web utilizzabile da tutti, indipendentemente dalle
              capacità.
            </p>
          </div>

          <div className="bg-card p-6 rounded-2xl shadow">
            <h3 className="font-semibold mb-2">Opportunità</h3>
            <p className="text-sm text-gray-500">
              Migliora SEO, UX e raggiungi più utenti.
            </p>
          </div>

          <div className="bg-card p-6 rounded-2xl shadow">
            <h3 className="font-semibold mb-2">Obblighi legali</h3>
            <p className="text-sm text-gray-500">
              Le normative europee richiedono siti accessibili.
            </p>
          </div>
        </div>
      </div>

      {/* LAWS */}
      <div className="bg-card/50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Normative sull&apos;accessibilità
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* EU Directive */}
            <div className="bg-card p-6 rounded-2xl shadow">
              <h3 className="font-semibold mb-2">🇪🇺 Direttiva UE 2016/2102</h3>
              <p className="text-sm text-gray-500 mb-2">
                Obbliga i siti web e le app della Pubblica Amministrazione ad
                essere accessibili secondo standard tecnici condivisi.
              </p>
              <a
                href="https://digital-strategy.ec.europa.eu/it/policies/web-accessibility-directive-standards-and-harmonisation"
                target="_blank"
                className="text-xs text-blue-500 underline"
              >
                Fonte ufficiale
              </a>
            </div>

            {/* EAA */}
            <div className="bg-card p-6 rounded-2xl shadow">
              <h3 className="font-semibold mb-2">
                🇪🇺 European Accessibility Act (2019/882)
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Dal 2025 estende l&apos;accessibilità anche a servizi privati
                come e-commerce, banche e piattaforme digitali.
              </p>
              <a
                href="https://eur-lex.europa.eu/eli/dir/2019/882/oj"
                target="_blank"
                className="text-xs text-blue-500 underline"
              >
                Testo della direttiva
              </a>
            </div>

            {/* Legge Stanca */}
            <div className="bg-card p-6 rounded-2xl shadow">
              <h3 className="font-semibold mb-2">
                🇮🇹 Legge Stanca (Legge 4/2004)
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Prima legge italiana sull&apos;accessibilità digitale,
                aggiornata per allinearsi alle direttive europee.
              </p>
              <a
                href="https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2004-01-09;4"
                target="_blank"
                className="text-xs text-blue-500 underline"
              >
                Normativa ufficiale
              </a>
            </div>

            {/* WCAG */}
            <div className="bg-card p-6 rounded-2xl shadow">
              <h3 className="font-semibold mb-2">📐 WCAG (linee guida)</h3>
              <p className="text-sm text-gray-500 mb-2">
                Standard internazionali per creare siti accessibili, basati su
                principi come percepibilità, operabilità e comprensibilità.
              </p>
              <a
                href="https://www.w3.org/WAI/standards-guidelines/wcag/"
                target="_blank"
                className="text-xs text-blue-500 underline"
              >
                Linee guida ufficiali
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* WHAT YOU LEARN */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Cosa imparerai su A11yLab
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-2xl shadow">
            <h3 className="font-semibold mb-2">WCAG</h3>
            <p className="text-sm text-gray-500">
              Linee guida pratiche per sviluppare siti accessibili.
            </p>
          </div>

          <div className="bg-card p-6 rounded-2xl shadow">
            <h3 className="font-semibold mb-2">Testing</h3>
            <p className="text-sm text-gray-500">
              Come verificare l&apos;accessibilità con strumenti reali.
            </p>
          </div>

          <div className="bg-card p-6 rounded-2xl shadow">
            <h3 className="font-semibold mb-2">Best Practices</h3>
            <p className="text-sm text-gray-500">
              UI/UX inclusive e sviluppo accessibile.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-20 px-6">
        <h2 className="text-3xl font-bold mb-4">Inizia oggi 🚀</h2>
        <p className="text-gray-500 mb-6">
          Diventa uno sviluppatore consapevole e crea un web migliore.
        </p>

        <Link
          href="/auth/register"
          className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700"
        >
          Crea un account
        </Link>
      </div>
    </div>
  );
}
