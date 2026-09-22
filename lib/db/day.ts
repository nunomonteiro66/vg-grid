import prisma from "../prisma";

export async function getDayById(id: number) {
  return await prisma.day.findUnique({
    where: {
      id: id,
    },
  });
}

export type LatestDay = Awaited<ReturnType<typeof getLatestDay>>;

export async function getLatestDay() {
  return await prisma.day.findFirst({
    select: {
      id: true,
    },
    orderBy: {
      id: "desc",
    },
  });
}

export type AllDays = Awaited<ReturnType<typeof getAllDays>>;

export async function getAllDays() {
  return await prisma.day.findMany({
    select: {
      id: true,
      date: true,
      dailyGame: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });
}
