import { igdbRequest } from "../igdb/client";
import prisma from "../prisma";

type Response = {
  id: number;
  name: string;
};

export async function syncPlatforms() {
  let offset = 0;
  let total = 0;

  while (true) {
    const response: Response[] = await igdbRequest(
      "games",
      `
          fields name;
          limit 500;
          offset ${offset};
          sort id asc;
        `,
    );

    if (response.length === 0) return `Offset: ${offset}; Fetched: ${total}`;

    for (const platform of response) {
      total++;

      await prisma.platforms.upsert({
        where: {
          igdbId: platform.id,
        },
        update: {
          name: platform.name,
        },
        create: {
          igdbId: platform.id,
          name: platform.name,
        },
      });
    }
  }
}
