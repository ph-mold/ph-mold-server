import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductSpec } from './entities/product-spec.entity';
import { ProductService } from './product.service';
import ProductRepository from './product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductSpec])],
  providers: [ProductService, ProductRepository],
  controllers: [ProductController],
})
export class ProductModule {}
