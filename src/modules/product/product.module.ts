import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Product,
  ProductSpec,
  SpecType,
  ProductImage,
  ProductDetail,
  SampleRequest,
} from 'src/entities';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductSpec,
      SpecType,
      ProductImage,
      ProductDetail,
      SampleRequest,
    ]),
    CategoryModule,
  ],
  providers: [ProductService, ProductRepository],
  controllers: [ProductController],
})
export class ProductModule {}
