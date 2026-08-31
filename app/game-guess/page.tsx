"use client";

import SearchInput from "@/components/SearchInput";
import { Card, Popover, Separator, TextField } from "@radix-ui/themes";
import { ComponentProps, useEffect, useRef, useState } from "react";
import type { Game as GameType } from "@/lib/igdb/helpers/types";
import Dropdown from "@/components/Dropdown";
import ImgCarousel, { CarouselImg } from "@/components/ImgCarousel";
import { BookmarkIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import DialogSearch from "@/components/DialogSearch";
import BlanksText from "@/components/BlanksText";
import { DropdownItem as Game } from "@/components/Dropdown";
import GameSearchSelect from "@/components/GameSearchSelect";

function Header({
  lifes,
  hintsRemaining,
}: {
  lifes: number;
  hintsRemaining: number;
}) {
  return (
    <div className="flex justify-between">
      <Card>
        <div className="flex gap-1.5 items-center">
          <label>Lifes remaining</label>
          <Separator orientation="vertical" />
          <p>{lifes}</p>
        </div>
      </Card>

      <Card>
        <div className="flex gap-1.5 items-center">
          <label>Hints remaining</label>
          <Separator orientation="vertical" />
          <p>{hintsRemaining}</p>
        </div>
      </Card>
    </div>
  );
}

function ResultMessage({ won = false }: { won: boolean }) {
  return (
    <div className={`border-2 ${won ? "text-green-700" : "text-red-700"}`}>
      {won ? (
        <div>
          CORRECT!!! <br />
          Nicely done
        </div>
      ) : (
        <div>
          FAILED!!! <br /> BETTER LUCK NEXT TIME{" "}
        </div>
      )}
    </div>
  );
}

export default function GameGuess() {
  const [lifes, setLifes] = useState(5);
  const [hintsRemaining, setHintsRemaining] = useState(6);
  const [hints, setHints] = useState<{ type: string; value: string }[]>([]);
  const [game, setGame] = useState<GameType>();
  const [guesses, setGuesses] = useState<Pick<GameType, "id" | "name">[]>([]);
  const [won, setWon] = useState(false);

  useEffect(() => {
    const getRandomGame = async () => {
      const response = await fetch(`/api/games/random`);

      const results = (await response.json()) as GameType[];

      setGame(results[0]);
    };
    getRandomGame();
  }, []);

  const onGameSelect = (guessedGame: { id: number; name: string }) => {
    console.log(game);
    console.log(guessedGame);
    //check if guess is correct
    if (game?.id === guessedGame.id) {
      setWon(true);
    } else {
      setGuesses([...guesses, guessedGame]);
      setLifes(lifes - 1);
    }
  };

  const getHint = () => {
    const newHint = {
      type: "",
      value: "",
    };
    const defaultHint = "Unknown";
    switch (hintsRemaining) {
      case 1:
        const platforms = game?.platforms
          ? game.platforms.map((plat) => plat.name)
          : [];
        newHint.type = "Platforms";
        newHint.value =
          platforms.length != 0 ? platforms.join(", ") : defaultHint;
        break;

      case 2:
        const releaseDate = game?.release_date;
        newHint.type = "Release Date";
        newHint.value = releaseDate
          ? new Date(releaseDate).toLocaleDateString("pt-PT")
          : defaultHint;
        break;

      case 3:
        const genres = game?.genres.map((g) => g.name);
        newHint.type = "Genres";
        newHint.value = genres ? genres.join(", ") : defaultHint;
        break;
      case 4:
        newHint.type = "Rating";
        newHint.value = game?.total_rating
          ? String(game?.total_rating)
          : "Unknown";
        break;
      case 5:
        newHint.type = "Developers";
        newHint.value = game?.developers
          ? game.developers.map((d) => d.name).join(", ")
          : "Unknown";
        break;
      case 6:
        newHint.type = "Publishers";
        newHint.value = game?.publishers
          ? game.publishers.map((d) => d.name).join(", ")
          : "Unknown";
        break;
    }
    setHints([...hints, newHint]);
    setHintsRemaining(hintsRemaining - 1);
  };

  const giveUp = () => {
    setLifes(0);
  };

  return (
    <div className="gap-7 flex flex-col">
      <Header lifes={lifes} hintsRemaining={hintsRemaining} />
      <div className="flex flex-col gap-3 max-w-125">
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
            <Button
              variant="outline"
              size="icon"
              aria-label="hint"
              onClick={getHint}
              disabled={hintsRemaining === 0}
            >
              <InfoIcon />
            </Button>
            <Button variant="destructive" onClick={giveUp}>
              Give Up
            </Button>
          </div>
        ) : (
          <ResultMessage won={won && lifes != 0} />
        )}

        <div className="flex">
          <div className="flex flex-1 justify-center ">
            <div className="flex flex-col">
              <p className="text-xl text-red-700 text-center">Guesses</p>
              {guesses.map((guess, i) => (
                <p key={`guess-${i}`} className="text-[14px] text-red-700">
                  {guess.name}
                </p>
              ))}
            </div>
          </div>
          <Separator orientation="vertical" className="h-full" />
          <div className="flex flex-1 justify-center ">
            <div className="flex flex-col">
              <p className="text-xl text-blue-900 text-center">Hints</p>
              {hints.map((hint, i) => (
                <span key={`hint-${i}`} className="text-[14px] text-blue-900">
                  <u>{hint.type}:</u> {hint.value}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
