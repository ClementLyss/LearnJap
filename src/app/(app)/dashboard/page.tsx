import Link from "next/link";

const features = [
  {
    title: "Alphabets",
    description: "Apprenez les hiragana et katakana",
    href: "/alphabets",
    icon: "あ",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  },
  {
    title: "Kanji",
    description: "Étudiez les kanji par niveau JLPT",
    href: "/kanji",
    icon: "漢",
    color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  },
  {
    title: "Vocabulaire",
    description: "Enrichissez votre vocabulaire par catégorie",
    href: "/vocabulary",
    icon: "語",
    color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  },
  {
    title: "Jeux",
    description: "Testez vos connaissances avec des quiz",
    href: "/games",
    icon: "遊",
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Bienvenue sur LearnJap
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Choisissez un module pour commencer votre apprentissage du japonais.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Link
            key={feature.href}
            href={feature.href}
            className="group rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
          >
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg text-2xl ${feature.color}`}
            >
              {feature.icon}
            </div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              {feature.title}
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {feature.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
