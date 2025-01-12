-- CreateTable
CREATE TABLE `Banner` (
    `ma_banner` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_phim` INTEGER NOT NULL,
    `hinh_anh` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `ma_phim`(`ma_phim`),
    PRIMARY KEY (`ma_banner`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CumRap` (
    `ma_cum_rap` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_cum_rap` VARCHAR(255) NOT NULL,
    `dia_chi` VARCHAR(255) NULL,
    `ma_he_thong_rap` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `ma_he_thong_rap`(`ma_he_thong_rap`),
    PRIMARY KEY (`ma_cum_rap`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DatVe` (
    `tai_khoan` INTEGER NOT NULL,
    `ma_lich_chieu` INTEGER NOT NULL,
    `ma_ghe` INTEGER NOT NULL,
    `thoi_gian_dat` DATETIME(0) NOT NULL,
    `trang_thai` ENUM('da_thanh_toan', 'cho_thanh_toan') NULL DEFAULT 'cho_thanh_toan',
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `ma_ghe`(`ma_ghe`),
    INDEX `ma_lich_chieu`(`ma_lich_chieu`),
    PRIMARY KEY (`tai_khoan`, `ma_lich_chieu`, `ma_ghe`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ghe` (
    `ma_ghe` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_ghe` VARCHAR(255) NULL,
    `loai_ghe` ENUM('thuong', 'vip') NULL DEFAULT 'thuong',
    `ma_rap` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `ma_rap`(`ma_rap`),
    PRIMARY KEY (`ma_ghe`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HeThongRap` (
    `ma_he_thong_rap` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_he_thong_rap` VARCHAR(255) NOT NULL,
    `logo` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`ma_he_thong_rap`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LichChieu` (
    `ma_lich_chieu` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_rap` INTEGER NOT NULL,
    `ma_phim` INTEGER NOT NULL,
    `ngay_gio_chieu` DATETIME(0) NOT NULL,
    `gia_ve` INTEGER NOT NULL,
    `so_ve_da_ban` INTEGER NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `ma_phim`(`ma_phim`),
    INDEX `ma_rap`(`ma_rap`),
    PRIMARY KEY (`ma_lich_chieu`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NguoiDung` (
    `tai_khoan` INTEGER NOT NULL AUTO_INCREMENT,
    `ho_ten` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `so_dt` VARCHAR(20) NULL,
    `mat_khau` VARCHAR(255) NOT NULL,
    `loai_nguoi_dung` ENUM('admin', 'khach_hang') NULL DEFAULT 'khach_hang',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`tai_khoan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Phim` (
    `ma_phim` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_phim` VARCHAR(255) NOT NULL,
    `trailer` VARCHAR(255) NULL,
    `hinh_anh` VARCHAR(255) NULL,
    `mo_ta` TEXT NULL,
    `ngay_khoi_chieu` DATE NULL,
    `danh_gia` INTEGER NULL,
    `hot` BOOLEAN NULL DEFAULT false,
    `dang_chieu` BOOLEAN NULL DEFAULT false,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`ma_phim`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RapPhim` (
    `ma_rap` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_rap` VARCHAR(255) NOT NULL,
    `ma_cum_rap` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `ma_cum_rap`(`ma_cum_rap`),
    PRIMARY KEY (`ma_rap`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Activity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tai_khoan` INTEGER NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Banner` ADD CONSTRAINT `Banner_ibfk_1` FOREIGN KEY (`ma_phim`) REFERENCES `Phim`(`ma_phim`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `CumRap` ADD CONSTRAINT `CumRap_ibfk_1` FOREIGN KEY (`ma_he_thong_rap`) REFERENCES `HeThongRap`(`ma_he_thong_rap`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `DatVe` ADD CONSTRAINT `DatVe_ibfk_1` FOREIGN KEY (`tai_khoan`) REFERENCES `NguoiDung`(`tai_khoan`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `DatVe` ADD CONSTRAINT `DatVe_ibfk_2` FOREIGN KEY (`ma_lich_chieu`) REFERENCES `LichChieu`(`ma_lich_chieu`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `DatVe` ADD CONSTRAINT `DatVe_ibfk_3` FOREIGN KEY (`ma_ghe`) REFERENCES `Ghe`(`ma_ghe`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Ghe` ADD CONSTRAINT `Ghe_ibfk_1` FOREIGN KEY (`ma_rap`) REFERENCES `RapPhim`(`ma_rap`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `LichChieu` ADD CONSTRAINT `LichChieu_ibfk_1` FOREIGN KEY (`ma_rap`) REFERENCES `RapPhim`(`ma_rap`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `LichChieu` ADD CONSTRAINT `LichChieu_ibfk_2` FOREIGN KEY (`ma_phim`) REFERENCES `Phim`(`ma_phim`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `RapPhim` ADD CONSTRAINT `RapPhim_ibfk_1` FOREIGN KEY (`ma_cum_rap`) REFERENCES `CumRap`(`ma_cum_rap`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_tai_khoan_fkey` FOREIGN KEY (`tai_khoan`) REFERENCES `NguoiDung`(`tai_khoan`) ON DELETE CASCADE ON UPDATE CASCADE;
