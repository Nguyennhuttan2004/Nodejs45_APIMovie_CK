import { Controller, Post, Get, Put, Delete, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiHeader } from '@nestjs/swagger';
import { BannerService } from './banner.service';
import { CreateBannerDto, UpdateBannerDto } from './dto/banner.dto';
import { CybersoftGuard } from '../guards/cybersoft.guard';

@ApiTags('Quản lý banner')
@Controller('api/QuanLyBanner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post('ThemBanner')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Thêm banner mới' })
  @ApiBody({ type: CreateBannerDto })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 201, description: 'Banner được tạo thành công' })
  createBanner(@Body() createBannerDto: CreateBannerDto) {
    return this.bannerService.createBanner(createBannerDto);
  }

  @Get('LayDanhSachBanner')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Lấy danh sách banner' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Lấy danh sách thành công' })
  getBanners() {
    return this.bannerService.getBanners();
  }

  @Get('LayThongTinBanner')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Lấy thông tin banner' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Lấy thông tin thành công' })
  getBannerById(@Query('id') id: string) {
    const bannerId = parseInt(id, 10);
    return this.bannerService.getBannerById(bannerId);
  }

  @Put('CapNhatBanner')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Cập nhật thông tin banner' })
  @ApiBody({ type: UpdateBannerDto })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  updateBanner(@Query('id') id: string, @Body() updateBannerDto: UpdateBannerDto) {
    const bannerId = parseInt(id, 10);
    return this.bannerService.updateBanner(bannerId, updateBannerDto);
  }

  @Delete('XoaBanner')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Xóa banner' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  deleteBanner(@Query('id') id: string) {
    const bannerId = parseInt(id, 10);
    return this.bannerService.deleteBanner(bannerId);
  }
} 