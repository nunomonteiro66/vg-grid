import { getGameByDayId } from "@/lib/db/games";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const dayId = Number(searchParams.get("dayId"));

  if (!dayId) {
    return Response.json({ error: "Missing dayId" }, { status: 400 });
  }

  const game = await getGameByDayId(dayId);

  return Response.json(game);
}
