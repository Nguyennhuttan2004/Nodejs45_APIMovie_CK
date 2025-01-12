import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}

  async createMovie(createMovieDto: CreateMovieDto) {
    const ngayKhoiChieu = createMovieDto.ngay_khoi_chieu ? new Date(createMovieDto.ngay_khoi_chieu) : undefined;

    const newMovie = await this.prisma.phim.create({
      data: {
        ...createMovieDto,
        ngay_khoi_chieu: ngayKhoiChieu,
      },
    });
    return newMovie;
  }

  async getMovies() {
    return this.prisma.phim.findMany();
  }

  async getMovieById(ma_phim: number) {
    const movie = await this.prisma.phim.findUnique({
      where: { ma_phim },
    });

    if (!movie) {
      throw new HttpException('Phim không tồn tại', HttpStatus.NOT_FOUND);
    }

    return movie;
  }

  async updateMovie(ma_phim: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.prisma.phim.findUnique({
      where: { ma_phim },
    });

    if (!movie) {
      throw new HttpException('Phim không tồn tại', HttpStatus.NOT_FOUND);
    }

    return this.prisma.phim.update({
      where: { ma_phim },
      data: updateMovieDto,
    });
  }

  async deleteMovie(ma_phim: number) {
    const movie = await this.prisma.phim.findUnique({
      where: { ma_phim },
    });

    if (!movie) {
      throw new HttpException('Phim không tồn tại', HttpStatus.NOT_FOUND);
    }

    await this.prisma.phim.delete({
      where: { ma_phim },
    });

    return { message: 'Xóa phim thành công' };
  }

  async getMoviesWithPagination(soTrang: number, soPhanTuTrongTrang: number) {
    const skip = (soTrang - 1) * soPhanTuTrongTrang;
    const movies = await this.prisma.phim.findMany({
      skip,
      take: soPhanTuTrongTrang,
    });

    const totalMovies = await this.prisma.phim.count();
    const totalPages = Math.ceil(totalMovies / soPhanTuTrongTrang);

    return {
      data: movies,
      total: totalMovies,
      soTrang,
      soPhanTuTrongTrang,
      totalPages,
    };
  }
} 