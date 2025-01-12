// src/rap/rap.controller.ts
import { Controller, Post, Get, Put, Delete, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiHeader } from '@nestjs/swagger';
import { RapService } from './rap.service';
import { CreateRapDto, UpdateRapDto } from './dto/rap.dto';
import { CybersoftGuard } from '../guards/cybersoft.guard';

@ApiTags('Quản lý rạp')
@Controller('api/QuanLyRap')
export class RapController {
  constructor(private readonly rapService: RapService) {}

  @Post('ThemRap')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Thêm rạp mới' })
  @ApiBody({ type: CreateRapDto })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 201, description: 'Rạp được tạo thành công' })
  createRap(@Body() createRapDto: CreateRapDto) {
    return this.rapService.createRap(createRapDto);
  }

  @Get('LayDanhSachRap')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Lấy danh sách rạp' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Lấy danh sách thành công' })
  getRaps() {
    return this.rapService.getRaps();
  }

  @Get('LayThongTinRap')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Lấy thông tin rạp' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Lấy thông tin thành công' })
  getRapById(@Query('id') id: string) {
    const rapId = parseInt(id, 10);
    return this.rapService.getRapById(rapId);
  }

  @Put('CapNhatRap')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Cập nhật thông tin rạp' })
  @ApiBody({ type: UpdateRapDto })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  updateRap(@Query('id') id: string, @Body() updateRapDto: UpdateRapDto) {
    const rapId = parseInt(id, 10);
    return this.rapService.updateRap(rapId, updateRapDto);
  }

  @Delete('XoaRap')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Xóa rạp' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  deleteRap(@Query('id') id: string) {
    const rapId = parseInt(id, 10);
    return this.rapService.deleteRap(rapId);
  }
}