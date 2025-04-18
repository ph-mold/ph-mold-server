import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProductsByCategoryKey(@Query('category') categoryKey: string) {
    return this.productService.getProductsByCategoryKey(categoryKey);
  }

  @Get(':key/summary')
  async getProductSummary(@Param('key') key: string) {
    return this.productService.getProduct(key);
  }

  @Get(':key/info')
  async getProductInfo() {}

  @Get(':key/images')
  async getProductImages() {}
}
