/*
  Warnings:

  - You are about to drop the column `organizationName` on the `surgeries` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `surgeries` DROP COLUMN `organizationName`,
    ADD COLUMN `donorAmount` DOUBLE NULL;
