import { getDayById } from "@/lib/db/day";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const dayId = Number(searchParams.get("id"));

  if (!dayId) {
    return Response.json({ error: "Missing dayId" }, { status: 400 });
  }

  const day = await getDayById(dayId);

  return Response.json(day);
}
