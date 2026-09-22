import { getLatestDay } from "@/lib/db/day";
import { redirect } from "next/navigation";

export default async function GameGridGuessIndexPage() {
  const latest = await getLatestDay();

  const id = latest ? latest?.id : 1; //!!!!!

  redirect(`/game-grid/${id}`);
}
