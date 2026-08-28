"use client";

import GameSquare from "@/components/GameSquare";
import Lives from "@/components/Lives";
import { Game } from "@/lib/igdb/helpers/types";
import { Card } from "@radix-ui/themes";
import { ComponentProps, useEffect, useState } from "react";

export default function GameGrid() {
  const [games, setGames] = useState<Game[]>();
  const [lives, setLives] = useState(5);

  //the status of each "square"
  //true -> won
  //false -> lost
  const [allGameStatus, setAllGameStatus] = useState(
    Array<boolean>(9).fill(false),
  );

  useEffect(() => {
    const getRandomGame = async () => {
      const response = await fetch(`/api/games/random?n_games=9`);

      const results = (await response.json()) as Game[];

      setGames(results);
    };
    getRandomGame();
  }, []);

  const setGameWon = (index: number) => {
    const arrCopy = [...allGameStatus];
    arrCopy[index] = true;
    setAllGameStatus(arrCopy);
  };

  return (
    <div className="flex flex-col gap-5">
      <Lives lives={lives} />
      {Array.from({ length: 3 }).map((_, row) => (
        <div
          className="grid grid-cols-3 gap-16"
          key={`row-${row}`}
          id={`row-${row}`}
        >
          {Array.from({ length: 3 }).map((_, col) => {
            const index = row * 3 + col;
            const game = games?.at(index);

            return (
              <Card
                key={`game-${row * 3}-${col}`}
                className={
                  allGameStatus.at(index)
                    ? "bg-green-600"
                    : lives === 0
                      ? "bg-red-600"
                      : ""
                }
              >
                <GameSquare
                  game={game}
                  gameOver={lives === 0}
                  setGameWon={() => setGameWon(index)}
                  reduceLife={() => setLives(lives - 1)}
                />
              </Card>
            );
          })}
        </div>
      ))}
    </div>
  );
}
