-- CreateTable
CREATE TABLE "Genres" (
    "id" SERIAL NOT NULL,
    "igdbId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GamesOnGenres" (
    "gameId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "GamesOnGenres_pkey" PRIMARY KEY ("gameId","genreId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genres_igdbId_key" ON "Genres"("igdbId");

-- AddForeignKey
ALTER TABLE "GamesOnGenres" ADD CONSTRAINT "GamesOnGenres_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamesOnGenres" ADD CONSTRAINT "GamesOnGenres_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
