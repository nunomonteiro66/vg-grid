import { ComponentProps, useEffect, useMemo, useRef, useState } from "react";
import SearchableSelect from "./SearchableSelect";
import { GameSearchResult, searchGames } from "@/app/lib/api/games";
import { DropdownItem, DropdownItemvariant } from "./ui/types";
import { Guess } from "../page";

type GameSearchSelectProps = ComponentProps<"div"> & {
  onGameSelect: (game: GameSearchResult) => void;
  guesses: Guess[];
};

export default function GameSearchSelect({
  onGameSelect,
  guesses,
  ...props
}: GameSearchSelectProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [results, setResults] = useState<GameSearchResult[]>([]);

  const currentGames = useMemo(() => {
    return results.map((res) => {
      const guessed = guesses.find((guess) => guess.id == res.id);

      let disabled = guessed! != undefined;

      let variant = guessed
        ? guessed.close
          ? "warning"
          : "danger"
        : "default";

      return {
        id: res.id,
        icon: res.coverUrl ?? undefined,
        name: res.name,
        disabled: disabled,
        variant: variant as DropdownItemvariant,
      };
    });
  }, [results, guesses]);

  const handleSearch = (search: string) => {
    if (search.trim().length === 0) {
      setResults([]);
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      searchGames(search).then((results) => setResults(results));
    }, 100);
  };

  const onOptionSelect = (game: DropdownItem) => {
    onGameSelect(results.find((gameR) => gameR.id === game.id)!);
  };

  return (
    <SearchableSelect
      items={currentGames}
      onOptionSelect={onOptionSelect}
      onValueChange={handleSearch}
      {...props}
    />
  );
}
