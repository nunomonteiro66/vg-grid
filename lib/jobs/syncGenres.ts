import { igdbRequest } from "../igdb/client";
import prisma from "../prisma";

export async function syncGenres() {
  let offset = 0;
  let total = 0;

  while (true) {
    const response = await igdbRequest(
      "genres",
      `
      fields name;
      limit 500;
      offset ${offset};
      sort id asc;
    `,
    );

    if (response.length === 0) return `Offset: ${offset}; Fetched: ${total}`;

    for (const genre of response) {
      total++;
      await prisma.genres.upsert({
        where: {
          igdbId: genre.id,
        },
        update: {
          name: genre.name,
        },
        create: {
          igdbId: genre.id,
          name: genre.name,
        },
      });
    }

    offset += 500;
  }
}
