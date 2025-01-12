import { Controller, Post, Body, HttpCode, Get, UseGuards, Query, Put, Delete, Patch } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, UserResponseDto, ChangePasswordDto, ToggleAccountStatusDto } from './dto/auth.dto';
import { CybersoftGuard } from '../guards/cybersoft.guard';

@ApiTags('Quản lý người dùng')
@Controller('api/QuanLyNguoiDung')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Đăng ký
  @Post('DangKy')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Đăng ký tài khoản' })
  @ApiBody({ type: RegisterDto })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Success' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // Đăng nhập
  @Post('DangNhap')
  @UseGuards(CybersoftGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Đăng nhập' })
  @ApiBody({ type: LoginDto })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Success' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // lấy danh sách người dùng
  @Get('LayDanhSachNguoiDung')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Lấy danh sách người dùng' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ 
    status: 200,
    description: 'Lấy danh sách thành công',
    type: [UserResponseDto]
  })
  getUsers() {
    return this.authService.getUsers();
  }
  
  // lấy danh sách người dùng phân trang
  @Get('LayDanhSachNguoiDungPhanTrang')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Lấy danh sách người dùng với phân trang' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Lấy danh sách thành công' })
  getUsersWithPagination(
    @Query('soTrang') soTrang: string,
    @Query('soPhanTuTrongTrang') soPhanTuTrongTrang: string,
  ) {
    const pageInt = parseInt(soTrang, 10) || 1;
    const limitInt = parseInt(soPhanTuTrongTrang, 10) || 10;
    return this.authService.getUsersWithPagination(pageInt, limitInt);
  }
  // tìm kiếm người dùng
  @Get('TimKiemNguoiDung') 
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Tìm kiếm người dùng' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ 
    status: 200,
    description: 'Tìm kiếm thành công',
    type: [UserResponseDto],
  })
  searchUsers(@Query('tuKhoa') tuKhoa: string) {
    return this.authService.searchUsers(tuKhoa);
  }

  // Lấy thông tin người dùng
  @Get('LayThongTinNguoiDung')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Lấy thông tin người dùng' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ 
    status: 200,
    description: 'Lấy thông tin thành công',
    type: UserResponseDto,
  })
  getUserInfo(@Query('taiKhoan') taiKhoan: string) {
    const taiKhoanInt = parseInt(taiKhoan, 10);
    return this.authService.getUserInfo(taiKhoanInt);
  }

   // Thêm người dùng
  @Post('ThemNguoiDung')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Thêm người dùng mới' })
  @ApiBody({ type: RegisterDto })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 201, description: 'Người dùng được tạo thành công' })
  addUser(@Body() registerDto: RegisterDto) {
    return this.authService.addUser(registerDto);
  }

  @Put('CapNhatNguoiDung')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Cập nhật thông tin người dùng' })
  @ApiBody({ type: RegisterDto })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  updateUser(@Query('taiKhoan') taiKhoan: string, @Body() updateDto: RegisterDto) {
    const taiKhoanInt = parseInt(taiKhoan, 10);
    return this.authService.updateUser(taiKhoanInt, updateDto);
  }
  
  // xóa người dùng
  @Delete('XoaNguoiDung')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Xóa người dùng' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  deleteUser(@Query('taiKhoan') taiKhoan: string) {
    const taiKhoanInt = parseInt(taiKhoan, 10);
    return this.authService.deleteUser(taiKhoanInt);
  }

  @Patch('DoiMatKhau')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Đổi mật khẩu người dùng' })
  @ApiBody({ type: ChangePasswordDto })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Đổi mật khẩu thành công' })
  changePassword(@Query('taiKhoan') taiKhoan: string, @Body() changePasswordDto: ChangePasswordDto) {
    const taiKhoanInt = parseInt(taiKhoan, 10);
    return this.authService.changePassword(taiKhoanInt, changePasswordDto);
  }

  @Patch('KichHoatKhoaTaiKhoan')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Kích hoạt hoặc khóa tài khoản người dùng' })
  @ApiBody({ type: ToggleAccountStatusDto })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Thay đổi trạng thái tài khoản thành công' })
  toggleAccountStatus(@Query('taiKhoan') taiKhoan: string, @Body() toggleAccountStatusDto: ToggleAccountStatusDto) {
    const taiKhoanInt = parseInt(taiKhoan, 10);
    return this.authService.toggleAccountStatus(taiKhoanInt, toggleAccountStatusDto);
  }

  @Get('LichSuHoatDong')
  @UseGuards(CybersoftGuard)
  @ApiOperation({ summary: 'Lấy lịch sử hoạt động của người dùng' })
  @ApiHeader({
    name: 'tokencybersoft',
    description: 'Token từ CyberSoft',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Lấy lịch sử thành công' })
  getUserActivity(@Query('taiKhoan') taiKhoan: string) {
    const taiKhoanInt = parseInt(taiKhoan, 10);
    return this.authService.getUserActivity(taiKhoanInt);
  }
}
