import { getGameById } from "@/lib/db/games";

export async function GET(request: Request) {
  const game = await getGameById(12);

  return Response.json(game);
}
