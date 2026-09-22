// prisma/seed.ts
import prisma from "@/lib/prisma";

const NUMBER_OF_DAYS = 30; // how many days to seed
const GRID_SIZE = 9;
const GAMES_PER_DAY = GRID_SIZE + 1; // 9 grid slots + 1 daily pick

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

async function main() {
  const allGames = await prisma.game.findMany({ select: { id: true } });

  if (allGames.length < NUMBER_OF_DAYS * GAMES_PER_DAY) {
    throw new Error(
      `Not enough games to seed. Need ${NUMBER_OF_DAYS * GAMES_PER_DAY}, have ${allGames.length}.`,
    );
  }

  const shuffledGames = shuffle(allGames).map((g) => g.id);

  // Start from today, one day per iteration
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);

  let gameCursor = 0;

  for (let dayIndex = 0; dayIndex < NUMBER_OF_DAYS; dayIndex++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + dayIndex);

    // Take a unique slice of games for this day (never reused elsewhere)
    const dayGames = shuffledGames.slice(
      gameCursor,
      gameCursor + GAMES_PER_DAY,
    );
    gameCursor += GAMES_PER_DAY;

    const dailyGameId = dayGames[0];
    const gridGameIds = dayGames.slice(1); // remaining 9 for the grid

    const day = await prisma.day.upsert({
      where: { date },
      update: {},
      create: {
        date,
        dailyGameId,
      },
    });

    await prisma.gridSlot.createMany({
      data: gridGameIds.map((gameId, index) => ({
        dayId: day.id,
        position: index + 1, // 1 through 9
        gameId,
      })),
    });

    console.log(
      `Seeded day ${date.toISOString().slice(0, 10)} (day id ${day.id})`,
    );
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
