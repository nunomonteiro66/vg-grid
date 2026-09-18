-- Rename tables
ALTER TABLE "Games" RENAME TO "Game";
ALTER TABLE "Franchises" RENAME TO "Franchise";
ALTER TABLE "Genres" RENAME TO "Genre";
ALTER TABLE "GamesOnGenres" RENAME TO "GameOnGenre";
ALTER TABLE "Platforms" RENAME TO "Platform";
ALTER TABLE "GamesOnPlatforms" RENAME TO "GameOnPlatform";
ALTER TABLE "Screenshots" RENAME TO "Screenshot";
ALTER TABLE "Users" RENAME TO "User";
ALTER TABLE "DailyAttempts" RENAME TO "DailyAttempt";

-- Rename primary key constraints (Postgres names them after the table)
ALTER TABLE "Game" RENAME CONSTRAINT "Games_pkey" TO "Game_pkey";
ALTER TABLE "Franchise" RENAME CONSTRAINT "Franchises_pkey" TO "Franchise_pkey";
ALTER TABLE "Genre" RENAME CONSTRAINT "Genres_pkey" TO "Genre_pkey";
ALTER TABLE "GameOnGenre" RENAME CONSTRAINT "GamesOnGenres_pkey" TO "GameOnGenre_pkey";
ALTER TABLE "Platform" RENAME CONSTRAINT "Platforms_pkey" TO "Platform_pkey";
ALTER TABLE "GameOnPlatform" RENAME CONSTRAINT "GamesOnPlatforms_pkey" TO "GameOnPlatform_pkey";
ALTER TABLE "Screenshot" RENAME CONSTRAINT "Screenshots_pkey" TO "Screenshot_pkey";
ALTER TABLE "User" RENAME CONSTRAINT "Users_pkey" TO "User_pkey";
ALTER TABLE "DailyAttempt" RENAME CONSTRAINT "DailyAttempts_pkey" TO "DailyAttempt_pkey";

-- Rename unique indexes to match new names
ALTER INDEX "Games_igdbId_key" RENAME TO "Game_igdbId_key";
ALTER INDEX "Franchises_igdbId_key" RENAME TO "Franchise_igdbId_key";
ALTER INDEX "Genres_igdbId_key" RENAME TO "Genre_igdbId_key";
ALTER INDEX "Platforms_igdbId_key" RENAME TO "Platform_igdbId_key";
ALTER INDEX "Screenshots_igdbId_key" RENAME TO "Screenshot_igdbId_key";
ALTER INDEX "Users_username_key" RENAME TO "User_username_key";
ALTER INDEX "Users_email_key" RENAME TO "User_email_key";
ALTER INDEX "DailyAttempts_userId_dayId_attemptNumber_key" RENAME TO "DailyAttempt_userId_dayId_attemptNumber_key";

-- Rename foreign key constraints (referencing tables — the FK still points to the same row, just renamed table)
ALTER TABLE "Game" RENAME CONSTRAINT "Games_franchiseId_fkey" TO "Game_franchiseId_fkey";
ALTER TABLE "GameOnGenre" RENAME CONSTRAINT "GamesOnGenres_gameId_fkey" TO "GameOnGenre_gameId_fkey";
ALTER TABLE "GameOnGenre" RENAME CONSTRAINT "GamesOnGenres_genreId_fkey" TO "GameOnGenre_genreId_fkey";
ALTER TABLE "GameOnPlatform" RENAME CONSTRAINT "GamesOnPlatforms_gameId_fkey" TO "GameOnPlatform_gameId_fkey";
ALTER TABLE "GameOnPlatform" RENAME CONSTRAINT "GamesOnPlatforms_platformId_fkey" TO "GameOnPlatform_platformId_fkey";
ALTER TABLE "Screenshot" RENAME CONSTRAINT "Screenshots_gameId_fkey" TO "Screenshot_gameId_fkey";
ALTER TABLE "DailyAttempt" RENAME CONSTRAINT "DailyAttempts_userId_fkey" TO "DailyAttempt_userId_fkey";
ALTER TABLE "DailyAttempt" RENAME CONSTRAINT "DailyAttempts_dayId_fkey" TO "DailyAttempt_dayId_fkey";
ALTER TABLE "DailyAttempt" RENAME CONSTRAINT "DailyAttempts_guessedGameId_fkey" TO "DailyAttempt_guessedGameId_fkey";