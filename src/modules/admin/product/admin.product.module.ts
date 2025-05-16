import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/modules/category/category.module';
import { ProductDetail } from 'src/modules/product/entities/product-detail.entity';
import { ProductImage } from 'src/modules/product/entities/product-image.entitiy';
import { ProductSpec } from 'src/modules/product/entities/product-spec.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { SampleRequest } from 'src/modules/product/entities/smaple-request.entity';
import { SpecType } from 'src/modules/product/entities/spec_type.entity';
import { AdminProductService } from './admin.product.service';
import AdminProductRepository from './admin.product.repository';
import { AdminProductController } from './admin.product.controller';

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
  providers: [AdminProductService, AdminProductRepository],
  controllers: [AdminProductController],
})
export class AdminProductModule {}
