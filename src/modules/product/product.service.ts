import { Injectable } from '@nestjs/common';
import ProductRepository from './product.repository';
import { Product } from './entities/product.entity';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepo: ProductRepository,
    private readonly categoryService: CategoryService,
  ) {}

  async getProductsByCategoryKey(categoryKey: string) {
    if (categoryKey === 'all') return this.getProductsByTagKeys({});
    const resolveTagKeys =
      await this.categoryService.resolveTagKeysByCategoryKey(categoryKey);
    return this.getProductsByTagKeys(resolveTagKeys);
  }

  async getProductsByTagKeys({
    include,
    exclude,
  }: {
    include?: string[];
    exclude?: string[];
  }): Promise<Product[]> {
    return this.productRepo.findProductsByTagKeys(include, exclude ?? []);
  }

  async getProductSummary(key: string) {
    return this.productRepo.findProductByKey(key);
  }

  async getProductInfo(key: string) {
    return this.productRepo.findProductInfoByKey(key);
  }

  async getProductImages(key: string) {
    return this.productRepo.findProductImagesByKey(key);
  }
}
