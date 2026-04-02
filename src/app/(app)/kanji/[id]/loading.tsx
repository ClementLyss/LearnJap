export default function KanjiDetailLoading() {
  return (
    <div className="animate-pulse">
      {/* Back link */}
      <div className="mb-6 h-4 w-40 rounded bg-zinc-200 dark:bg-zinc-800" />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left card */}
        <div className="flex flex-col items-center rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="h-24 w-24 rounded-lg bg-zinc-200 dark:bg-zinc-700" />
          <div className="mt-4 h-6 w-28 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="mt-2 h-4 w-20 rounded bg-zinc-100 dark:bg-zinc-800" />
          <div className="mt-4 flex gap-2">
            <div className="h-6 w-16 rounded-full bg-zinc-100 dark:bg-zinc-800" />
            <div className="h-6 w-16 rounded-full bg-zinc-100 dark:bg-zinc-800" />
          </div>
          <div className="mt-6 w-full space-y-2">
            <div className="h-4 w-20 rounded bg-zinc-100 dark:bg-zinc-800" />
            <div className="flex gap-2">
              <div className="h-8 w-16 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
              <div className="h-8 w-16 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
            </div>
          </div>
        </div>

        {/* Right details */}
        <div className="space-y-6 lg:col-span-2">
          {/* Readings skeleton */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 h-6 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="h-4 w-44 rounded bg-zinc-100 dark:bg-zinc-800" />
                <div className="flex gap-2">
                  <div className="h-8 w-20 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
                  <div className="h-8 w-20 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-44 rounded bg-zinc-100 dark:bg-zinc-800" />
                <div className="flex gap-2">
                  <div className="h-8 w-20 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
                </div>
              </div>
            </div>
          </div>

          {/* Examples skeleton */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 h-6 w-36 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                  <div className="flex gap-3">
                    <div className="h-5 w-14 rounded bg-zinc-200 dark:bg-zinc-700" />
                    <div className="h-5 w-20 rounded bg-zinc-100 dark:bg-zinc-800" />
                    <div className="h-5 w-16 rounded bg-zinc-100 dark:bg-zinc-800" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
