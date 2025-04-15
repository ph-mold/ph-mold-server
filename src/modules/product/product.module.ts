import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductSpec } from './entities/product-spec.entity';
import { ProductService } from './product.service';
import ProductRepository from './product.repository';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductSpec]), CategoryModule],
  providers: [ProductService, ProductRepository],
  controllers: [ProductController],
})
export class ProductModule {}
