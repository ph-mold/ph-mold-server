/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CategoryTagInput {
  @ApiProperty({ example: 'pp', description: '태그 키 (tag.key)' })
  @IsNotEmpty()
  @IsString()
  tagKey: string;

  @ApiProperty({ example: 'include', enum: ['include', 'exclude'] })
  @IsIn(['include', 'exclude'])
  type: 'include' | 'exclude';
}

export class CreateCustomCategoryDto {
  @ApiProperty({ example: 'pp-syringe', description: '카테고리 고유 키' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ example: 'PP 주사기', description: '카테고리 이름' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 1,
    required: false,
    description: '상위 카테고리 ID (optional)',
  })
  @Transform(({ value }) => {
    if (value === '' || value === null) return undefined;
    return Number(value);
  })
  @IsOptional()
  @IsNumber()
  parentId?: number;

  @ApiProperty({
    example: 101,
    required: false,
    description: '생성자 ID (optional)',
  })
  @IsOptional()
  @IsString()
  createdBy?: number;

  @ApiProperty({
    type: [CategoryTagInput],
    description: '연결할 태그 정보 목록',
  })
  @Transform(({ value }) => {
    try {
      const parsed = typeof value === 'string' ? JSON.parse(value) : value;

      if (!Array.isArray(parsed)) throw new Error();

      return parsed.map((item) => {
        if (typeof item === 'string') item = JSON.parse(item);
        return Object.assign(new CategoryTagInput(), item);
      });
    } catch {
      throw new BadRequestException('tags must be a valid array of objects');
    }
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryTagInput)
  tags: CategoryTagInput[];
}

// 스웨거 이미지 업로드용
export class CreateCustomCategoryWithImageDto extends CreateCustomCategoryDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: '카테고리 이미지 파일 (PNG)',
  })
  image: any;
}
