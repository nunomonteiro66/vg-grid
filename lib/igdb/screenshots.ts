import { igdbRequest } from "./client";

export async function getScreenshots(gameId: number) {
  return igdbRequest(
    "games",
    `
      fields id, url, width, height;
      limit 100;
      where game=${gameId}
    `
  )
}