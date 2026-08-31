import { igdbRequest } from "./client";

export async function getScreenshots(gameIds: number[]) {
  const where = gameIds.map((id) => `game = ${id}`);

  return igdbRequest(
    "screenshots",
    `
      fields id, url, width, height;
      where ${where.join("|")};
    `,
  );
}
