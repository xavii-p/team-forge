/*
  Warnings:

  - You are about to drop the column `Roles` on the `Entry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "Roles",
ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'USER';
