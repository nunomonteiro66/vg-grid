"use client";

import React, { ComponentProps, useRef, useState } from "react";
import ImgCarousel from "@/components/ImgCarousel";
import BlanksText from "@/components/BlanksText";
import { CustomDialog } from "@/components/CustomDialog";
import GameSearchSelect from "@/app/(games)/game-guess/_components/GameSearchSelect";
import { IconButton } from "@radix-ui/themes";
import { Expand } from "lucide-react";
import { Guess } from "../../game-guess/[dayId]/page";
import { GameSearchResult } from "@/app/lib/api/games";
import { RandomGame } from "@/lib/db/games";
import { GameGrid } from "@/lib/db/gridSlot";

type GameSquareProps = ComponentProps<"div"> & {
  game?: GameGrid["game"];
  gameOver: boolean;
  setGameWon: () => void;
  reduceLife: () => void;
};

type DialogProps = {
  children: React.ReactNode;
};

function Dialog({ children }: DialogProps) {
  return (
    <CustomDialog.Root>
      <CustomDialog.Trigger>
        <div className="flex justify-end">
          <IconButton variant="ghost" radius="full" highContrast>
            <Expand size="10px" />
          </IconButton>
        </div>
      </CustomDialog.Trigger>
      <CustomDialog.Content>{children}</CustomDialog.Content>
    </CustomDialog.Root>
  );
}

export default function GameSquare({
  game,
  gameOver,
  setGameWon,
  reduceLife,
  ...props
}: GameSquareProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [won, setWon] = useState(true);
  const hideAnswer = !revealed && !gameOver;
  const [guesses, setGuesses] = useState<Guess[]>([]);

  const checkGameSelect = (guessedGame: GameSearchResult) => {
    if (game?.id === guessedGame.id) {
      setRevealed(true);
      setGameWon();
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
      reduceLife();
    }
  };

  const Square = (
    <>
      {game?.name}
      <div key={game?.id}>
        <ImgCarousel
          imgs={game?.screenshots ?? []}
          selectedIndex={selectedImage}
          onImageChange={setSelectedImage}
        />
      </div>
      <div className="flex flex-col justify-between h-full gap-2">
        {hideAnswer ? (
          <>
            <BlanksText
              text={game?.name ?? ""}
              className="border-2 border-gray-400 min-h-6"
            />
            <GameSearchSelect
              onGameSelect={checkGameSelect}
              guesses={guesses}
            ></GameSearchSelect>
          </>
        ) : (
          <>{game?.name}</>
        )}
      </div>
    </>
  );

  return (
    <div className="flex flex-col gap-2 h-full">
      <Dialog>{Square}</Dialog>
      {Square}
    </div>
  );
}
