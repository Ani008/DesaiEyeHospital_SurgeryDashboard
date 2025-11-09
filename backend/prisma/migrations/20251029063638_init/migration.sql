/*
  Warnings:

  - You are about to drop the column `amount` on the `surgeries` table. All the data in the column will be lost.
  - You are about to alter the column `surgeryType` on the `surgeries` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `surgeries` DROP COLUMN `amount`,
    ADD COLUMN `donorName` VARCHAR(191) NULL,
    ADD COLUMN `hospitalAmount` DOUBLE NULL,
    ADD COLUMN `organizationName` VARCHAR(191) NULL,
    ADD COLUMN `patientAmount` DOUBLE NULL,
    ADD COLUMN `totalAmount` DOUBLE NULL,
    MODIFY `surgeryType` ENUM('PAID', 'FUNDED', 'SUBSIDIZED') NOT NULL;
