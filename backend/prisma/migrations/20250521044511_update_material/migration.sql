/*
  Warnings:

  - You are about to drop the column `videoUrl` on the `material` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `material` DROP COLUMN `videoUrl`,
    ADD COLUMN `Image` VARCHAR(191) NULL,
    ADD COLUMN `video` VARCHAR(191) NULL;
