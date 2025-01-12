// src/rap/rap.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRapDto, UpdateRapDto } from './dto/rap.dto';

@Injectable()
export class RapService {
  constructor(private readonly prisma: PrismaService) {}

  async createRap(createRapDto: CreateRapDto) {
    const { ma_cum_rap } = createRapDto;

    // Check if CumRap exists
    const cumRap = await this.prisma.cumRap.findUnique({
      where: { ma_cum_rap },
    });

    if (!cumRap) {
      throw new HttpException('Cụm rạp không tồn tại', HttpStatus.NOT_FOUND);
    }

    return this.prisma.rapPhim.create({
      data: createRapDto,
    });
  }

  async getRaps() {
    return this.prisma.rapPhim.findMany({
      include: {
        CumRap: true,
      },
    });
  }

  async getRapById(rapId: number) {
    const rap = await this.prisma.rapPhim.findUnique({
      where: { ma_rap: rapId },
      include: {
        CumRap: true,
      },
    });

    if (!rap) {
      throw new HttpException('Rạp không tồn tại', HttpStatus.NOT_FOUND);
    }

    return rap;
  }

  async updateRap(rapId: number, updateRapDto: UpdateRapDto) {
    const rap = await this.prisma.rapPhim.findUnique({
      where: { ma_rap: rapId },
    });

    if (!rap) {
      throw new HttpException('Rạp không tồn tại', HttpStatus.NOT_FOUND);
    }

    return this.prisma.rapPhim.update({
      where: { ma_rap: rapId },
      data: updateRapDto,
    });
  }

  async deleteRap(rapId: number) {
    const rap = await this.prisma.rapPhim.findUnique({
      where: { ma_rap: rapId },
    });

    if (!rap) {
      throw new HttpException('Rạp không tồn tại', HttpStatus.NOT_FOUND);
    }

    await this.prisma.rapPhim.delete({
      where: { ma_rap: rapId },
    });

    return { message: 'Xóa rạp thành công' };
  }
}