import { getDayById, getLatestDay } from "@/lib/db/day";
import { getGameByDayId } from "@/lib/db/games";
import Game from "./game";
import { redirect } from "next/navigation";

export type Guess = {
  id: number;
  name: string;
  close?: boolean;
};

type GameGuessProps = {
  params: Promise<{ dayId: number }>;
};

export default async function GameGuess({ params }: GameGuessProps) {
  let dayId = Number((await params).dayId);
  const lastDay = await getLatestDay();
  const game = await getGameByDayId(dayId);

  if (!game) {
    redirect(`/game-guess/${lastDay?.id ?? 1}`);
  }

  const day = await getDayById(dayId);

  return (
    <Game
      day={day}
      dayId={dayId}
      game={game}
      lastDayId={lastDay?.id ?? 0}
    ></Game>
  );
}
