import prisma from "../prisma";

export type GameGrid = NonNullable<
  Awaited<ReturnType<typeof getGridByDayId>>
>[number];

export async function getGridByDayId(dayId: number) {
  const dayIdNum = Number(dayId);

  if (!dayIdNum) return null;

  const games = await prisma.gridSlot.findMany({
    select: {
      position: true,
      game: {
        select: {
          id: true,
          name: true,
          screenshots: true,
          franchiseId: true,
        },
      },
      day: {
        select: {
          date: true,
        },
      },
    },
    where: {
      dayId: dayIdNum,
    },
  });

  return games;
}
