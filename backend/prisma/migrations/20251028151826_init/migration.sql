/*
  Warnings:

  - You are about to drop the `surgery` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `surgery`;

-- CreateTable
CREATE TABLE `surgeries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patientName` VARCHAR(191) NOT NULL,
    `age` INTEGER NULL,
    `gender` VARCHAR(191) NULL,
    `surgeryName` VARCHAR(191) NOT NULL,
    `surgeryDate` DATETIME(3) NOT NULL,
    `surgeryType` VARCHAR(191) NOT NULL,
    `paymentType` ENUM('PAID', 'FUNDED', 'SUBSIDIZED') NOT NULL DEFAULT 'PAID',
    `amount` DOUBLE NOT NULL DEFAULT 0,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
