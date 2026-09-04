import { Button } from "@/components/ui/button";
import { RandomGame } from "@/lib/db/games";
import { Lightbulb } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type HintsProps = {
  game?: RandomGame;
};

export default function Hints({ game }: HintsProps) {
  const [hintsUsed, setHintsUsed] = useState<Set<string>>();

  const hints = useMemo(() => {
    return [
      {
        label: "PLATFORMS",
        value: game?.platforms?.map((plat) => plat.name).join(", "),
      },
      {
        label: "RELEASE DATE",
        value: game?.releaseDate
          ? new Date(game?.releaseDate).toLocaleDateString("pt-PT")
          : undefined,
      },
      {
        label: "GENRE",
        value: game?.genres?.map((g) => g.name).join(", "),
      },
      {
        label: "RATING",
        value: game?.totalRating ? String(game?.totalRating) : undefined,
      },
    ].filter((hint) => hint.value);
  }, [game]);

  console.log(game);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3">
        <Lightbulb /> <span>HINTS</span>
      </div>
      <div className="flex gap-2">
        {hints.map((hint) => (
          <Button
            key={`${hint.label}-button`}
            variant="outline"
            className="rounded-none"
            disabled={hintsUsed?.has(hint.label)}
            onClick={() =>
              setHintsUsed((prev) => {
                const next = new Set(prev);
                next.add(hint.label);
                return next;
              })
            }
          >
            {hintsUsed?.has(hint.label) ? hint.value : hint.label}
          </Button>
        ))}

        {hints.length === 0 && <div>No Hints Available</div>}
      </div>
    </div>
  );
}
