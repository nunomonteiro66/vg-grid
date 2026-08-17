import { Game } from "./types";

function formatScreenshot(url: string) {
  return `https:${url.replace("t_thumb", "t_1080p")}`;
}

export function formatOutput(game: Game) {
  return {
    ...game,
    release_date: game.first_release_date
      ? new Date(game.first_release_date * 1000).toISOString()
      : null,
    screenshots: game.screenshots.map((sc) => ({
      ...sc,
      url: formatScreenshot(sc.url), //replace t_thumb for a bigger image
    })),
    total_rating: Math.round(game.total_rating),
    developers: game.involved_companies
      .filter((ic) => ic.developer)
      .map((ic) => ({
        id: ic.id,
        name: ic.company.name,
      })),
    publishers: game.involved_companies
      .filter((ic) => ic.publisher)
      .map((ic) => ({
        id: ic.id,
        name: ic.company.name,
      })),
  };
}
