import { getAllDays } from "@/lib/db/day";

export async function GET() {
  const days = await getAllDays();

  return Response.json(days);
}
