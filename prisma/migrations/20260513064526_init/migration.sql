-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'SUPERADMIN') NOT NULL DEFAULT 'ADMIN',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StatistikUtama` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,
    `nilai` VARCHAR(191) NOT NULL,
    `satuan` VARCHAR(191) NOT NULL,
    `tahun` INTEGER NOT NULL,
    `icon` VARCHAR(191) NULL,
    `warna` VARCHAR(191) NOT NULL DEFAULT '#2196F3',
    `urutan` INTEGER NOT NULL DEFAULT 0,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Indikator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `satuan` VARCHAR(191) NOT NULL,
    `tipeChart` VARCHAR(191) NOT NULL DEFAULT 'bar',
    `deskripsi` TEXT NULL,
    `aktif` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Indikator_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DataPoint` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tahun` INTEGER NOT NULL,
    `daerah` VARCHAR(191) NOT NULL DEFAULT 'Toli-Toli',
    `kolom` VARCHAR(191) NOT NULL DEFAULT 'nilai',
    `nilai` DOUBLE NOT NULL,
    `keterangan` VARCHAR(191) NULL,
    `indikatorId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `DataPoint_tahun_daerah_kolom_indikatorId_key`(`tahun`, `daerah`, `kolom`, `indikatorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JadwalRilis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `kategori` VARCHAR(191) NOT NULL DEFAULT 'Publikasi',
    `deskripsi` TEXT NULL,
    `link` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'UPCOMING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PetaTematik` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(191) NOT NULL,
    `deskripsi` TEXT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `geoJsonUrl` VARCHAR(191) NULL,
    `indikatorId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DataPoint` ADD CONSTRAINT `DataPoint_indikatorId_fkey` FOREIGN KEY (`indikatorId`) REFERENCES `Indikator`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PetaTematik` ADD CONSTRAINT `PetaTematik_indikatorId_fkey` FOREIGN KEY (`indikatorId`) REFERENCES `Indikator`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
