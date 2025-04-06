import { Injectable } from '@nestjs/common';
import ProductRepository from './product.repository';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepository) {}

  async getProductsByTagKeys(tagKeys: string[]): Promise<Product[]> {
    if (!tagKeys.length) return [];
    return this.productRepo.findByTagKeys(tagKeys);
  }
}
