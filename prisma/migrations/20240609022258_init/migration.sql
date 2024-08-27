-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "Roles" "Roles" NOT NULL DEFAULT 'USER';
