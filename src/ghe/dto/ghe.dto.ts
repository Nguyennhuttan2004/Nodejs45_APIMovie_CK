import { ApiProperty } from '@nestjs/swagger';
import { Ghe_loai_ghe } from '@prisma/client';

export class CreateGheDto {
  @ApiProperty({ description: 'Tên ghế', example: 'A1' })
  ten_ghe: string;

  @ApiProperty({ description: 'Loại ghế', example: 'thuong' })
  loai_ghe: Ghe_loai_ghe;

  @ApiProperty({ description: 'Mã rạp', example: 1 })
  ma_rap: number;
}

export class UpdateGheDto {
  @ApiProperty({ description: 'Tên ghế', example: 'A1', required: false })
  ten_ghe?: string;

  @ApiProperty({ description: 'Loại ghế', example: 'vip', required: false })
  loai_ghe?: Ghe_loai_ghe;
} 