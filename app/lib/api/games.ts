import { GameByDayId } from "@/lib/db/games";

export type GameSearchResult = {
  id: number;
  name: string;
  coverUrl: string | null;
  franchise: {
    name: string;
    id: number;
  };
};

export async function searchGames(search: string): Promise<GameSearchResult[]> {
  const response = await fetch(
    `/api/games/search?q=${encodeURIComponent(search)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to search games");
  }

  return response.json();
}

export async function getGameByDayId(dayId: number): Promise<GameByDayId> {
  const response = await fetch(`/api/games/game-by-day-id?dayId=${dayId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch game by day id");
  }

  return response.json();
}
