-- CreateTable
CREATE TABLE `IndikatorBulanan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(191) NOT NULL,
    `nilai` VARCHAR(191) NOT NULL,
    `satuan` VARCHAR(191) NULL,
    `perubahan` VARCHAR(191) NULL,
    `arahPerubahan` VARCHAR(191) NULL,
    `keterangan` VARCHAR(191) NULL,
    `periode` VARCHAR(191) NULL,
    `warna` VARCHAR(191) NOT NULL DEFAULT 'biru',
    `urutan` INTEGER NOT NULL DEFAULT 0,
    `bulan` INTEGER NOT NULL,
    `tahun` INTEGER NOT NULL,
    `aktif` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
