-- CreateTable
CREATE TABLE "Screenshots" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "igdbId" INTEGER NOT NULL,

    CONSTRAINT "Screenshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GamesToScreenshots" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_GamesToScreenshots_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_GamesToScreenshots_B_index" ON "_GamesToScreenshots"("B");

-- AddForeignKey
ALTER TABLE "_GamesToScreenshots" ADD CONSTRAINT "_GamesToScreenshots_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToScreenshots" ADD CONSTRAINT "_GamesToScreenshots_B_fkey" FOREIGN KEY ("B") REFERENCES "Screenshots"("id") ON DELETE CASCADE ON UPDATE CASCADE;
