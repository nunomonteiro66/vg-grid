import { getLatestDay } from "@/lib/db/day";

export async function GET() {
  const day = await getLatestDay();

  return Response.json(day);
}
