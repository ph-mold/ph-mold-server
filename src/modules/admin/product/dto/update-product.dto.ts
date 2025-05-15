import {
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

type flag = 'new' | 'update' | 'delete' | undefined;

export class UpdateSpecDto {
  @IsOptional()
  id?: number;

  @IsString()
  value: string;

  @IsOptional()
  flag?: flag;

  @ValidateNested()
  @Type(() => Object)
  specType: {
    id: number;
    key: string;
    label: string;
    unit: string;
  };
}

export class UpdateTagDto {
  @IsOptional()
  id?: number;

  @IsString()
  key: string;

  @IsOptional()
  flag?: flag;
}

export class UpdateImageDto {
  @IsOptional()
  id?: number;

  @IsString()
  url: string;

  @IsOptional()
  isThumbnail?: number;

  @IsOptional()
  sortOrder?: number;

  @IsOptional()
  flag?: flag;
}

export class UpdateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  moq: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSpecDto)
  specs: UpdateSpecDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateTagDto)
  tags: UpdateTagDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateImageDto)
  images: UpdateImageDto[];
}
