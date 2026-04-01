import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { setKanjiStatus, type KanjiStatus } from "@/services/progress.service";

const validStatuses: KanjiStatus[] = ["unseen", "want_to_learn", "learning", "known"];

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;
  const kanjiId = parseInt(id);
  if (isNaN(kanjiId)) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }

  const body = await request.json();
  const status = body.status as KanjiStatus;

  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
  }

  const progress = await setKanjiStatus(session.user.id, kanjiId, status);
  return NextResponse.json(progress);
}
