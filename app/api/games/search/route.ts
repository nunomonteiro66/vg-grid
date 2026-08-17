import { searchGames } from "@/lib/igdb/games";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q");

  if (!query) {
    return Response.json([]);
  }

  const games = await searchGames(query);

  return Response.json(games);
}
