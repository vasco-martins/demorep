/*
  Warnings:

  - You are about to alter the column `textCollect` on the `Collector` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.
  - You are about to alter the column `videoCollect` on the `Collector` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Collector` MODIFY `textCollect` BOOLEAN NULL,
    MODIFY `videoCollect` BOOLEAN NULL;
