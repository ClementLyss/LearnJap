import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { updateKanjiProgress } from "@/services/progress.service";

export async function POST(
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
  const quality = body.quality as number;

  if (typeof quality !== "number" || quality < 0 || quality > 5) {
    return NextResponse.json({ error: "Qualité invalide (0-5)" }, { status: 400 });
  }

  const progress = await updateKanjiProgress(session.user.id, kanjiId, quality);
  return NextResponse.json(progress);
}
