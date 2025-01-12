import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBannerDto, UpdateBannerDto } from './dto/banner.dto';

@Injectable()
export class BannerService {
  constructor(private readonly prisma: PrismaService) {}

  async createBanner(createBannerDto: CreateBannerDto) {
    const { ma_phim } = createBannerDto;

    // Kiểm tra phim có tồn tại không
    const phim = await this.prisma.phim.findUnique({
      where: { ma_phim },
    });

    if (!phim) {
      throw new HttpException('Phim không tồn tại', HttpStatus.NOT_FOUND);
    }

    const newBanner = await this.prisma.banner.create({
      data: createBannerDto,
    });
    return newBanner;
  }

  async getBanners() {
    return this.prisma.banner.findMany({
      include: {
        Phim: true,
      },
    });
  }

  async getBannerById(bannerId: number) {
    const banner = await this.prisma.banner.findUnique({
      where: { ma_banner: bannerId },
      include: {
        Phim: true,
      },
    });

    if (!banner) {
      throw new HttpException('Banner không tồn tại', HttpStatus.NOT_FOUND);
    }

    return banner;
  }

  async updateBanner(bannerId: number, updateBannerDto: UpdateBannerDto) {
    const { ma_phim } = updateBannerDto;

    // Kiểm tra phim có tồn tại không
    const phim = await this.prisma.phim.findUnique({
      where: { ma_phim },
    });

    if (!phim) {
      throw new HttpException('Phim không tồn tại', HttpStatus.NOT_FOUND);
    }

    const banner = await this.prisma.banner.findUnique({
      where: { ma_banner: bannerId },
    });

    if (!banner) {
      throw new HttpException('Banner không tồn tại', HttpStatus.NOT_FOUND);
    }

    return this.prisma.banner.update({
      where: { ma_banner: bannerId },
      data: updateBannerDto,
    });
  }

  async deleteBanner(bannerId: number) {
    const banner = await this.prisma.banner.findUnique({
      where: { ma_banner: bannerId },
    });

    if (!banner) {
      throw new HttpException('Banner không tồn tại', HttpStatus.NOT_FOUND);
    }

    await this.prisma.banner.delete({
      where: { ma_banner: bannerId },
    });

    return { message: 'Xóa banner thành công' };
  }
} 