// lib/jobs/syncScreenshots.ts

import { igdbRequest } from "../igdb/client";
import prisma from "../prisma";

type Response = {
  id: number;
  game: number;
  url: string;
  width: number;
  height: number;
};

export async function syncScreenshots() {
  let gameOffset = 0;
  let total = 0;

  while (true) {
    const games = await prisma.game.findMany({
      select: {
        id: true,
        igdbId: true,
      },
      orderBy: {
        id: "asc",
      },
      skip: gameOffset,
      take: 500,
    });

    if (games.length === 0) return `Fetched: ${total}`;

    const gameIdByIgdbId = new Map(games.map((g) => [g.igdbId, g.id]));
    const where = games.map((g) => `game = ${g.igdbId}`).join("|");

    let screenshotOffset = 0;

    while (true) {
      const response: Response[] = await igdbRequest(
        "screenshots",
        `
        fields id, game, url, width, height;
        limit 500;
        offset ${screenshotOffset};
        sort id asc;
        where ${where};
      `,
      );

      if (response.length === 0) break;

      for (const screenshot of response) {
        total++;
        const gameId = gameIdByIgdbId.get(screenshot.game);

        if (!gameId) continue;

        const url = screenshot.url.replace("t_thumb", "t_1080p");
        await prisma.screenshot.upsert({
          where: {
            igdbId: screenshot.id,
          },
          update: {
            url: url,
            width: screenshot.width,
            height: screenshot.height,
            gameId,
          },
          create: {
            igdbId: screenshot.id,
            url: url,
            width: screenshot.width ?? 800,
            height: screenshot.height ?? 600,
            gameId,
          },
        });
      }

      screenshotOffset += 500;
    }

    gameOffset += 500;
  }
}
