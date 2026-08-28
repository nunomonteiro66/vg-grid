// lib/jobs/syncGames.ts

import { igdbRequest } from "../igdb/client";
import { fullGameConditions } from "../igdb/helpers/fullgame-conditions";
import prisma from "@/lib/prisma";
import normalizeString from "./helpers/normalizeString";

export async function syncGames() {
  let offset = 0;
  let total = 0;

  while (true) {
    const response = await igdbRequest(
      "games",
      `
      fields name, cover.url;
      limit 500;
      offset ${offset};
      sort id asc;
      where ${fullGameConditions()};
    `,
    );

    if (response.length === 0) return `Offset: ${offset}; Fetched: ${total}`;

    for (const game of response) {
      total++;
      await prisma.games.upsert({
        where: {
          igdbId: game.id,
        },
        update: {
          name: game.name,
          coverUrl: game.cover?.url,
        },
        create: {
          igdbId: game.id,
          name: game.name,
          coverUrl: game.cover?.url,
        },
      });
    }

    offset += 500;
  }
}
