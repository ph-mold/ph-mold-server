import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get('/test')
  async test() {
    const tagKeys = ['syringe'];
    return this.productService.getProductsByTagKeys({
      include: tagKeys,
      exclude: ['1ml', 'clean-syringe'],
    });
  }
}
