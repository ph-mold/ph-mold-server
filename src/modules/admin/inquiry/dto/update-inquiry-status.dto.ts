import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { InquiryStatus } from 'src/entities/inquiry.entity';

export class UpdateInquiryStatusDto {
  @ApiProperty({
    description: '변경할 문의 상태',
    enum: InquiryStatus,
    example: InquiryStatus.IN_PROGRESS,
  })
  @IsEnum(InquiryStatus)
  @IsNotEmpty()
  status: InquiryStatus;
}
