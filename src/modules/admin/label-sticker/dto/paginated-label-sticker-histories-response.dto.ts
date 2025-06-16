import { ApiProperty } from '@nestjs/swagger';
import { LabelStickerHistory } from '../entities/label-sticker-history.entity';

export class PaginatedLabelStickerHistoriesResponseDto {
  @ApiProperty({ description: '전체 항목 수' })
  total: number;

  @ApiProperty({ description: '현재 페이지 번호' })
  page: number;

  @ApiProperty({ description: '페이지당 항목 수' })
  limit: number;

  @ApiProperty({
    description: '라벨 스티커 히스토리 목록',
    type: [LabelStickerHistory],
  })
  items: LabelStickerHistory[];
}
