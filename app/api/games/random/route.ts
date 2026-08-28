import { getRandomGames } from "@/lib/igdb/games";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const n_games = () => {
    const n = Number(searchParams.get("n_games"));

    return n === 0 ? 1 : n;
  };

  const games = await getRandomGames(n_games());

  return Response.json(games);
}
