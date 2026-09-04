// lib/jobs/syncGames.ts

import { igdbRequest } from "../igdb/client";
import { fullGameConditions } from "../igdb/helpers/fullgame-conditions";
import prisma from "@/lib/prisma";

type Response = {
  id: number;
  name: string;
  cover: {
    id: number;
    url: string;
  };
  summary: string;
  franchises: number[];
  genres: number[];
  first_release_date: number;
  total_rating: number;
};

export async function syncGames() {
  let offset = 0;
  let total = 0;

  while (true) {
    const response: Response[] = await igdbRequest(
      "games",
      `
      fields name, cover.url, summary, franchises, genres, total_rating, first_release_date;
      limit 500;
      offset ${offset};
      sort id asc;
      where ${fullGameConditions()};
    `,
    );

    if (response.length === 0) return `Offset: ${offset}; Fetched: ${total}`;

    const fetchFranchiseId = async (igdbId: number) => {
      if (!igdbId) return null;
      return (
        await prisma.franchises.findUnique({
          select: {
            id: true,
          },
          where: {
            igdbId: igdbId,
          },
        })
      )?.id;
    };

    const fetchGenres = async (igdbIds: number[]) => {
      if (!igdbIds || igdbIds.length === 0) return null;

      return await prisma.genres.findMany({
        where: {
          igdbId: {
            in: igdbIds,
          },
        },
      });
    };

    for (const game of response) {
      total++;
      const franchiseId = await fetchFranchiseId(game?.franchises?.[0]);
      const genreRows = (await fetchGenres(game.genres)) ?? [];

      await prisma.games.upsert({
        where: {
          igdbId: game.id,
        },
        update: {
          name: game.name,
          coverUrl: game.cover?.url,
          description: game.summary,
          franchiseId,
          releaseDate: game.first_release_date
            ? new Date(game.first_release_date * 1000)
            : undefined,
          totalRating: Math.round(game.total_rating),
          genres: {
            deleteMany: {},
            create: genreRows.map((g) => ({ genreId: g.id })),
          },
        },
        create: {
          igdbId: game.id,
          name: game.name,
          coverUrl: game.cover?.url,
          description: game.summary,
          franchiseId,
          releaseDate: game.first_release_date
            ? new Date(game.first_release_date * 1000)
            : undefined,
          totalRating: Math.round(game.total_rating),
          genres: {
            create: genreRows.map((g) => ({ genreId: g.id })),
          },
        },
      });
    }

    offset += 500;
  }
}
