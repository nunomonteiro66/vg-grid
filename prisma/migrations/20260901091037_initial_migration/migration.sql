-- CreateTable
CREATE TABLE "Games" (
    "id" SERIAL NOT NULL,
    "igdbId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "coverUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "franchiseId" INTEGER,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Franchises" (
    "id" SERIAL NOT NULL,
    "igdbId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Franchises_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Games_igdbId_key" ON "Games"("igdbId");

-- CreateIndex
CREATE UNIQUE INDEX "Franchises_igdbId_key" ON "Franchises"("igdbId");

-- AddForeignKey
ALTER TABLE "Games" ADD CONSTRAINT "Games_franchiseId_fkey" FOREIGN KEY ("franchiseId") REFERENCES "Franchises"("id") ON DELETE SET NULL ON UPDATE CASCADE;
