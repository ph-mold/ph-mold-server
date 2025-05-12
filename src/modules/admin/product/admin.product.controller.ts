import { Controller } from '@nestjs/common';
import { AdminProductService } from './admin.product.service';

@Controller('admin/products')
export class AdminProductController {
  constructor(private readonly adminProductService: AdminProductService) {}
}
