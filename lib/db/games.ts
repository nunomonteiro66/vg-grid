import { Game } from "@/lib/igdb/helpers/types";
import prisma from "../prisma";
import { getScreenshots } from "../igdb/screenshots";

type SearchType = {
  id: number;
  igdbId: number;
  name: string;
  coverUrl: string;
};

export async function search(
  searchTerm: string,
  offset = 0,
): Promise<SearchType[]> {
  const sanitized = searchTerm.trim();

  if (sanitized.length === 0) return [];

  const query = `${sanitized.split(/\s+/).join("&")}:*`;

  const games = await prisma.games.findMany({
    select: {
      id: true,
      igdbId: true,
      name: true,
      coverUrl: true,

      franchise: {
        select: {
          name: true,
        },
      },
    },

    where: {
      name: {
        search: query,
      },
    },
  });

  return games.map((game) => ({
    id: game.id,
    igdbId: game.igdbId,
    name: game.name,
    coverUrl: game.coverUrl ?? "",
    franchise: game.franchise?.name ?? null,
  }));
}

export async function getGameById(id: number) {
  return prisma.games.findUnique({
    where: {
      id,
    },
    include: {
      franchise: {
        select: {
          name: true,
        },
      },
    },
  });
}

export async function getRandomGames(n: number) {
  const total = await prisma.games.count();

  const randomNmbs = Array.from({ length: n }).map((n) =>
    Math.round(Math.random() * total),
  );

  const gamesFromDb = await prisma.games.findMany({
    where: {
      id: {
        in: randomNmbs,
      },
    },
    include: {
      franchise: {
        select: {
          name: true,
        },
      },
    },
  });

  const screenshots = await getScreenshots(gamesFromDb.map((g) => g.igdbId));

  //get the screenshots for the games
  return gamesFromDb.map((g) => {
    return {
      ...g,
      screenshots: screenshots.map((sc) => ({
        ...sc,
        url: sc.url.replace("t_thumb", "t_1080p"),
      })),
    };
  });
}
