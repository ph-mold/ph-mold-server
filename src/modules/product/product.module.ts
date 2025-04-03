import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './domain/entities/product.entity';
import { ProductSpec } from './domain/entities/product-spec.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductSpec])],
  controllers: [ProductController],
})
export class ProductModule {}
