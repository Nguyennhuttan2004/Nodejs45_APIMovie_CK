import { Controller, Post, Get, Put, Delete, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiHeader } from '@nestjs/swagger';
import { MovieService } from './movie.service';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { CybersoftGuard } from '../guards/cybersoft.guard';

@ApiTags('Quản lý phim')
@Controller('api/QuanLyPhim')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post('ThemPhim')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Thêm phim mới' })
  @ApiBody({ type: CreateMovieDto })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 201, description: 'Phim được tạo thành công' })
  createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.createMovie(createMovieDto);
  }

  @Get('LayDanhSachPhim')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Lấy danh sách phim' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Lấy danh sách thành công' })
  getMovies() {
    return this.movieService.getMovies();
  }

  @Get('LayThongTinPhim')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Lấy thông tin phim' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Lấy thông tin thành công' })
  getMovieById(@Query('ma_phim') ma_phim: string) {
    const maPhimInt = parseInt(ma_phim, 10);
    return this.movieService.getMovieById(maPhimInt);
  }

  @Put('CapNhatPhim')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Cập nhật thông tin phim' })
  @ApiBody({ type: UpdateMovieDto })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  updateMovie(@Query('ma_phim') ma_phim: string, @Body() updateMovieDto: UpdateMovieDto) {
    const maPhimInt = parseInt(ma_phim, 10);
    return this.movieService.updateMovie(maPhimInt, updateMovieDto);
  }

  @Delete('XoaPhim')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Xóa phim' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  deleteMovie(@Query('ma_phim') ma_phim: string) {
    const maPhimInt = parseInt(ma_phim, 10);
    return this.movieService.deleteMovie(maPhimInt);
  }

  @Get('LayDanhSachPhimPhanTrang')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Lấy danh sách phim với phân trang' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Lấy danh sách thành công' })
  getMoviesWithPagination(
    @Query('soTrang') soTrang: string,
    @Query('soPhanTuTrongTrang') soPhanTuTrongTrang: string,
  ) {
    const pageInt = parseInt(soTrang, 10) || 1;
    const limitInt = parseInt(soPhanTuTrongTrang, 10) || 10;
    return this.movieService.getMoviesWithPagination(pageInt, limitInt);
  }
} 