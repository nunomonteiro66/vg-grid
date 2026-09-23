import { getGridByDayId } from "@/lib/db/gridSlot";
import GameGrid from "./gameGrid";
import { getDayById, getLatestDay } from "@/lib/db/day";
import { redirect } from "next/navigation";

type GameGridGuess = {
  params: Promise<{ dayId: number }>;
};

export default async function GameGridGuess({ params }: GameGridGuess) {
  const dayId = Number((await params).dayId ?? 0);
  const games = await getGridByDayId(dayId);
  const lastDay = await getLatestDay();

  if (!games || games.length === 0) redirect(`/game-grid/${lastDay?.id ?? 1}`);

  const day = await getDayById(dayId);
  return (
    <GameGrid games={games} day={day} lastDayId={lastDay?.id ?? 0}></GameGrid>
  );
}
