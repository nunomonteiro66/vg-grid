import { igdbRequest } from "../igdb/client";
import { fullGameConditions } from "../igdb/helpers/fullgame-conditions";
import prisma from "../prisma";

export async function syncFranchises() {
  let offset = 0;
  let total = 0;

  while (true) {
    const response = await igdbRequest(
      "franchises",
      `
      fields name;
      limit 500;
      offset ${offset};
      sort id asc;
    `,
    );

    if (response.length === 0) return `Offset: ${offset}; Fetched: ${total}`;

    for (const franchise of response) {
      total++;
      await prisma.franchises.upsert({
        where: {
          igdbId: franchise.id,
        },
        update: {
          name: franchise.name,
          igdbId: franchise.id,
        },
        create: {
          name: franchise.name,
          igdbId: franchise.id,
        },
      });
    }

    offset += 500;
  }
}
