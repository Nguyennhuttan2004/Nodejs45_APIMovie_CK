import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ description: 'Tên phim', example: 'Avengers: Endgame' })
  ten_phim: string;

  @ApiProperty({ description: 'Trailer phim', example: 'https://youtube.com/trailer' })
  trailer?: string;

  @ApiProperty({ description: 'Hình ảnh phim', example: 'https://image.url' })
  hinh_anh?: string;

  @ApiProperty({ description: 'Mô tả phim', example: 'Một bộ phim siêu anh hùng...' })
  mo_ta?: string;

  @ApiProperty({ description: 'Ngày khởi chiếu', example: '2024-01-01' })
  ngay_khoi_chieu?: Date;

  @ApiProperty({ description: 'Đánh giá phim', example: 8 })
  danh_gia?: number;

  @ApiProperty({ description: 'Phim hot', example: false })
  hot?: boolean;

  @ApiProperty({ description: 'Phim đang chiếu', example: true })
  dang_chieu?: boolean;
}

export class UpdateMovieDto extends CreateMovieDto {} 