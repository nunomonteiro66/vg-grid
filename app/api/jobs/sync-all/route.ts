import { syncAll } from "@/lib/jobs/syncAll";
import { syncFranchises } from "@/lib/jobs/syncFranchises";
import { syncGames } from "@/lib/jobs/syncGames";

export async function GET() {
  const result = await syncAll();

  return Response.json({ success: true, fetched: result });
}
