import { igdbRequest } from "./client";
import { Screenshot } from "./helpers/types";

export async function getScreenshots(
  gameIds: number[],
): Promise<Screenshot[]> {
  const where = gameIds.map((id) => `game = ${id}`);

  return igdbRequest(
    "screenshots",
    `
      fields id, url, width, height;
      where ${where.join("|")};
    `,
  );
}
