export default function QuizLoading() {
  return (
    <div className="mx-auto max-w-xl animate-pulse">
      <div className="mb-6 flex items-center justify-between">
        <div className="h-6 w-40 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-5 w-12 rounded bg-zinc-100 dark:bg-zinc-800" />
      </div>

      <div className="mb-6 h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-700" />

      <div className="mb-8 rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto h-20 w-20 rounded-lg bg-zinc-200 dark:bg-zinc-700" />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800"
          >
            <div className="mx-auto h-8 w-16 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        ))}
      </div>
    </div>
  );
}
