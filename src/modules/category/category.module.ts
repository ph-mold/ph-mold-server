import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomCategory } from './entities/custom-category.entity';
import { CustomCategoryTag } from './entities/custom-category-tag.entity';
import { CategoryController } from './category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CustomCategory, CustomCategoryTag])],
  controllers: [CategoryController],
})
export class CategoryModule {}
