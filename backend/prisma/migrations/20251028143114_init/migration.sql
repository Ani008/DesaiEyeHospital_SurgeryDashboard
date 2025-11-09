-- CreateTable
CREATE TABLE `Surgery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patientName` VARCHAR(191) NOT NULL,
    `age` INTEGER NULL,
    `gender` VARCHAR(191) NULL,
    `surgeryType` VARCHAR(191) NOT NULL,
    `surgeon` VARCHAR(191) NULL,
    `surgeryDate` DATETIME(3) NOT NULL,
    `paymentType` ENUM('PAID', 'FUNDED', 'SUBSIDIZED') NOT NULL DEFAULT 'PAID',
    `amount` DOUBLE NOT NULL DEFAULT 0,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
