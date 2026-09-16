-- DropForeignKey
ALTER TABLE "_GamesToScreenshots" DROP CONSTRAINT "_GamesToScreenshots_A_fkey";

-- DropForeignKey
ALTER TABLE "_GamesToScreenshots" DROP CONSTRAINT "_GamesToScreenshots_B_fkey";

-- AlterTable
ALTER TABLE "Screenshots" ADD COLUMN     "height" INTEGER NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ADD COLUMN     "width" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_GamesToScreenshots";

-- CreateIndex
CREATE UNIQUE INDEX "Screenshots_igdbId_key" ON "Screenshots"("igdbId");

-- AddForeignKey
ALTER TABLE "Screenshots" ADD CONSTRAINT "Screenshots_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
