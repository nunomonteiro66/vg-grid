import { syncFranchises } from "./syncFranchises";
import { syncGames } from "./syncGames";
import { syncGenres } from "./syncGenres";

export async function syncAll() {
  await syncGenres();
  console.log("Successfully sync genres");
  await syncFranchises();
  console.log("Successfully sync franchises");
  await syncGames();
  console.log("Successfully sync games");
}
