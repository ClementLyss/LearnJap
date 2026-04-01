import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-2xl text-center px-4">
        <h1 className="text-6xl font-bold text-zinc-900 dark:text-white">
          <span className="text-red-600">学</span> LearnJap
        </h1>
        <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-400">
          Apprenez le japonais à votre rythme : alphabets, kanji, vocabulaire et jeux interactifs
          avec répétition espacée.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/login"
            className="rounded-lg bg-red-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            Se connecter
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            Explorer
          </Link>
        </div>
      </div>
    </div>
  );
}
