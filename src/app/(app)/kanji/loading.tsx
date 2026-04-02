export default function KanjiLoading() {
  return (
    <div className="animate-pulse">
      <div className="mb-2 h-9 w-32 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      <div className="mb-6 h-5 w-64 rounded bg-zinc-100 dark:bg-zinc-800" />

      {/* Level tabs skeleton */}
      <div className="mb-6 flex gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-10 w-20 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
        ))}
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="h-9 w-9 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="mt-2 h-3 w-10 rounded bg-zinc-100 dark:bg-zinc-800" />
          </div>
        ))}
      </div>
    </div>
  );
}
