import { syncFranchises } from "@/lib/jobs/syncFranchises";
import { syncGames } from "@/lib/jobs/syncGames";

export async function GET() {
  const result = await syncFranchises();

  return Response.json({ success: true, fetched: result });
}
