import { getAllDays } from "@/lib/db/day";
import List from "./list";

export default async function GuessGameList() {
  const allDays = await getAllDays();

  return <List allDays={allDays}></List>;
}
