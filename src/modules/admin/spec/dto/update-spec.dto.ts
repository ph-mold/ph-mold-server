import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateSpecDto {
  @ApiProperty({
    description: '스펙 레이블',
    required: true,
  })
  @IsString()
  label: string;

  @ApiProperty({
    description: '스펙 키',
    required: true,
  })
  @IsString()
  key: string;

  @ApiProperty({
    description: '스펙 단위',
    required: true,
  })
  @IsString()
  unit: string;
}
