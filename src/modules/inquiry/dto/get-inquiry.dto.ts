import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetInquiryDto {
  @ApiProperty({
    description: '문의 비밀번호',
    example: '1234',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
