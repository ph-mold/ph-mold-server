import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductSpec } from './entities/product-spec.entity';
import { ProductService } from './product.service';
import ProductRepository from './product.repository';
import { CategoryModule } from '../category/category.module';
import { SpecType } from './entities/spec_type.entity';
import { ProductImage } from './entities/product-image.entitiy';
import { ProductDetail } from './entities/product-detail.entity';
import { SampleRequest } from './entities/smaple-request.entity';

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
