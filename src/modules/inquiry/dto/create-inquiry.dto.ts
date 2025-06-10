import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateInquiryDto {
  @ApiProperty({ description: '이름' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '회사명' })
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiProperty({ description: '이메일' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: '연락처' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: '주소' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: '상세 주소', required: false })
  @IsString()
  @IsOptional()
  detailedAddress?: string;

  @ApiProperty({ description: '개인정보 수집 동의' })
  @IsBoolean()
  @IsNotEmpty()
  agree: boolean;

  @ApiProperty({ description: '비고', required: false })
  @IsString()
  @IsOptional()
  remarks?: string;

  @ApiProperty({ description: '비밀번호' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
