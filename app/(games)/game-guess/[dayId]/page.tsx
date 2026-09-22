"use client";

import SearchInput from "../_components/ui/SearchInput";
import { IconButton, Popover, Separator, TextField } from "@radix-ui/themes";
import { ComponentProps, useEffect, useRef, useState } from "react";
import type { Game as GameType } from "@/lib/igdb/helpers/types";
import ImgCarousel, { CarouselImg } from "@/components/ImgCarousel";
import { BookmarkIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  InfoIcon,
  Lightbulb,
} from "lucide-react";
import DialogSearch from "../_components/DialogSearch";
import BlanksText from "@/components/BlanksText";
import GameSearchSelect from "../_components/GameSearchSelect";
import ResultMessage from "../_components/ResultMessage";
import Lives from "../_components/Lives";
import Stats from "../_components/Stats";
import Guesses from "../_components/Guesses";
import Hints from "../_components/Hints";
import { GameByDayId, RandomGame } from "@/lib/db/games";
import { GameSearchResult, getGameByDayId } from "@/app/lib/api/games";
import Header from "../../_components/Header";
import {
  loadProgress,
  loadProgressDay,
  saveGuess,
  saveHint,
  saveProgress,
  saveWon,
} from "@/lib/storage/progress";
import { redirect, useParams, useRouter } from "next/navigation";
import { Day } from "@/lib/generated/prisma/client";
import { getDayById } from "@/app/lib/api/day";

export type Guess = {
  id: number;
  name: string;
  close?: boolean;
};

const DEFAULT_LIVES = 5;

export default function GameGuess() {
  const params = useParams();
  const router = useRouter();

  const [lives, setLives] = useState(DEFAULT_LIVES);
  const [game, setGame] = useState<GameByDayId>();
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [hintsUsed, setHintsUsed] = useState<Set<string>>();

  const [won, setWon] = useState(false);

  const [dayId, setDayId] = useState<number>(1);
  const [day, setDay] = useState<Day>();

  useEffect(() => {
    const getGame = async (dayId: number) => {
      const game = await getGameByDayId(dayId);
      if (!game) router.replace(`/game-guess`);
      setGame(game);
    };
    const getDay = async (dayId: number) => {
      const day = await getDayById(dayId);
      day.date = new Date(day.date);
      setDay(day);
      return day;
    };

    const dayId = Number(params.dayId);
    if (!dayId) {
      router.replace(`/game-guess`);
      return;
    }
    setDayId(dayId);
    getGame(dayId);
    getDay(dayId);
  }, []);

  useEffect(() => {
    const currentProgress = loadProgressDay(dayId);
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
      setLives(lives - 1);

      //store in local storage
      saveGuess(dayId, guessedGame);
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
  };

  const goToPreviousDay = () => {
    router.replace(`/game-guess/${dayId - 1}`);
  };

  const goToNextDay = () => {
    router.replace(`/game-guess/${dayId + 1}`);
  };

  const compareDate = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
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
            <IconButton
              onClick={goToNextDay}
              disabled={compareDate(day?.date ?? new Date(), new Date())}
            >
              <ChevronRight></ChevronRight>
            </IconButton>
            <IconButton>
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

        <div className="flex flex-col gap-9 w-1/2">
          <Lives totalLives={5} currentLives={lives} />
          {/* <Stats /> */}
          <Guesses guesses={guesses} />
        </div>
      </div>
    </>
  );
}
