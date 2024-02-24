/*
  Warnings:

  - Added the required column `nome` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Cliente` ADD COLUMN `nome` VARCHAR(191) NOT NULL;
