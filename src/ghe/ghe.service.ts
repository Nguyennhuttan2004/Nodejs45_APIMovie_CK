import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGheDto, UpdateGheDto } from './dto/ghe.dto';

@Injectable()
export class GheService {
  constructor(private readonly prisma: PrismaService) {}

  async createGhe(createGheDto: CreateGheDto) {
    try {
      const { ten_ghe, loai_ghe, ma_rap } = createGheDto;
      return await this.prisma.ghe.create({
        data: {
          ten_ghe,
          loai_ghe,
          ma_rap,
        },
      });
    } catch (error) {
      throw new HttpException('Không thể tạo ghế', HttpStatus.BAD_REQUEST);
    }
  }

  async getGheList() {
    return this.prisma.ghe.findMany();
  }

  async getGheById(ma_ghe: number) {
    const ghe = await this.prisma.ghe.findUnique({
      where: { ma_ghe },
    });

    if (!ghe) {
      throw new HttpException('Ghế không tồn tại', HttpStatus.NOT_FOUND);
    }

    return ghe;
  }

  async updateGhe(ma_ghe: number, updateGheDto: UpdateGheDto) {
    const ghe = await this.prisma.ghe.findUnique({
      where: { ma_ghe },
    });

    if (!ghe) {
      throw new HttpException('Ghế không tồn tại', HttpStatus.NOT_FOUND);
    }

    return this.prisma.ghe.update({
      where: { ma_ghe },
      data: updateGheDto,
    });
  }

  async deleteGhe(ma_ghe: number) {
    const ghe = await this.prisma.ghe.findUnique({
      where: { ma_ghe },
    });

    if (!ghe) {
      throw new HttpException('Ghế không tồn tại', HttpStatus.NOT_FOUND);
    }

    await this.prisma.ghe.delete({
      where: { ma_ghe },
    });

    return { message: 'Xóa ghế thành công' };
  }
} 