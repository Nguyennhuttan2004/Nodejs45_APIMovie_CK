// src/rap/dto/rap.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateRapDto {
  @ApiProperty({ description: 'Tên rạp', example: 'Rạp 1' })
  ten_rap: string;

  @ApiProperty({ description: 'Mã cụm rạp', example: 1 })
  ma_cum_rap: number;
}

export class UpdateRapDto extends CreateRapDto {}