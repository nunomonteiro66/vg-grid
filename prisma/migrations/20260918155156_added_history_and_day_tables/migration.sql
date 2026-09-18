-- CreateTable
CREATE TABLE "Day" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "dailyGameId" INTEGER,

    CONSTRAINT "Day_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GridSlot" (
    "id" SERIAL NOT NULL,
    "dayId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "GridSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyAttempts" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "dayId" INTEGER NOT NULL,
    "attemptNumber" INTEGER NOT NULL,
    "guessedGameId" INTEGER NOT NULL,
    "correct" BOOLEAN NOT NULL,

    CONSTRAINT "DailyAttempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GridGuess" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gridSlotId" INTEGER NOT NULL,
    "guessedGameId" INTEGER NOT NULL,
    "correct" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GridGuess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Day_date_key" ON "Day"("date");

-- CreateIndex
CREATE UNIQUE INDEX "Day_dailyGameId_key" ON "Day"("dailyGameId");

-- CreateIndex
CREATE UNIQUE INDEX "GridSlot_gameId_key" ON "GridSlot"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "GridSlot_dayId_position_key" ON "GridSlot"("dayId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DailyAttempts_userId_dayId_attemptNumber_key" ON "DailyAttempts"("userId", "dayId", "attemptNumber");

-- CreateIndex
CREATE UNIQUE INDEX "GridGuess_userId_gridSlotId_key" ON "GridGuess"("userId", "gridSlotId");

-- AddForeignKey
ALTER TABLE "Day" ADD CONSTRAINT "Day_dailyGameId_fkey" FOREIGN KEY ("dailyGameId") REFERENCES "Games"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GridSlot" ADD CONSTRAINT "GridSlot_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GridSlot" ADD CONSTRAINT "GridSlot_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyAttempts" ADD CONSTRAINT "DailyAttempts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyAttempts" ADD CONSTRAINT "DailyAttempts_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyAttempts" ADD CONSTRAINT "DailyAttempts_guessedGameId_fkey" FOREIGN KEY ("guessedGameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GridGuess" ADD CONSTRAINT "GridGuess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GridGuess" ADD CONSTRAINT "GridGuess_gridSlotId_fkey" FOREIGN KEY ("gridSlotId") REFERENCES "GridSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GridGuess" ADD CONSTRAINT "GridGuess_guessedGameId_fkey" FOREIGN KEY ("guessedGameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
