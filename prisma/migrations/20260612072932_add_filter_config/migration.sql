-- AlterTable
ALTER TABLE `Indikator` ADD COLUMN `filterDaerah` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `filterKolom` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `filterTahun` BOOLEAN NOT NULL DEFAULT true;
