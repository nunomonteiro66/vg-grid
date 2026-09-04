import { Game } from "@/lib/igdb/helpers/types";
import React, { ComponentProps, useRef, useState } from "react";
import ImgCarousel from "@/components/ImgCarousel";
import BlanksText from "@/components/BlanksText";
import { CustomDialog } from "@/components/CustomDialog";
import GameSearchSelect from "@/app/game-guess/_components/GameSearchSelect";
import { IconButton } from "@radix-ui/themes";
import { Expand } from "lucide-react";

type GameSquareProps = ComponentProps<"div"> & {
  game?: Game;
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
  const [wrongGuesses, setWrongGuesses] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [won, setWon] = useState(true);
  const hideAnswer = !revealed && !gameOver;

  const checkGameSelect = (gameId: number) => {
    if (game?.id === gameId) {
      setRevealed(true);
      setGameWon();
    } else {
      setWrongGuesses([...wrongGuesses, gameId]);
      reduceLife();
    }
  };

  const Square = (
    <>
      {game?.name}
      <ImgCarousel
        imgs={game?.screenshots ?? []}
        selectedIndex={selectedImage}
        onImageChange={setSelectedImage}
      />
      <div className="flex flex-col justify-between h-full gap-2">
        {hideAnswer ? (
          <BlanksText
            text={game?.name ?? ""}
            className="border-2 border-gray-400 min-h-6"
          />
        ) : (
          <>{game?.name}</>
        )}
        <GameSearchSelect
          excludeList={wrongGuesses}
          similarList={[]}
          onGameSelect={(game) => {
            checkGameSelect(game.id);
          }}
        ></GameSearchSelect>
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
