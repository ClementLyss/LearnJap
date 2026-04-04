import Link from "next/link";
import InstallButton from "@/components/layout/InstallButton";

export default function InstallerPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-white">
        Installer LearnJap
      </h1>
      <p className="mb-8 text-zinc-600 dark:text-zinc-400">
        Utilisez LearnJap comme une application mobile, sans passer par le Play Store.
      </p>

      {/* Install PWA button */}
      <div className="mb-8 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
          Installation rapide
        </h2>
        <InstallButton />
      </div>

      {/* Android APK download */}
      <div className="mb-8 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-start gap-4">
          <span className="text-3xl">🤖</span>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Android — Télécharger l&apos;APK
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Téléchargez l&apos;application Android directement. Aucun compte Play Store requis.
            </p>
            <a
              href="https://github.com/ClementLyss/LearnJap/releases/latest/download/learnjap.apk"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
              </svg>
              Télécharger l&apos;APK
            </a>
            <p className="mt-2 text-xs text-zinc-400">
              Vous devrez autoriser l&apos;installation depuis des sources inconnues.
            </p>
          </div>
        </div>
      </div>

      {/* Manual instructions */}
      <div className="space-y-6">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-start gap-4">
            <span className="text-3xl">📱</span>
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Android — Via Chrome
              </h2>
              <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  Ouvrez{" "}
                  <strong className="text-zinc-900 dark:text-white">
                    learn-jap-lyart.vercel.app
                  </strong>{" "}
                  dans Chrome
                </li>
                <li>Appuyez sur le menu <strong>⋮</strong> (trois points en haut à droite)</li>
                <li>
                  Sélectionnez{" "}
                  <strong className="text-zinc-900 dark:text-white">
                    &laquo; Installer l&apos;application &raquo;
                  </strong>
                </li>
                <li>Confirmez l&apos;installation</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-start gap-4">
            <span className="text-3xl">🍎</span>
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                iPhone / iPad — Via Safari
              </h2>
              <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  Ouvrez{" "}
                  <strong className="text-zinc-900 dark:text-white">
                    learn-jap-lyart.vercel.app
                  </strong>{" "}
                  dans <strong>Safari</strong> (obligatoire)
                </li>
                <li>
                  Appuyez sur le bouton{" "}
                  <strong className="text-zinc-900 dark:text-white">Partager</strong> (carré avec
                  flèche)
                </li>
                <li>
                  Faites défiler et sélectionnez{" "}
                  <strong className="text-zinc-900 dark:text-white">
                    &laquo; Sur l&apos;écran d&apos;accueil &raquo;
                  </strong>
                </li>
                <li>
                  Appuyez sur <strong>Ajouter</strong>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/dashboard"
          className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
        >
          Continuer sur le site →
        </Link>
      </div>
    </div>
  );
}
