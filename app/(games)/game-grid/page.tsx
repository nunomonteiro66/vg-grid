"use client";

import GameSquare from "./_components/GameSquare";
import Lives from "./_components/Lives";
import { Game } from "@/lib/igdb/helpers/types";
import { Card } from "@radix-ui/themes";
import { ComponentProps, useEffect, useState } from "react";
import Header from "../_components/Header";
import { RandomGame } from "@/lib/db/games";
import { Dialog } from "radix-ui";
import { CustomDialog } from "@/components/CustomDialog";
import MessageDialog from "@/components/MessageDialog";

export default function GameGrid() {
  const [games, setGames] = useState<RandomGame[]>();
  const [lives, setLives] = useState(5);
  const [messageOpen, setMessageOpen] = useState(false);

  //the status of each "square"
  //true -> won
  //false -> lost
  const [allGameStatus, setAllGameStatus] = useState(
    Array<boolean>(9).fill(false),
  );

  useEffect(() => {
    const getRandomGame = async () => {
      const response = await fetch(`/api/games/random?n_games=9`);

      const results = (await response.json()) as RandomGame[];

      setGames(results);
    };
    getRandomGame();
  }, []);

  const setGameWon = (index: number) => {
    const arrCopy = [...allGameStatus];
    arrCopy[index] = true;
    setAllGameStatus(arrCopy);
  };

  useEffect(() => {
    if (allGameStatus.every((f) => f === true) || lives === 0)
      setMessageOpen(true);
  }, [lives, allGameStatus]);

  return (
    <>
      <Header pageTitle="GRID GAME">
        <Lives lives={lives} />
      </Header>
      {allGameStatus.filter((f) => f === false).length === 0 ? "ALLL WON" : ""}
      <div className="flex flex-col gap-5">
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
      <CustomDialog.Root
        open={messageOpen}
        onClose={() => setMessageOpen(false)}
      >
        <CustomDialog.Content minHeight="fit-content">
          <div className="justify-center flex">
            {lives === 0 ? "LOST" : "WON"}
          </div>
        </CustomDialog.Content>
      </CustomDialog.Root>
    </>
  );
}
