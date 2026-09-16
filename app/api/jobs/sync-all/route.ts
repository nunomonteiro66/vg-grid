import { syncAll } from "@/lib/jobs/syncAll";
import { syncFranchises } from "@/lib/jobs/syncFranchises";
import { syncGames } from "@/lib/jobs/syncGames";
import { syncScreenshots } from "@/lib/jobs/syncScreenshots";

export async function GET() {
  const result = await syncScreenshots();

  return Response.json({ success: true, fetched: result });
}
