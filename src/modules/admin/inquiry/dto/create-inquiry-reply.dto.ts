import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInquiryReplyDto {
  @ApiProperty({
    description: '답변 내용',
    example: '문의해주신 내용에 대해 답변드립니다...',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
