import Link from "next/link";

const games = [
  {
    id: "daily-kanji",
    title: "Kanji du jour",
    description: "Étudie un nouveau kanji chaque jour : découvre, redessine, écris",
    href: "/games/daily-kanji",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    badge: "Quotidien",
  },
  {
    id: "kanji-to-japanese",
    title: "Deviner la lecture",
    description: "Un kanji s'affiche, trouvez la bonne lecture en hiragana parmi 6 propositions",
    href: "/games/kanji-quiz?mode=kanji-to-japanese",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  },
  {
    id: "french-to-kanji",
    title: "Deviner le kanji",
    description: "Un mot en français s'affiche, trouvez le bon kanji parmi 6 propositions",
    href: "/games/kanji-quiz?mode=french-to-kanji",
    color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  },
  {
    id: "kanji-to-french",
    title: "Kanji → Français",
    description: "Un kanji s'affiche, trouvez sa signification en français parmi 6 propositions",
    href: "/games/kanji-quiz?mode=kanji-to-french",
    color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  },
];

export default function GamesPage() {
  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-white">Jeux</h1>
      <p className="mb-6 text-zinc-600 dark:text-zinc-400">
        Testez et renforcez vos connaissances avec des quiz interactifs.
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <Link
            key={game.id}
            href={game.href}
            className="group rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:shadow-md hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
          >
            <div className={`mb-3 inline-block rounded-lg px-3 py-1 text-sm font-medium ${game.color}`}>
              {game.badge ?? "Quiz"}
            </div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">{game.title}</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{game.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
