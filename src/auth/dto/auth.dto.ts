import { ApiProperty } from '@nestjs/swagger';
import { NguoiDung_loai_nguoi_dung } from '@prisma/client';

export class RegisterDto {
  @ApiProperty({ description: 'Họ tên người dùng', example: 'Nguyễn Văn A' })
  ho_ten: string;

  @ApiProperty({ description: 'Email người dùng', example: 'example@email.com' })
  email: string;

  @ApiProperty({ description: 'Số điện thoại', example: '0123456789' })
  so_dt: string;

  @ApiProperty({ description: 'Mật khẩu tài khoản', example: 'password123' })
  mat_khau: string;
}

export class LoginDto {
  @ApiProperty({ description: 'Email người dùng', example: 'example@email.com' })
  email: string;

  @ApiProperty({ description: 'Mật khẩu tài khoản', example: 'password123' })
  mat_khau: string;
}

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  tai_khoan: number;

  @ApiProperty({ example: 'Nguyễn Văn A' })
  ho_ten: string;

  @ApiProperty({ example: 'example@email.com' })
  email: string;

  @ApiProperty({ example: '0123456789' })
  so_dt: string;

  @ApiProperty({ enum: NguoiDung_loai_nguoi_dung, example: 'khach_hang' })
  loai_nguoi_dung: NguoiDung_loai_nguoi_dung;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  created_at: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updated_at: Date;
}

export class SearchUserParams {
  @ApiProperty({ required: false, description: 'Từ khóa tìm kiếm chung' })
  tuKhoa?: string;

  @ApiProperty({ required: false, description: 'Tìm theo họ tên' })
  hoTen?: string;

  @ApiProperty({ required: false, description: 'Tìm theo email' })
  email?: string;

  @ApiProperty({ required: false, description: 'Tìm theo số điện thoại' })
  soDt?: string;
}

export class ChangePasswordDto {
  @ApiProperty({ description: 'Mật khẩu cũ', example: 'oldpassword123' })
  oldPassword: string;

  @ApiProperty({ description: 'Mật khẩu mới', example: 'newpassword123' })
  newPassword: string;
}

export class ToggleAccountStatusDto {
  @ApiProperty({ description: 'Trạng thái tài khoản', example: true })
  isActive: boolean;
}
