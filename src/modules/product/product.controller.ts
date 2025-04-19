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
    return this.productService.getProductSummary(key);
  }

  @Get(':key/info')
  async getProductInfo(@Param('key') key: string) {
    return this.productService.getProductInfo(key);
  }

  @Get(':key/images')
  async getProductImages(@Param('key') key: string) {
    return this.productService.getProductImages(key);
  }
}
