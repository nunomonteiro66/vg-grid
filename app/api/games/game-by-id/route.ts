import { getGameById } from "@/lib/games_pg/games";

export async function GET(request: Request) {
  const game = await getGameById(12);

  return Response.json(game);
}
