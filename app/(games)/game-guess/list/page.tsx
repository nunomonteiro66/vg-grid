"use client";

import { useEffect } from "react";
import CustomTable from "../../_components/Table";
import { getAllDays } from "@/app/lib/api/day";

export default function GuessGameList() {
  const columns = ["day", "game", "result", "guesses used"];

  useEffect(() => {
    const allDays = async () => {
      const result = await getAllDays();
      console.log(result);
    };

    allDays();
  }, []);

  return (
    <div>
      <div id="stats" className="flex border-2"></div>

      <div>{/* <CustomTable data={sampleList} /> */}</div>
    </div>
  );
}
