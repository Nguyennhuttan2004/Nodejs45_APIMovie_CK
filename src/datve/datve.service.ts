import { CreateDatVeDto, UpdateDatVeDto } from './dto/datve.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DatVeService {
  constructor(private readonly prisma: PrismaService) {}

  async createDatVe(createDatVeDto: CreateDatVeDto) {
    try {
      const newDatVe = await this.prisma.datVe.create({
        data: {
          tai_khoan: createDatVeDto.tai_khoan,
          ma_lich_chieu: createDatVeDto.ma_lich_chieu,
          ma_ghe: createDatVeDto.ma_ghe,
          thoi_gian_dat: createDatVeDto.thoi_gian_dat,
          trang_thai: createDatVeDto.trang_thai,
        },
      });
      return newDatVe;
    } catch (error) {
      throw new HttpException('Không thể tạo đặt vé', HttpStatus.BAD_REQUEST);
    }
  }

  async getDatVeList() {
    try {
      const datVeList = await this.prisma.datVe.findMany();
      return datVeList;
    } catch (error) {
      throw new HttpException('Không thể lấy danh sách đặt vé', HttpStatus.BAD_REQUEST);
    }
  }

  async getDatVeInfo(taiKhoan: number, maLichChieu: number, maGhe: number) {
    try {
      const datVe = await this.prisma.datVe.findUnique({
        where: {
          tai_khoan_ma_lich_chieu_ma_ghe: {
            tai_khoan: taiKhoan,
            ma_lich_chieu: maLichChieu,
            ma_ghe: maGhe,
          },
        },
      });

      if (!datVe) {
        throw new HttpException('Đặt vé không tồn tại', HttpStatus.NOT_FOUND);
      }

      return datVe;
    } catch (error) {
      throw new HttpException('Không thể lấy thông tin đặt vé', HttpStatus.BAD_REQUEST);
    }
  }

  async updateDatVe(taiKhoan: number, maLichChieu: number, maGhe: number, updateDatVeDto: UpdateDatVeDto) {
    try {
      const updatedDatVe = await this.prisma.datVe.update({
        where: {
          tai_khoan_ma_lich_chieu_ma_ghe: {
            tai_khoan: taiKhoan,
            ma_lich_chieu: maLichChieu,
            ma_ghe: maGhe,
          },
        },
        data: {
          thoi_gian_dat: updateDatVeDto.thoi_gian_dat,
          trang_thai: updateDatVeDto.trang_thai,
        },
      });

      return updatedDatVe;
    } catch (error) {
      throw new HttpException('Không thể cập nhật đặt vé', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteDatVe(taiKhoan: number, maLichChieu: number, maGhe: number) {
    try {
      await this.prisma.datVe.delete({
        where: {
          tai_khoan_ma_lich_chieu_ma_ghe: {
            tai_khoan: taiKhoan,
            ma_lich_chieu: maLichChieu,
            ma_ghe: maGhe,
          },
        },
      });

      return { message: 'Xóa đặt vé thành công' };
    } catch (error) {
      throw new HttpException('Không thể xóa đặt vé', HttpStatus.BAD_REQUEST);
    }
  }
}