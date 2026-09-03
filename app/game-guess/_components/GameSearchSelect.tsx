import { ComponentProps, useMemo, useRef, useState } from "react";
import SearchableSelect from "./SearchableSelect";
import { GameSearchResult, searchGames } from "@/app/lib/api/games";
import { DropdownItem, DropdownItemvariant } from "./Dropdown";

type onGameSelectType = {
  id: number;
  name: string;
  franchiseId?: number;
};

type GameSearchSelectProps = ComponentProps<"div"> & {
  onGameSelect: (game: onGameSelectType) => void;
  excludeList: Array<number>;
  similarList: Array<number>;
};

export default function GameSearchSelect({
  onGameSelect,
  excludeList,
  similarList,
  ...props
}: GameSearchSelectProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [results, setResults] = useState<GameSearchResult[]>([]);

  const currentGames = useMemo(() => {
    return results.map((res) => {
      let variant = "default";
      let disabled = false;
      if (excludeList.includes(res.id)) {
        variant = "danger";
        disabled = true;
      } else if (similarList.includes(res.id)) {
        variant = "warning";
      }

      return {
        id: res.id,
        icon: res.coverUrl ?? undefined,
        name: res.name,
        disabled: disabled,
        variant: variant as DropdownItemvariant,
      };
    });
  }, [results, excludeList, similarList]);

  const handleSearch = (search: string) => {
    if (search.trim().length === 0) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      searchGames(search).then((results) => setResults(results));
    }, 100);
  };

  const onOptionSelect = (game: DropdownItem) => {
    //setCurrentGames([]);
    onGameSelect({
      id: game.id,
      name: game.name,
      franchiseId: results.find((g) => g.id === game.id).franchise?.name,
    });
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
