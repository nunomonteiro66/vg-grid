// src/lib/igdb/games.ts

import { igdbRequest } from "./client";
import { fullGameConditions } from "./helpers/fullgame-conditions";
import { formatOutput } from "./helpers/mapper";
import { Game } from "./helpers/types";

const totalFields = [
  "id",
  "name",
  "platforms.name",
  "first_release_date",
  "screenshots.url",
  "screenshots.width",
  "genres.name",
  "total_rating",
  "involved_companies.publisher",
  "involved_companies.developer",
  "involved_companies.company.name",
];

export async function getGames() {
  return igdbRequest(
    "games",
    `
      fields name, cover.url;
      limit 20;
    `,
  );
}

export async function getGameById(id: number) {
  return igdbRequest(
    "games",
    `
      fields name, cover.url, summary;
      where id = ${id};
    `,
  );
}

export async function searchGames(
  searchTerm: string,
  offset = 0,
): Promise<Game[]> {
  return igdbRequest(
    "games",
    `
      fields name, cover.url;
      limit 200;
      offset ${offset};
      ${searchTerm.length > 6 ? `search "${searchTerm}";` : ""}
      where ${fullGameConditions()} & name ~ *"${searchTerm}"*;
    `,
  );
}

export async function getTotalCount(): Promise<{ count: number }> {
  return igdbRequest(
    "games/count",
    `
      where ${fullGameConditions()};
    `,
  );
}

export async function getRandomGames(n_games: number) {
  const total = (await getTotalCount()).count;

  if (!total) return;

  const randoms = Array.from({ length: n_games }, () =>
    Math.round(Math.random() * total),
  );

  const results = randoms.map((i: number) =>
    igdbRequest(
      "games",
      `
      where ${fullGameConditions()};
      offset ${i};
      limit 1;
      fields ${totalFields.join(",")};
    `,
    ),
  );

  const games = (await Promise.all(results)).flat();

  return games.map(formatOutput);
}
