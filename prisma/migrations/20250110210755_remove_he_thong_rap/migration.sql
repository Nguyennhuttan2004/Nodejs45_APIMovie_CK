/*
  Warnings:

  - You are about to alter the column `hinh_anh` on the `Banner` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to drop the column `ma_he_thong_rap` on the `CumRap` table. All the data in the column will be lost.
  - You are about to drop the `HeThongRap` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ten_banner` to the `Banner` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `Banner` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `Banner` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Banner` DROP FOREIGN KEY `Banner_ibfk_1`;

-- DropForeignKey
ALTER TABLE `CumRap` DROP FOREIGN KEY `CumRap_ibfk_1`;

-- DropIndex
DROP INDEX `ma_phim` ON `Banner`;

-- DropIndex
DROP INDEX `ma_he_thong_rap` ON `CumRap`;

-- AlterTable
ALTER TABLE `Banner` ADD COLUMN `link` VARCHAR(191) NULL,
    ADD COLUMN `ten_banner` VARCHAR(191) NOT NULL,
    MODIFY `hinh_anh` VARCHAR(191) NULL,
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `CumRap` DROP COLUMN `ma_he_thong_rap`;

-- DropTable
DROP TABLE `HeThongRap`;

-- AddForeignKey
ALTER TABLE `Banner` ADD CONSTRAINT `Banner_ma_phim_fkey` FOREIGN KEY (`ma_phim`) REFERENCES `Phim`(`ma_phim`) ON DELETE RESTRICT ON UPDATE CASCADE;
