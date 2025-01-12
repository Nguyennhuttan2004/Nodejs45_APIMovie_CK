import { Controller, Post, Get, Put, Delete, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiHeader } from '@nestjs/swagger';
import { LichChieuService } from './lichchieu.service';
import { CreateLichChieuDto, UpdateLichChieuDto } from './dto/lichchieu.dto';
import { CybersoftGuard } from '../guards/cybersoft.guard';

@ApiTags('Quản lý lịch chiếu')
@Controller('api/QuanLyLichChieu')
export class LichChieuController {
  constructor(private readonly lichChieuService: LichChieuService) {}

  @Post('ThemLichChieu')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Thêm lịch chiếu mới' })
  @ApiBody({ type: CreateLichChieuDto })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 201, description: 'Lịch chiếu được tạo thành công' })
  createLichChieu(@Body() createLichChieuDto: CreateLichChieuDto) {
    return this.lichChieuService.createLichChieu(createLichChieuDto);
  }

  @Get('LayDanhSachLichChieu')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Lấy danh sách lịch chiếu' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Lấy danh sách thành công' })
  getLichChieus() {
    return this.lichChieuService.getLichChieus();
  }

  @Get('LayThongTinLichChieu')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Lấy thông tin lịch chiếu' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Lấy thông tin thành công' })
  getLichChieuById(@Query('id') id: string) {
    const ma_lich_chieu = parseInt(id, 10);
    return this.lichChieuService.getLichChieuById(ma_lich_chieu);
  }

  @Put('CapNhatLichChieu')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Cập nhật thông tin lịch chiếu' })
  @ApiBody({ type: UpdateLichChieuDto })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  updateLichChieu(@Query('id') id: string, @Body() updateLichChieuDto: UpdateLichChieuDto) {
    const ma_lich_chieu = parseInt(id, 10);
    return this.lichChieuService.updateLichChieu(ma_lich_chieu, updateLichChieuDto);
  }

  @Delete('XoaLichChieu')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Xóa lịch chiếu' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  deleteLichChieu(@Query('id') id: string) {
    const ma_lich_chieu = parseInt(id, 10);
    return this.lichChieuService.deleteLichChieu(ma_lich_chieu);
  }
} 