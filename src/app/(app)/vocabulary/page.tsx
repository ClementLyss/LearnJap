const categories = [
  { id: "work", label: "Travail", icon: "💼", count: 0 },
  { id: "adjectives", label: "Adjectifs", icon: "📝", count: 0 },
  { id: "verbs", label: "Verbes", icon: "🏃", count: 0 },
  { id: "food", label: "Nourriture", icon: "🍱", count: 0 },
  { id: "travel", label: "Voyage", icon: "✈️", count: 0 },
  { id: "daily", label: "Quotidien", icon: "🏠", count: 0 },
  { id: "numbers", label: "Nombres", icon: "🔢", count: 0 },
  { id: "family", label: "Famille", icon: "👨‍👩‍👧‍👦", count: 0 },
];

export default function VocabularyPage() {
  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-white">Vocabulaire</h1>
      <p className="mb-6 text-zinc-600 dark:text-zinc-400">
        Apprenez du vocabulaire japonais par catégorie.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <span className="text-3xl">{cat.icon}</span>
            <div>
              <h2 className="font-semibold text-zinc-900 dark:text-white">{cat.label}</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {cat.count > 0 ? `${cat.count} mots` : "Bientôt disponible"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
