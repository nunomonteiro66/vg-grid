"use client";

import { Button, IconButton } from "@radix-ui/themes";
import Header from "../../_components/Header";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { DEFAULT_LIVES } from "@/lib/constants";
import { Guess } from "./page";
import {
  loadProgressDayId,
  saveGuess,
  saveHint,
  saveLost,
  saveProgress,
  saveWon,
} from "@/lib/storage/progress";
import { GameSearchResult } from "@/app/lib/api/games";
import ImgCarousel, { CarouselImg } from "@/components/ImgCarousel";
import BlanksText from "@/components/BlanksText";
import GameSearchSelect from "../_components/GameSearchSelect";
import ResultMessage from "../_components/ResultMessage";
import Hints from "../_components/Hints";
import Lives from "../_components/Lives";
import Guesses from "../_components/Guesses";
import { useRouter } from "next/navigation";
import { Day, Game as GameType } from "@/lib/generated/prisma/client";

type GameProps = {
  dayId: number;
  day: Day;
  game: GameType;
  lastDayId: number;
};

export default function Game({ dayId, day, game, lastDayId }: GameProps) {
  const router = useRouter();
  const [lives, setLives] = useState(DEFAULT_LIVES);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [hintsUsed, setHintsUsed] = useState<Set<string>>();
  const [won, setWon] = useState(false);

  useEffect(() => {
    const currentProgress = loadProgressDayId(dayId);
    if (!currentProgress) saveProgress(dayId, [], [], false);
    setGuesses(currentProgress?.guesses ?? []);
    setLives(DEFAULT_LIVES - (currentProgress?.guesses.length ?? 0));
    setHintsUsed(new Set(currentProgress?.hints ?? []));
    setWon(currentProgress?.won ?? false);
  }, [dayId]);

  const onGameSelect = (guessedGame: GameSearchResult) => {
    //check if guess is correct
    if (game?.id === guessedGame.id) {
      setWon(true);
      saveWon(dayId);
    } else {
      setGuesses((prev) => {
        const isClose = game?.franchiseId === guessedGame.franchise?.id;
        return [
          ...prev,
          {
            id: guessedGame.id,
            name: guessedGame.name,
            close: isClose,
          },
        ];
      });
      const currentLives = lives - 1;
      setLives(currentLives);

      //store in local storage
      saveGuess(dayId, guessedGame);

      if (currentLives <= 0) {
        saveLost(dayId);
      }
    }
  };

  const onHintUsed = (hint: string) => {
    setHintsUsed((prev) => {
      const next = new Set(prev);
      next.add(hint);
      return next;
    });

    saveHint(dayId, hint);
  };

  const giveUp = () => {
    setLives(0);
    saveLost(dayId);
  };

  const goToPreviousDay = () => {
    router.push(`/game-guess/${dayId - 1}`);
  };

  const goToNextDay = () => {
    router.push(`/game-guess/${dayId + 1}`);
  };

  const goToList = () => {
    router.push(`/game-guess/list`);
  };

  const isLocal = process.env.NODE_ENV !== "production";

  return (
    <>
      <Header pageTitle={"GAME GUESS"}>
        <>
          <div className="flex gap-2 items-center">
            <IconButton onClick={goToPreviousDay} disabled={dayId === 1}>
              <ChevronLeft></ChevronLeft>
            </IconButton>
            <p>
              {day && day?.date.toDateString()} - #{dayId}
            </p>
            <IconButton onClick={goToNextDay} disabled={lastDayId === day?.id}>
              <ChevronRight></ChevronRight>
            </IconButton>
            <IconButton onClick={goToList}>
              <Calendar></Calendar>
            </IconButton>
          </div>
          <p>Streak goes here</p>
        </>
      </Header>
      <div className="flex gap-9">
        <div className="flex flex-col bg-[#262323] p-4 gap-3 w-2/3">
          {isLocal && (
            <>
              <p className="bg-yellow-900 text-yellow-200 p-1 text-xs">
                DEV: answer is {game?.name ?? "loading..."} - {game?.id}
              </p>
              <Button onClick={() => saveProgress(dayId, [], [])}>
                Clear Progress
              </Button>
            </>
          )}

          {game ? (
            <ImgCarousel imgs={game?.screenshots as CarouselImg[]} />
          ) : (
            <div className="w-125 h-70"></div>
          )}

          <div className="flex whitespace-pre flex-wrap">
            {lives != 0 && !won ? (
              <BlanksText text={game?.name ?? ""} />
            ) : (
              <>
                <p>{game?.name}</p>
              </>
            )}
          </div>

          {!won && lives !== 0 ? (
            <div className="flex gap-2 w-full">
              <GameSearchSelect
                className="w-full"
                onGameSelect={onGameSelect}
                guesses={guesses}
              />
              <Button variant="destructive" onClick={giveUp}>
                Give Up
              </Button>
            </div>
          ) : (
            <ResultMessage won={won && lives != 0} />
          )}

          <Hints game={game} hintsUsed={hintsUsed} onHintUsed={onHintUsed} />
        </div>

        <div className="flex flex-col gap-9 ">
          <Lives totalLives={5} currentLives={lives} />
          {/* <Stats /> */}
          <Guesses guesses={guesses} />
        </div>
      </div>
    </>
  );
}
