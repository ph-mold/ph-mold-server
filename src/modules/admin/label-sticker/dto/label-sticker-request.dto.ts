import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsHexColor,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class LabelStickerDto {
  @ApiProperty({
    description: '입고처',
    example: '농업회사법인(주)팜앤몰드',
    required: false,
  })
  @IsString()
  @IsOptional()
  value1?: string;

  @ApiProperty({
    description: '품명',
    example: '유기농 표고버섯',
    required: false,
  })
  @IsString()
  @IsOptional()
  value2?: string;

  @ApiProperty({
    description: '코드',
    example: 'MUSHROOM-001',
    required: false,
  })
  @IsString()
  @IsOptional()
  value3?: string;

  @ApiProperty({
    description: '수량',
    example: '100박스',
    required: false,
  })
  @IsString()
  @IsOptional()
  value4?: string;

  @ApiProperty({
    description: '중량',
    example: '500kg',
    required: false,
  })
  @IsString()
  @IsOptional()
  value5?: string;

  @ApiProperty({
    description: '납품일',
    example: '2024-03-25',
    required: false,
  })
  @IsString()
  @IsOptional()
  value6?: string;

  @ApiProperty({
    description: '라벨 배경색 (16진수 색상 코드)',
    example: '#ff3b3b',
    required: false,
    default: '#ff3b3b',
  })
  @IsHexColor()
  @IsOptional()
  backgroundColor?: string;
}

export class LabelStickerRequestDto {
  @ApiProperty({
    description: '저장할 PDF 파일명 (확장자 제외)',
    example: '표고버섯_라벨',
  })
  @IsString()
  @IsNotEmpty()
  filename: string;

  @ApiProperty({
    description: '라벨 스티커 데이터 배열',
    type: [LabelStickerDto],
  })
  @IsArray()
  @IsNotEmpty()
  data: LabelStickerDto[];
}
