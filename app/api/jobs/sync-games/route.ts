//!!! needs protection

import { syncGames } from "@/lib/jobs/syncGames";

export async function GET() {
  const result = await syncGames();

  return Response.json({ success: true, fetched: result });
}
