import { Game } from "@/lib/igdb/helpers/types";
import prisma from "../prisma";
import { getScreenshots } from "../igdb/screenshots";

type SearchType = {
  id: number;
  igdbId: number;
  name: string;
  coverUrl?: string;
};

export async function search(
  searchTerm: string,
  offset = 0,
): Promise<SearchType[]> {
  const sanitized = searchTerm.trim();

  if (sanitized.length === 0) return [];

  const query = `${sanitized.split(/\s+/).join("&")}:*`;

  const games = await prisma.game.findMany({
    select: {
      id: true,
      igdbId: true,
      name: true,
      coverUrl: true,

      franchise: {
        select: {
          name: true,
          id: true,
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
    coverUrl: game.coverUrl ?? undefined,
    franchise: game.franchise ?? null,
  }));
}

export async function getGameById(id: number) {
  return prisma.game.findUnique({
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

export type RandomGame = Awaited<ReturnType<typeof getRandomGames>>[number];

export async function getRandomGames(n: number) {
  const total = await prisma.game.count();

  const randomNmbs = Array.from({ length: n }).map((n) =>
    Math.round(Math.random() * total),
  );

  return await prisma.game.findMany({
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
      genres: {
        select: {
          genre: {
            select: {
              name: true,
            },
          },
        },
      },
      platforms: {
        select: {
          platform: {
            select: {
              name: true,
            },
          },
        },
      },
      screenshots: {
        select: {
          url: true,
          height: true,
          width: true,
        },
      },
    },
  });
}
