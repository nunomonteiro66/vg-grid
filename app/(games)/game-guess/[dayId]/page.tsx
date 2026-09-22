import { getDayById, getLatestDay } from "@/lib/db/day";
import { getGameByDayId } from "@/lib/db/games";
import Game from "./game";

export type Guess = {
  id: number;
  name: string;
  close?: boolean;
};

type GameGuessProps = {
  params: Promise<{ dayId: number }>;
};

export default async function GameGuess({ params }: GameGuessProps) {
  const dayId = Number((await params).dayId ?? 0);
  const day = await getDayById(dayId);
  const game = await getGameByDayId(dayId);
  const lastDay = await getLatestDay();

  return (
    <Game
      day={day}
      dayId={dayId}
      game={game}
      lastDayId={lastDay?.id ?? 0}
    ></Game>
  );
}
