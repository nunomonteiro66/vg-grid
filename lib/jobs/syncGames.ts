// lib/jobs/syncGames.ts

import { igdbRequest } from "../igdb/client";
import { fullGameConditions } from "../igdb/helpers/fullgame-conditions";
import prisma from "@/lib/prisma";

export async function syncGames() {
  let offset = 0;
  let total = 0;

  while (true) {
    const response = await igdbRequest(
      "games",
      `
      fields name, cover.url, summary, franchises;
      limit 500;
      offset ${offset};
      sort id asc;
      where ${fullGameConditions()};
    `,
    );

    if (response.length === 0) return `Offset: ${offset}; Fetched: ${total}`;

    const fetchFranchiseId = async (igdbId: number) => {
      return (
        await prisma.franchises.findFirst({
          select: {
            id: true,
          },
          where: {
            igdbId: igdbId,
          },
        })
      )?.id;
    };

    for (const game of response) {
      total++;
      await prisma.games.upsert({
        where: {
          igdbId: game.id,
        },
        update: {
          name: game.name,
          coverUrl: game.cover?.url,
          description: game.summary,
          franchiseId: await fetchFranchiseId(game?.franchises?.[0]),
        },
        create: {
          igdbId: game.id,
          name: game.name,
          coverUrl: game.cover?.url,
          description: game.summary,
          franchiseId: await fetchFranchiseId(game?.franchises?.[0]),
        },
      });
    }

    offset += 500;
  }
}
