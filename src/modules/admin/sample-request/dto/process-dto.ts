import { IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// ===== Reception DTO =====
export class ReceptionDto {
  // 입력값 없음
}

// ===== Processing DTO =====
export class ProcessingDto {
  @ApiProperty({ description: '내부 메모', required: false })
  @IsOptional()
  @IsString()
  memo?: string;

  @ApiProperty({ description: '첨부 이미지 URL', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}

// ===== Shipped DTO =====
export class ShippedDto {
  @ApiProperty({ description: '송장번호', required: true })
  @IsString()
  trackingNumber: string;

  @ApiProperty({ description: '배송일자', required: false })
  @IsOptional()
  @IsDateString()
  shippedAt?: string;

  @ApiProperty({ description: '메모', required: false })
  @IsOptional()
  @IsString()
  memo?: string;
}

// ===== Completed DTO =====
export class CompletedDto {
  @ApiProperty({ description: '완료 일자', required: true })
  @IsDateString()
  completedAt: string;

  @ApiProperty({ description: '메모', required: false })
  @IsOptional()
  @IsString()
  memo?: string;
}
