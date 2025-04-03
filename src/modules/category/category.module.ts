import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomCategory } from './domain/entities/custom-category.entity';
import { CustomCategoryTag } from './domain/entities/custom-category-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomCategory, CustomCategoryTag])],
})
export class CategoryModule {}
