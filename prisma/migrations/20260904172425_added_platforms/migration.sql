-- CreateTable
CREATE TABLE "Platforms" (
    "id" SERIAL NOT NULL,
    "igdbId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Platforms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GamesOnPlatforms" (
    "gameId" INTEGER NOT NULL,
    "platformId" INTEGER NOT NULL,

    CONSTRAINT "GamesOnPlatforms_pkey" PRIMARY KEY ("gameId","platformId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Platforms_igdbId_key" ON "Platforms"("igdbId");

-- AddForeignKey
ALTER TABLE "GamesOnPlatforms" ADD CONSTRAINT "GamesOnPlatforms_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamesOnPlatforms" ADD CONSTRAINT "GamesOnPlatforms_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platforms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
