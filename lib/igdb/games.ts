// src/lib/igdb/games.ts

import { igdbRequest } from "./client";
import { formatOutput } from "./helpers/mapper";
import { Game } from "./helpers/types";

//!!!! TO-DO
// - set cases when data comes undefined/null (to test, remove fields)

const platforms = [
  // PlayStation
  7, // PlayStation
  8, // PlayStation 2
  9, // PlayStation 3
  48, // PlayStation 4
  167, // PlayStation 5
  38, // PlayStation Portable
  46, // PlayStation Vita
  165, // PlayStation VR
  390, // PlayStation VR2

  // Xbox
  11, // Xbox
  12, // Xbox 360
  49, // Xbox One
  169, // Xbox Series X|S

  // Nintendo - consoles
  4, // Nintendo 64
  21, // Nintendo GameCube
  5, // Wii
  41, // Wii U
  130, // Nintendo Switch
  508, // Nintendo Switch 2

  // Nintendo - handheld
  33, // Game Boy
  22, // Game Boy Color
  24, // Game Boy Advance
  20, // Nintendo DS
  159, // Nintendo DSi
  37, // Nintendo 3DS
  137, // New Nintendo 3DS

  // Sega
  32, // Sega Saturn
  23, // Dreamcast

  // PC
  6, // PC (Microsoft Windows)
  3, // Linux
  14, // Mac

  // VR
  384, // Oculus Quest
  386, // Meta Quest 2
  471, // Meta Quest 3
  385, // Oculus Rift
  163, // SteamVR

  // Other modern platforms
  170, // Google Stadia
  381, // Playdate
];

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

// game_type = main_game or remake
// game_status = null (avoids cases like beta, early_access, ...) or released
// first_release_date = !null (it has a valid date) & < now (no future releases)
// version_parent = null (it's not a bundle or version of game - f.e "gold")
// platforms =
const fullGameConditions = () => {
  const now = Math.floor(Date.now() / 1000);

  return `
  (game_type = 0 | game_type = 8) &
  (game_status = null | game_status = 0) & 
  first_release_date < ${now} &
  version_parent = null &
  platforms = (${platforms.join(",")}) &
  total_rating > 75
`;
};

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
      search "${searchTerm}";
      where ${fullGameConditions()};
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
