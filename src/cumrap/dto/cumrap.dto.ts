import { ApiProperty } from '@nestjs/swagger';

export class CreateCumRapDto {
  @ApiProperty({ description: 'Tên cụm rạp', example: 'Cụm Rạp 1' })
  ten_cum_rap: string;

  @ApiProperty({ description: 'Địa chỉ', example: '123 Đường ABC, Quận 1' })
  dia_chi?: string;
}

export class UpdateCumRapDto extends CreateCumRapDto {} 