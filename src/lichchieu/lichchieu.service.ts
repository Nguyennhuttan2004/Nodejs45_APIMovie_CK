import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLichChieuDto, UpdateLichChieuDto } from './dto/lichchieu.dto';

@Injectable()
export class LichChieuService {
  constructor(private readonly prisma: PrismaService) {}

  async createLichChieu(createLichChieuDto: CreateLichChieuDto) {
    const { ma_phim, ma_rap } = createLichChieuDto;

    // Check if Phim exists
    const phimExists = await this.prisma.phim.findUnique({
      where: { ma_phim },
    });

    if (!phimExists) {
      throw new HttpException('Phim không tồn tại', HttpStatus.NOT_FOUND);
    }

    // Check if Rap exists (optional, if you want to validate this too)
    const rapExists = await this.prisma.rapPhim.findUnique({
      where: { ma_rap },
    });

    if (!rapExists) {
      throw new HttpException('Rạp không tồn tại', HttpStatus.NOT_FOUND);
    }

    return this.prisma.lichChieu.create({
      data: createLichChieuDto,
    });
  }

  async getLichChieus() {
    return this.prisma.lichChieu.findMany({
      include: {
        RapPhim: true,
        Phim: true,
      },
    });
  }

  async getLichChieuById(ma_lich_chieu: number) {
    const lichChieu = await this.prisma.lichChieu.findUnique({
      where: { ma_lich_chieu },
      include: {
        RapPhim: true,
        Phim: true,
      },
    });

    if (!lichChieu) {
      throw new HttpException('Lịch chiếu không tồn tại', HttpStatus.NOT_FOUND);
    }

    return lichChieu;
  }

  async updateLichChieu(ma_lich_chieu: number, updateLichChieuDto: UpdateLichChieuDto) {
    const lichChieu = await this.prisma.lichChieu.findUnique({
      where: { ma_lich_chieu },
    });

    if (!lichChieu) {
      throw new HttpException('Lịch chiếu không tồn tại', HttpStatus.NOT_FOUND);
    }

    return this.prisma.lichChieu.update({
      where: { ma_lich_chieu },
      data: updateLichChieuDto,
    });
  }

  async deleteLichChieu(ma_lich_chieu: number) {
    const lichChieu = await this.prisma.lichChieu.findUnique({
      where: { ma_lich_chieu },
    });

    if (!lichChieu) {
      throw new HttpException('Lịch chiếu không tồn tại', HttpStatus.NOT_FOUND);
    }

    await this.prisma.lichChieu.delete({
      where: { ma_lich_chieu },
    });

    return { message: 'Xóa lịch chiếu thành công' };
  }
} 