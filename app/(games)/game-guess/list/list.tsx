"use client";

import { useEffect, useState } from "react";
import CustomTable from "./CustomTable";
import { getAllDays } from "@/app/lib/api/day";
import Header from "../../../../components/Header";
import { loadProgressDayId } from "@/lib/storage/game-guess/progress";
import { getDateString } from "@/lib/helpers/date";
import { Check, Cross, X } from "lucide-react";
import { DEFAULT_LIVES } from "@/lib/constants";
import { AllDays } from "@/lib/db/day";

type Data = {
  id: number;
  day: string;
  game: string;
  result: React.ReactNode;
  guesses_used: string;
};

type ListProps = {
  allDays: AllDays;
};

export default function List({ allDays }: ListProps) {
  const columns = [
    {
      key: "id",
      label: "#",
    },
    {
      key: "day",
      label: "DAY",
    },
    {
      key: "game",
      label: "GAME",
    },
    {
      key: "result",
      label: "RESULT",
    },
    {
      key: "guesses_used",
      label: "GUESSES USED",
    },
  ];
  const [list, setList] = useState<Data[]>([]);

  useEffect(() => {
    const getAllDays = async () => {
      const list = allDays.map((result) => {
        const dayId = result.id;

        const progress = loadProgressDayId(dayId);

        const gameName =
          progress?.won || progress?.lost
            ? (result.dailyGame?.name ?? "")
            : "Not Attempted";

        const resultStatus = (won: boolean = false, lost: boolean = false) => {
          const defaultClass = "flex w-fit pt-1 pb-1 p-2 items-center gap-1";

          if (won)
            return (
              <div className={`${defaultClass} bg-[#4D170E]`}>
                <Check width={20}></Check>
                WON
              </div>
            );

          if (lost) {
            //lost by too many wrong guesses
            if (progress?.guesses.length === DEFAULT_LIVES)
              return (
                <div className={`${defaultClass} bg-[#2D2B2B]`}>
                  <X width={20}></X>
                  Missed
                </div>
              );

            //lost by giving up
            return (
              <div
                className={`${defaultClass} border-2 border-[#EC3013] text-[#EC3013]`}
              >
                Gave Up
              </div>
            );
          }

          return (
            <div
              className={`${defaultClass} border-2 border-[#EC3013] text-[#EC3013]`}
            >
              Not Played
            </div>
          );
        };

        const guesses_used = String(progress?.guesses?.length ?? "0");

        return {
          id: dayId,
          day: getDateString(result.date),
          game: gameName,
          result: resultStatus(progress?.won, progress?.lost),
          guesses_used: `${guesses_used} \\ ${DEFAULT_LIVES}`,
        };
      });

      setList(list);
    };

    getAllDays();
  }, []);

  return (
    <div>
      <Header pageTitle="GAME GUESS">
        <></>
      </Header>
      <div id="stats" className="flex border-2"></div>

      <div>
        <CustomTable data={list} columns={columns} />
      </div>
    </div>
  );
}
