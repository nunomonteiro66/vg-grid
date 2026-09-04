"use client";

import SearchInput from "./_components/ui/SearchInput";
import { Popover, Separator, TextField } from "@radix-ui/themes";
import { ComponentProps, useEffect, useRef, useState } from "react";
import type { Game as GameType } from "@/lib/igdb/helpers/types";
import ImgCarousel, { CarouselImg } from "@/components/ImgCarousel";
import { BookmarkIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { InfoIcon, Lightbulb } from "lucide-react";
import DialogSearch from "./_components/DialogSearch";
import BlanksText from "@/components/BlanksText";
import GameSearchSelect from "./_components/GameSearchSelect";
import SearchableSelect from "./_components/SearchableSelect";
import ResultMessage from "./_components/ResultMessage";
import Lives from "./_components/Lives";
import Stats from "./_components/Stats";
import Guesses from "./_components/Guesses";
import Hints from "./_components/Hints";
import { RandomGame } from "@/lib/db/games";
import { GameSearchResult } from "../lib/api/games";

export default function GameGuess() {
  const [lifes, setLifes] = useState(5);
  const [hintsRemaining, setHintsRemaining] = useState(6);
  const [game, setGame] = useState<RandomGame>();
  const [guesses, setGuesses] = useState<Pick<GameType, "id" | "name">[]>([]);

  const [wrong, setWrong] = useState<Pick<GameType, "id" | "name">[]>([]); //games that are completely wrong
  const [close, setClose] = useState<Pick<GameType, "id" | "name">[]>([]); //games that are similar ot the answer (same franchise)

  const [won, setWon] = useState(false);

  const hints = ["RELEASE DATE", "GENRE", "DEVELOPER", "PLATFORMS"];

  useEffect(() => {
    const getRandomGame = async () => {
      const response = await fetch(`/api/games/random`);

      const results = (await response.json()) as RandomGame[];

      setGame(results[0]);
    };
    getRandomGame();
  }, []);

  const onGameSelect = (guessedGame: GameSearchResult) => {
    //check if guess is correct
    if (game?.id === guessedGame.id) {
      setWon(true);
    } else {
      if (game?.franchiseId === guessedGame.franchise.id) {
        setClose([...close, game]);
      } else {
        setWrong([...wrong, game!]);
      }

      setGuesses([...guesses, guessedGame]);
      setLifes(lifes - 1);
    }
  };

  const giveUp = () => {
    setLifes(0);
  };

  const isLocal = process.env.NODE_ENV !== "production";

  return (
    <div className="flex gap-9">
      <div className="flex flex-col bg-[#262323] p-4 gap-3 w-2/3">
        {isLocal && (
          <p className="bg-yellow-900 text-yellow-200 p-1 text-xs">
            DEV: answer is {game?.name ?? "loading..."}
          </p>
        )}

        {game ? (
          <ImgCarousel imgs={game?.screenshots as CarouselImg[]} />
        ) : (
          <div className="w-125 h-70"></div>
        )}

        <div className="flex whitespace-pre flex-wrap">
          {lifes != 0 && !won ? (
            <BlanksText text={game?.name ?? ""} />
          ) : (
            <>
              <p>{game?.name}</p>
            </>
          )}
        </div>

        {!won && lifes !== 0 ? (
          <div className="flex gap-2 w-full">
            <GameSearchSelect
              className="w-full"
              onGameSelect={onGameSelect}
              excludeList={guesses.map((g) => g.id)}
              similarList={[]}
            />
            <Button variant="destructive" onClick={giveUp}>
              Give Up
            </Button>
          </div>
        ) : (
          <ResultMessage won={won && lifes != 0} />
        )}

        <Hints game={game} />
      </div>

      <div className="flex flex-col gap-9 w-1/2">
        <Lives />
        <Stats />
        <Guesses />
      </div>
    </div>
  );
}
