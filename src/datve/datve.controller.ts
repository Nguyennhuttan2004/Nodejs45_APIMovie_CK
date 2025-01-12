import { Controller, Post, Get, Put, Delete, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiHeader } from '@nestjs/swagger';
import { DatVeService } from './datve.service';
import { CreateDatVeDto, UpdateDatVeDto } from './dto/datve.dto';
import { CybersoftGuard } from '../guards/cybersoft.guard';

@ApiTags('Quản lý đặt vé')
@Controller('api/QuanLyDatVe')
export class DatVeController {
  constructor(private readonly datVeService: DatVeService) {}

  @Post('ThemDatVe')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Thêm đặt vé mới' })
  @ApiBody({ type: CreateDatVeDto })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 201, description: 'Đặt vé được tạo thành công' })
  createDatVe(@Body() createDatVeDto: CreateDatVeDto) {
    return this.datVeService.createDatVe(createDatVeDto);
  }

  @Get('LayDanhSachDatVe')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Lấy danh sách đặt vé' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Lấy danh sách thành công' })
  getDatVeList() {
    return this.datVeService.getDatVeList();
  }

  @Get('LayThongTinDatVe')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Lấy thông tin đặt vé' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Lấy thông tin thành công' })
  getDatVeInfo(@Query('taiKhoan') taiKhoan: string, @Query('maLichChieu') maLichChieu: string, @Query('maGhe') maGhe: string) {
    return this.datVeService.getDatVeInfo(parseInt(taiKhoan, 10), parseInt(maLichChieu, 10), parseInt(maGhe, 10));
  }

  @Put('CapNhatDatVe')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Cập nhật thông tin đặt vé' })
  @ApiBody({ type: UpdateDatVeDto })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  updateDatVe(@Query('taiKhoan') taiKhoan: string, @Query('maLichChieu') maLichChieu: string, @Query('maGhe') maGhe: string, @Body() updateDatVeDto: UpdateDatVeDto) {
    return this.datVeService.updateDatVe(parseInt(taiKhoan, 10), parseInt(maLichChieu, 10), parseInt(maGhe, 10), updateDatVeDto);
  }

  @Delete('XoaDatVe')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Xóa đặt vé' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  deleteDatVe(@Query('taiKhoan') taiKhoan: string, @Query('maLichChieu') maLichChieu: string, @Query('maGhe') maGhe: string) {
    return this.datVeService.deleteDatVe(parseInt(taiKhoan, 10), parseInt(maLichChieu, 10), parseInt(maGhe, 10));
  }
}