"use client";

import GameSquare from "../_components/GameSquare";
import Lives from "../_components/Lives";
import { Game } from "@/lib/igdb/helpers/types";
import { Button, Card } from "@radix-ui/themes";
import { ComponentProps, useEffect, useRef, useState } from "react";
import Header from "../../../../components/Header";
import { RandomGame } from "@/lib/db/games";
import { Dialog } from "radix-ui";
import { CustomDialog } from "@/components/CustomDialog";
import { GameGrid as GameGridType } from "@/lib/db/gridSlot";
import { Day } from "@/lib/generated/prisma/client";
import { DEFAULT_GRID_LIVES } from "@/lib/constants";
import { GameGridStorageClass } from "@/lib/storage/progress";
import GamePaginator from "../../_components/GamePaginator";

type GameGridProps = {
  games: GameGridType[];
  day: Day;
  lastDayId: number;
};

export default function GameGrid({ games, day, lastDayId }: GameGridProps) {
  const [lives, setLives] = useState<number>(DEFAULT_GRID_LIVES);
  const [messageOpen, setMessageOpen] = useState(false);

  const storageClassRef = useRef<GameGridStorageClass | null>(null);
  if (storageClassRef.current === null) {
    storageClassRef.current = new GameGridStorageClass(day.id);
  }

  //the status of each "square"
  //true -> won
  //false -> not yet done
  const [allGameStatus, setAllGameStatus] = useState(
    Array<boolean>(9).fill(false),
  );

  useEffect(() => {
    if (allGameStatus.every((f) => f === true) || lives === 0)
      setMessageOpen(true);
  }, [lives, allGameStatus]);

  useEffect(() => {
    const currentProgress = storageClassRef.current?.progressDay;

    console.log("CURRENT DAY IS: ", currentProgress);

    if (currentProgress?.lives !== undefined) setLives(currentProgress.lives);
    if (currentProgress?.gridWon) setAllGameStatus(currentProgress?.gridWon);

    console.log(allGameStatus);
  }, [day.id]);

  const setGameWon = (index: number) => {
    const arrCopy = [...allGameStatus];
    arrCopy[index] = true;
    setAllGameStatus(arrCopy);

    storageClassRef.current?.saveWonSquare(arrCopy);
  };

  const reduceLife = () => {
    const newLives = lives - 1;
    setLives(newLives);
    storageClassRef.current?.saveCurrentLives(lives - 1);

    if (newLives === 0) {
      const newArr = allGameStatus.map((status) =>
        status === undefined ? false : status,
      );

      setAllGameStatus(newArr);

      storageClassRef.current?.saveWonSquare(newArr);
    }
  };

  const isLocal = process.env.NODE_ENV !== "production";

  return (
    <>
      <Header pageTitle="GRID GAME">
        <GamePaginator
          day={day}
          lastDayId={lastDayId}
          className="w-1/3 justify-center"
        ></GamePaginator>
        <Lives lives={lives} className="w-1/3 justify-end" />
      </Header>
      <div className="flex flex-col gap-5">
        {isLocal && (
          <div>
            <Button onClick={reduceLife}>REDUCE LIVE</Button>
          </div>
        )}
        {Array.from({ length: 3 }).map((_, row) => (
          <div
            className="grid grid-cols-3 gap-16"
            key={`row-${row}`}
            id={`row-${row}`}
          >
            {Array.from({ length: 3 }).map((_, col) => {
              const index = row * 3 + col;
              const game = games?.at(index);
              const gameWon = allGameStatus.at(index);

              console.log("GAME STATUS: ", index, gameWon);

              return (
                <Card
                  key={`game-${row * 3}-${col}`}
                  className={
                    gameWon ? "bg-green-600" : lives === 0 ? "bg-red-600" : ""
                  }
                >
                  <GameSquare
                    game={game?.game}
                    gameOver={lives === 0}
                    gameWon={gameWon ?? false}
                    setGameWon={() => setGameWon(index)}
                    reduceLife={reduceLife}
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
