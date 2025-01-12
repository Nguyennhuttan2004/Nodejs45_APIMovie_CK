import { ApiProperty } from '@nestjs/swagger';

export class CreateBannerDto {
  @ApiProperty({ description: 'Tên banner', example: 'Summer Sale' })
  ten_banner: string;

  @ApiProperty({ description: 'Hình ảnh banner', example: 'https://image.url/banner.jpg' })
  hinh_anh: string;

  @ApiProperty({ description: 'Link banner', example: 'https://example.com/sale', required: false })
  link?: string;

  @ApiProperty({ description: 'Mã phim liên quan', example: 1 })
  ma_phim: number;
}

export class UpdateBannerDto extends CreateBannerDto {} 