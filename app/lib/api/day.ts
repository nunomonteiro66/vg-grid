import { AllDays, LatestDay } from "@/lib/db/day";
import { Day } from "@/lib/generated/prisma/client";

export async function getDayById(id: number): Promise<Day> {
  const response = await fetch(
    `/api/day/get-day-by-id?id=${encodeURIComponent(id)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to search games");
  }

  return response.json();
}
export async function getAllDays(): Promise<AllDays> {
  const response = await fetch(`/api/day/get-all-days`);

  if (!response.ok) {
    throw new Error("Failed to search games");
  }

  return response.json();
}

export async function getLatestDay(): Promise<LatestDay> {
  const response = await fetch(`/api/day/get-latest-day`);

  if (!response.ok) {
    throw new Error("Failed to search games");
  }

  return response.json();
}
