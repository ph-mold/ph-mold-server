import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { GetProductsByCategoryDto } from './dto/get-products-by-category.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProductsByCategoryKey(@Query() dto: GetProductsByCategoryDto) {
    return this.productService.getProductsByCategoryKey(dto);
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

  @Get(':key/detail')
  async getProductDetail(@Param('key') key: string) {
    return this.productService.getProductDetail(key);
  }
}
