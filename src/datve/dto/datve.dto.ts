import { ApiProperty } from '@nestjs/swagger';
import { DatVe_trang_thai } from '@prisma/client';

export class CreateDatVeDto {
  @ApiProperty({ description: 'Tài khoản người dùng', example: 1 })
  tai_khoan: number;

  @ApiProperty({ description: 'Mã lịch chiếu', example: 1 })
  ma_lich_chieu: number;

  @ApiProperty({ description: 'Mã ghế', example: 1 })
  ma_ghe: number;

  @ApiProperty({ description: 'Thời gian đặt vé', example: '2023-10-10T10:00:00Z' })
  thoi_gian_dat: Date;

  @ApiProperty({ description: 'Trạng thái đặt vé', example: 'cho_thanh_toan' })
  trang_thai: DatVe_trang_thai;
}

export class UpdateDatVeDto {
  @ApiProperty({ description: 'Thời gian đặt vé', example: '2023-10-11T10:00:00Z', required: false })
  thoi_gian_dat?: Date;

  @ApiProperty({ description: 'Trạng thái đặt vé', example: 'da_thanh_toan', required: false })
  trang_thai?: DatVe_trang_thai;
}
