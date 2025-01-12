import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCumRapDto, UpdateCumRapDto } from './dto/cumrap.dto';

@Injectable()
export class CumRapService {
  constructor(private readonly prisma: PrismaService) {}

  async createCumRap(createCumRapDto: CreateCumRapDto) {
    return this.prisma.cumRap.create({
      data: createCumRapDto,
    });
  }

  async getCumRaps() {
    return this.prisma.cumRap.findMany();
  }

  async getCumRapById(cumRapId: number) {
    const cumRap = await this.prisma.cumRap.findUnique({
      where: { ma_cum_rap: cumRapId },
    });

    if (!cumRap) {
      throw new HttpException('Cụm rạp không tồn tại', HttpStatus.NOT_FOUND);
    }

    return cumRap;
  }

  async updateCumRap(cumRapId: number, updateCumRapDto: UpdateCumRapDto) {
    const cumRap = await this.prisma.cumRap.findUnique({
      where: { ma_cum_rap: cumRapId },
    });

    if (!cumRap) {
      throw new HttpException('Cụm rạp không tồn tại', HttpStatus.NOT_FOUND);
    }

    return this.prisma.cumRap.update({
      where: { ma_cum_rap: cumRapId },
      data: updateCumRapDto,
    });
  }

  async deleteCumRap(cumRapId: number) {
    const cumRap = await this.prisma.cumRap.findUnique({
      where: { ma_cum_rap: cumRapId },
    });

    if (!cumRap) {
      throw new HttpException('Cụm rạp không tồn tại', HttpStatus.NOT_FOUND);
    }

    await this.prisma.cumRap.delete({
      where: { ma_cum_rap: cumRapId },
    });

    return { message: 'Xóa cụm rạp thành công' };
  }
} 