import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { RegisterDto, LoginDto, ChangePasswordDto, ToggleAccountStatusDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(registerDto: RegisterDto) {
    const { email, mat_khau, ho_ten, so_dt } = registerDto;

    // Kiểm tra email đã tồn tại
    const existingUser = await this.prisma.nguoiDung.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new HttpException('Email đã tồn tại', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(mat_khau, 10);

    const newUser = await this.prisma.nguoiDung.create({
      data: {
        email,
        mat_khau: hashedPassword,
        ho_ten,
        so_dt,
        loai_nguoi_dung: 'khach_hang',
      },
    });

    // Loại bỏ mật khẩu khỏi response
    const { mat_khau: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async login(loginDto: LoginDto) {
    const { email, mat_khau } = loginDto;

    const user = await this.prisma.nguoiDung.findUnique({
      where: { email },
    });

    if (!user) {
      throw new HttpException('Email không tồn tại', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(mat_khau, user.mat_khau);
    if (!isPasswordValid) {
      throw new HttpException('Mật khẩu không đúng', HttpStatus.UNAUTHORIZED);
    }

    const token = jwt.sign(
      { 
        tai_khoan: user.tai_khoan, 
        email: user.email,
        loai_nguoi_dung: user.loai_nguoi_dung 
      }, 
      'SECRET_KEY',
      { expiresIn: '1d' }
    );

    return { 
      message: "Đăng nhập thành công",
      token 
    };
  }

  async getUsers() {
    const users = await this.prisma.nguoiDung.findMany({
      select: {
        tai_khoan: true,
        ho_ten: true,
        email: true,
        so_dt: true,
        loai_nguoi_dung: true,
        created_at: true,
        updated_at: true,
        mat_khau: false,
      },
    });
    return users;
  }

  async searchUsers(tuKhoa: string) {
    const users = await this.prisma.nguoiDung.findMany({
      where: {
        OR: [
          { ho_ten: { contains: tuKhoa } },
          { email: { contains: tuKhoa } },
          { so_dt: { contains: tuKhoa } }
        ]
      },
      select: {
        tai_khoan: true,
        ho_ten: true,
        email: true,
        so_dt: true,
        loai_nguoi_dung: true,
        created_at: true,
        updated_at: true,
        mat_khau: false,
      },
    });

    return users;
  }

  async getUserInfo(taiKhoan: number) {
    const user = await this.prisma.nguoiDung.findUnique({
      where: { tai_khoan: taiKhoan },
      select: {
        tai_khoan: true,
        ho_ten: true,
        email: true,
        so_dt: true,
        loai_nguoi_dung: true,
        created_at: true,
        updated_at: true,
        mat_khau: false,
      },
    });

    if (!user) {
      throw new HttpException('Người dùng không tồn tại', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async addUser(registerDto: RegisterDto) {
    const { email, mat_khau, ho_ten, so_dt } = registerDto;

    // Kiểm tra email đã tồn tại
    const existingUser = await this.prisma.nguoiDung.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new HttpException('Email đã tồn tại', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(mat_khau, 10);

    const newUser = await this.prisma.nguoiDung.create({
      data: {
        email,
        mat_khau: hashedPassword,
        ho_ten,
        so_dt,
        loai_nguoi_dung: 'khach_hang',
      },
    });

    // Loại bỏ mật khẩu khỏi response
    const { mat_khau: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async updateUser(taiKhoan: number, updateDto: RegisterDto) {
    const { email, mat_khau, ho_ten, so_dt } = updateDto;

    // Kiểm tra người dùng có tồn tại không
    const existingUser = await this.prisma.nguoiDung.findUnique({
      where: { tai_khoan: taiKhoan },
    });

    if (!existingUser) {
      throw new HttpException('Người dùng không tồn tại', HttpStatus.NOT_FOUND);
    }

    // Kiểm tra email mới có trùng với email của người dùng khác không
    if (email !== existingUser.email) {
      const emailExists = await this.prisma.nguoiDung.findUnique({
        where: { email },
      });

      if (emailExists) {
        throw new HttpException('Email đã tồn tại', HttpStatus.BAD_REQUEST);
      }
    }

    const hashedPassword = mat_khau ? await bcrypt.hash(mat_khau, 10) : existingUser.mat_khau;

    const updatedUser = await this.prisma.nguoiDung.update({
      where: { tai_khoan: taiKhoan },
      data: {
        email,
        mat_khau: hashedPassword,
        ho_ten,
        so_dt,
      },
    });

    // Loại bỏ mật khẩu khỏi response
    const { mat_khau: _, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async deleteUser(taiKhoan: number) {
    // Kiểm tra người dùng có tồn tại không
    const existingUser = await this.prisma.nguoiDung.findUnique({
      where: { tai_khoan: taiKhoan },
    });

    if (!existingUser) {
      throw new HttpException('Người dùng không tồn tại', HttpStatus.NOT_FOUND);
    }

    await this.prisma.nguoiDung.delete({
      where: { tai_khoan: taiKhoan },
    });

    return { message: 'Xóa người dùng thành công' };
  }

  async changePassword(taiKhoan: number, changePasswordDto: ChangePasswordDto) {
    const { oldPassword, newPassword } = changePasswordDto;

    const user = await this.prisma.nguoiDung.findUnique({
      where: { tai_khoan: taiKhoan },
    });

    if (!user) {
      throw new HttpException('Người dùng không tồn tại', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.mat_khau);
    if (!isPasswordValid) {
      throw new HttpException('Mật khẩu cũ không đúng', HttpStatus.UNAUTHORIZED);
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.nguoiDung.update({
      where: { tai_khoan: taiKhoan },
      data: { mat_khau: hashedNewPassword },
    });

    return { message: 'Đổi mật khẩu thành công' };
  }

  async toggleAccountStatus(taiKhoan: number, toggleAccountStatusDto: ToggleAccountStatusDto) {
    const { isActive } = toggleAccountStatusDto;

    const user = await this.prisma.nguoiDung.findUnique({
      where: { tai_khoan: taiKhoan },
    });

    if (!user) {
      throw new HttpException('Người dùng không tồn tại', HttpStatus.NOT_FOUND);
    }

    await this.prisma.nguoiDung.update({
      where: { tai_khoan: taiKhoan },
      data: { isActive },
    });

    return { message: `Tài khoản đã được ${isActive ? 'kích hoạt' : 'khóa'}` };
  }

  async getUserActivity(taiKhoan: number) {
    const activities = await this.prisma.activity.findMany({
      where: { tai_khoan: taiKhoan },
      orderBy: { created_at: 'desc' },
    });

    return activities;
  }

  async getUsersWithPagination(soTrang: number, soPhanTuTrongTrang: number) {
    const skip = (soTrang - 1) * soPhanTuTrongTrang;
    const users = await this.prisma.nguoiDung.findMany({
      skip,
      take: soPhanTuTrongTrang,
      select: {
        tai_khoan: true,
        ho_ten: true,
        email: true,
        so_dt: true,
        loai_nguoi_dung: true,
        created_at: true,
        updated_at: true,
      },
    });

    const totalUsers = await this.prisma.nguoiDung.count();
    const totalPages = Math.ceil(totalUsers / soPhanTuTrongTrang);

    return {
      data: users,
      total: totalUsers,
      soTrang,
      soPhanTuTrongTrang,
      totalPages,
    };
  }
}
