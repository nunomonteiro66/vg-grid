import { igdbRequest } from "./client";
import { Screenshot } from "./helpers/types";

export async function getScreenshots(
  gameIds: number[] | number,
): Promise<Screenshot[]> {
  const where = Array.isArray(gameIds)
    ? gameIds.map((id) => `game = ${id}`).join("|")
    : `game = ${gameIds}`;

  return igdbRequest(
    "screenshots",
    `
      fields id, game, url, width, height;
      where ${where};
    `,
  );
}
