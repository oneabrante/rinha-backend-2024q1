-- CreateTable
CREATE TABLE `extrato` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `total` INTEGER NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `limite` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transacoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `extratoId` INTEGER NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transacoes` ADD CONSTRAINT `transacoes_extratoId_fkey` FOREIGN KEY (`extratoId`) REFERENCES `extrato`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
