-- AlterTable
ALTER TABLE `Indikator` ADD COLUMN `kategori` VARCHAR(191) NOT NULL DEFAULT 'Lainnya';

-- CreateTable
CREATE TABLE `Infografis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(191) NOT NULL,
    `deskripsi` TEXT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `urutan` INTEGER NOT NULL DEFAULT 0,
    `aktif` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pengaduan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namaLengkap` VARCHAR(191) NOT NULL,
    `noIdentitas` VARCHAR(191) NOT NULL,
    `fotoIdentitas` VARCHAR(191) NOT NULL,
    `alamat` TEXT NOT NULL,
    `noTelpon` VARCHAR(191) NOT NULL,
    `isiPengaduan` TEXT NOT NULL,
    `lampiran` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'BARU',
    `catatan` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
