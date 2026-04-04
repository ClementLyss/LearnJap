import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { buildQuizQuestions } from "@/services/quiz.service";
import QuizGame from "@/components/games/QuizGame";
import type { GameMode } from "@/types/game";

const validModes: GameMode[] = ["kanji-to-japanese", "french-to-kanji", "kanji-to-french"];

export default async function KanjiQuizPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const params = await searchParams;
  const mode = params.mode as GameMode;
  if (!mode || !validModes.includes(mode)) redirect("/games");

  const questions = await buildQuizQuestions(session.user.id, mode, 10);

  if (questions.length === 0) {
    return (
      <div className="mx-auto max-w-xl text-center">
        <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-5xl">📚</p>
          <h2 className="mt-4 text-xl font-bold text-zinc-900 dark:text-white">
            Pas encore de kanji à réviser
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Marquez des kanji comme &laquo; à apprendre &raquo; depuis la liste pour commencer !
          </p>
          <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
            Maintenez appuyé sur un kanji grisé pour l&apos;ajouter.
          </p>
          <Link
            href="/kanji"
            className="mt-6 inline-block rounded-lg bg-red-600 px-6 py-3 text-sm font-medium text-white hover:bg-red-700 transition-colors"
          >
            Explorer les kanji
          </Link>
        </div>
      </div>
    );
  }

  return <QuizGame questions={questions} mode={mode} />;
}
