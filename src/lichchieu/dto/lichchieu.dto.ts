import { ApiProperty } from '@nestjs/swagger';

export class CreateLichChieuDto {
  @ApiProperty({ description: 'Mã rạp', example: 1 })
  ma_rap: number;

  @ApiProperty({ description: 'Mã phim', example: 1 })
  ma_phim: number;

  @ApiProperty({ description: 'Ngày giờ chiếu', example: '2023-10-01T14:00:00Z' })
  ngay_gio_chieu: Date;

  @ApiProperty({ description: 'Giá vé', example: 100000 })
  gia_ve: number;
}

export class UpdateLichChieuDto extends CreateLichChieuDto {} 