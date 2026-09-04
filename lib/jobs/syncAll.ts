import { syncFranchises } from "./syncFranchises";
import { syncGames } from "./syncGames";
import { syncGenres } from "./syncGenres";
import { syncPlatforms } from "./syncPlatforms";

export async function syncAll() {
  await syncGenres();
  console.log("Successfully sync genres");
  await syncFranchises();
  console.log("Successfully sync franchises");
  await syncPlatforms();
  console.log("Successfully sync platforms");
  await syncGames();
  console.log("Successfully sync games");
}
