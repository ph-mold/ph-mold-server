import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomCategory } from './entities/custom-category.entity';
import { CustomCategoryTag } from './entities/custom-category-tag.entity';
import { CategoryController } from './category.controller';
import { Product } from '../product/entities/product.entity';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomCategory, CustomCategoryTag, Product]),
  ],
  providers: [CategoryService, CategoryRepository],
  controllers: [CategoryController],
})
export class CategoryModule {}
