import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get('/test')
  async test() {
    const tagKeys = ['pp', 'syringe'];
    return this.productService.getProductsByTagKeys(tagKeys);
  }
}
