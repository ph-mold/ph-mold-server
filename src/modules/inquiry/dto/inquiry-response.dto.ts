import { ApiProperty } from '@nestjs/swagger';
import { Inquiry } from '../entities/inquiry.entity';

export class InquiryResponseDto {
  @ApiProperty({ description: '문의 ID' })
  id: number;

  @ApiProperty({ description: '회사명 (마스킹 처리됨)' })
  company: string;

  @ApiProperty({ description: '이름 (마스킹 처리됨)' })
  name: string;

  @ApiProperty({ description: '연락처 (마스킹 처리됨)' })
  phone: string;

  @ApiProperty({ description: '문의일' })
  createdAt: Date;

  @ApiProperty({ description: '상태' })
  status: string;

  constructor(inquiry: Inquiry) {
    this.id = inquiry.id;
    this.company = inquiry.company;
    this.name = inquiry.name;
    this.phone = inquiry.phone;
    this.createdAt = inquiry.createdAt;
    this.status = inquiry.status;
  }
}

export class PaginatedInquiriesResponseDto {
  @ApiProperty({ description: '문의 목록', type: [InquiryResponseDto] })
  items: InquiryResponseDto[];

  @ApiProperty({ description: '전체 문의 수' })
  total: number;

  @ApiProperty({ description: '현재 페이지' })
  page: number;

  @ApiProperty({ description: '페이지당 항목 수' })
  limit: number;

  @ApiProperty({ description: '전체 페이지 수' })
  totalPages: number;
}
