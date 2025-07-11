import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CategoryService } from '../category/category.service';
import { GetProductsByCategoryDto } from './dto/get-products-by-category.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepo: ProductRepository,
    private readonly categoryService: CategoryService,
  ) {}

  async getProductsByCategoryKey(dto: GetProductsByCategoryDto) {
    if (dto.categoryKey === 'all') return this.getProductsByTagKeys({ ...dto });
    const resolveTagKeys =
      await this.categoryService.resolveTagKeysByCategoryKey(dto.categoryKey);
    return this.getProductsByTagKeys({ ...resolveTagKeys, ...dto });
  }

  async getProductsByTagKeys({
    include,
    exclude,
    page,
    limit,
  }: {
    include?: string[];
    exclude?: string[];
    page?: number;
    limit?: number;
  }) {
    if (page && limit) {
      const [items, total] = await this.productRepo.findProductsByTagKeys(
        include,
        exclude ?? [],
        page,
        limit,
      );
      return {
        items,
        total,
        page,
        limit,
      };
    }

    return await this.productRepo.findProductsByTagKeys(include, exclude ?? []);
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

  async getProductDetail(key: string) {
    const result = await this.productRepo.findProductDetailByKey(key);
    return result?.detail ? result : { ...result, detail: '' };
  }
}
