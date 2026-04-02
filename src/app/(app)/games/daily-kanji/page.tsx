import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getDailyKanji } from "@/services/daily-kanji.service";
import DailyKanjiFlow from "@/components/games/DailyKanjiFlow";

export default async function DailyKanjiPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const kanji = await getDailyKanji(session.user.id);

  if (!kanji) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="text-6xl">🎉</p>
          <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-white">
            Félicitations !
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Tu as étudié tous les kanji disponibles. Reviens demain pour réviser !
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-white">
        Kanji du jour
      </h1>
      <p className="mb-6 text-zinc-600 dark:text-zinc-400">
        Etudie ce kanji en 3 étapes : découvre, redessine, écris les exemples.
      </p>
      <DailyKanjiFlow kanji={JSON.parse(JSON.stringify(kanji))} />
    </div>
  );
}
