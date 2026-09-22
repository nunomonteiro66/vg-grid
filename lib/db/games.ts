import { Game } from "@/lib/igdb/helpers/types";
import prisma from "../prisma";
import { getScreenshots } from "../igdb/screenshots";
import { getOnlyDate } from "./helper";
import { Prisma } from "../generated/prisma/client";

type SearchType = {
  id: number;
  igdbId: number;
  name: string;
  coverUrl?: string;
};

const gameDetailsInclude = {
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
} satisfies Prisma.GameInclude;

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

export async function getGameByDate(day: Date) {
  const nDay = getOnlyDate(day);

  const result = await prisma.day.findUnique({
    where: {
      date: nDay,
    },
    include: {
      dailyGame: {
        include: gameDetailsInclude,
      },
    },
  });

  return result?.dailyGame ?? null;
}

export async function getGridByDate(day: Date) {
  const nDay = getOnlyDate(day);

  const result = await prisma.day.findUnique({
    where: {
      date: nDay,
    },
    include: {
      gridSlots: {
        orderBy: {
          position: "asc",
        },
        include: {
          game: {
            include: gameDetailsInclude,
          },
        },
      },
    },
  });

  return result?.gridSlots ?? [];
}

export type GameByDayId = Awaited<ReturnType<typeof getGameByDayId>>;

export async function getGameByDayId(dayId: number) {
  const result = await prisma.day.findUnique({
    where: {
      id: dayId,
    },
    include: {
      dailyGame: {
        include: gameDetailsInclude,
      },
    },
  });

  return result?.dailyGame ?? null;
}
