-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "googleId" TEXT,
ALTER COLUMN "password" DROP NOT NULL;
