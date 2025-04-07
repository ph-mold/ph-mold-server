import { Injectable } from '@nestjs/common';
import ProductRepository from './product.repository';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepository) {}

  async getProductsByTagKeys({
    include,
    exclude,
  }: {
    include: string[];
    exclude?: string[];
  }): Promise<Product[]> {
    return this.productRepo.findByTagKeys(include, exclude ?? []);
  }
}
