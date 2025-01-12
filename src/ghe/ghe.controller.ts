import { Controller, Post, Get, Put, Delete, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiHeader } from '@nestjs/swagger';
import { GheService } from './ghe.service';
import { CreateGheDto, UpdateGheDto } from './dto/ghe.dto';
import { CybersoftGuard } from 'src/guards/cybersoft.guard';

@ApiTags('Quản lý ghế')
@Controller('api/QuanLyGhe')
export class GheController {
  constructor(private readonly gheService: GheService) {}

  @Post('ThemGhe')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Thêm ghế mới' })
  @ApiBody({ type: CreateGheDto })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 201, description: 'Ghế được tạo thành công' })
  createGhe(@Body() createGheDto: CreateGheDto) {
    return this.gheService.createGhe(createGheDto);
  }

  @Get('LayDanhSachGhe')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Lấy danh sách ghế' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Lấy danh sách thành công' })
  getGheList() {
    return this.gheService.getGheList();
  }

  @Get('LayThongTinGhe')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Lấy thông tin ghế' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Lấy thông tin thành công' })
  getGheById(@Query('id') id: string) {
    const ma_ghe = parseInt(id, 10);
    return this.gheService.getGheById(ma_ghe);
  }

  @Put('CapNhatGhe')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Cập nhật thông tin ghế' })
  @ApiBody({ type: UpdateGheDto })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  updateGhe(@Query('id') id: string, @Body() updateGheDto: UpdateGheDto) {
    const ma_ghe = parseInt(id, 10);
    return this.gheService.updateGhe(ma_ghe, updateGheDto);
  }

  @Delete('XoaGhe')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Xóa ghế' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  deleteGhe(@Query('id') id: string) {
    const ma_ghe = parseInt(id, 10);
    return this.gheService.deleteGhe(ma_ghe);
  }
} 