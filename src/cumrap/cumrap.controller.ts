import { Controller, Post, Get, Put, Delete, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiHeader } from '@nestjs/swagger';
import { CumRapService } from './cumrap.service';
import { CreateCumRapDto, UpdateCumRapDto } from './dto/cumrap.dto';
import { CybersoftGuard } from '../guards/cybersoft.guard';

@ApiTags('Quản lý cụm rạp')
@Controller('api/QuanLyCumRap')
export class CumRapController {
  constructor(private readonly cumRapService: CumRapService) {}

  @Post('ThemCumRap')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Thêm cụm rạp mới' })
  @ApiBody({ type: CreateCumRapDto })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 201, description: 'Cụm rạp được tạo thành công' })
  createCumRap(@Body() createCumRapDto: CreateCumRapDto) {
    return this.cumRapService.createCumRap(createCumRapDto);
  }

  @Get('LayDanhSachCumRap')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Lấy danh sách cụm rạp' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Lấy danh sách thành công' })
  getCumRaps() {
    return this.cumRapService.getCumRaps();
  }

  @Get('LayThongTinCumRap')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Lấy thông tin cụm rạp' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Lấy thông tin thành công' })
  getCumRapById(@Query('id') id: string) {
    const cumRapId = parseInt(id, 10);
    return this.cumRapService.getCumRapById(cumRapId);
  }

  @Put('CapNhatCumRap')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Cập nhật thông tin cụm rạp' })
  @ApiBody({ type: UpdateCumRapDto })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  updateCumRap(@Query('id') id: string, @Body() updateCumRapDto: UpdateCumRapDto) {
    const cumRapId = parseInt(id, 10);
    return this.cumRapService.updateCumRap(cumRapId, updateCumRapDto);
  }

  @Delete('XoaCumRap')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Xóa cụm rạp' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  deleteCumRap(@Query('id') id: string) {
    const cumRapId = parseInt(id, 10);
    return this.cumRapService.deleteCumRap(cumRapId);
  }
} 