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
