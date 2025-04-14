import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProductsByCategoryKey(@Query('category') categoryKey: string) {
    return this.productService.getProductsByCategoryKey(categoryKey);
  }
}
