/*
  Warnings:

  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiceType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Service` DROP FOREIGN KEY `Service_serviceTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `Service` DROP FOREIGN KEY `Service_userId_fkey`;

-- DropTable
DROP TABLE `Service`;

-- DropTable
DROP TABLE `ServiceType`;

-- CreateTable
CREATE TABLE `Testemunial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NULL,
    `text` VARCHAR(191) NULL,
    `video` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Collector` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NULL,
    `text` VARCHAR(191) NULL,
    `video` VARCHAR(191) NULL,
    `testemunialId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Collector` ADD CONSTRAINT `Collector_testemunialId_fkey` FOREIGN KEY (`testemunialId`) REFERENCES `Testemunial`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
