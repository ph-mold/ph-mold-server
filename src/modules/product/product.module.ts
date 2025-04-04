import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductSpec } from './entities/product-spec.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductSpec])],
  controllers: [ProductController],
})
export class ProductModule {}
