import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/modules/category/category.module';
import {
  Product,
  ProductDetail,
  ProductImage,
  ProductSpec,
  SampleRequest,
  SpecType,
} from 'src/entities';
import { AdminProductService } from './admin.product.service';
import { AdminProductRepository } from './admin.product.repository';
import { AdminProductController } from './admin.product.controller';
import { AdminProductImageModule } from '../product-image/admin.product-image.module';
import { AdminProductSpecModule } from '../product-spec/admin.product-spec.module';
import { AdminProductTagModule } from '../product-tag/admin.product-tag.module';

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
    AdminProductImageModule,
    AdminProductSpecModule,
    AdminProductTagModule,
  ],
  providers: [AdminProductService, AdminProductRepository],
  controllers: [AdminProductController],
})
export class AdminProductModule {}
