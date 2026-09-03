import { search } from "@/lib/db/games";
import { searchGames } from "@/lib/igdb/games";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q");

    if (!query) {
      return Response.json([]);
    }

    const games = await search(query);

    return Response.json(games);
  } catch (error) {
    console.error("ERRO SEARCHING GAMES: ", error);

    return Response.json({ error: "Failed to search games" }, { status: 500 });
  }
}
