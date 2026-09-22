import { getGridByDayId } from "@/lib/db/gridSlot";
import GameGrid from "./gameGrid";
import { getDayById, getLatestDay } from "@/lib/db/day";

type GameGridGuess = {
  params: Promise<{ dayId: number }>;
};

export default async function GameGridGuess({ params }: GameGridGuess) {
  const dayId = Number((await params).dayId ?? 0);
  const day = await getDayById(dayId);
  const games = await getGridByDayId(dayId);
  const lastDay = await getLatestDay();
  return (
    <GameGrid games={games} day={day} lastDayId={lastDay?.id ?? 0}></GameGrid>
  );
}
