import { Controller, Get } from '@nestjs/common';
import { AdminProductSpecService } from './admin.product-spec.service';

@Controller('admin/product-spec')
export class AdminProductSpecController {
  constructor(
    private readonly adminProductSpecService: AdminProductSpecService,
  ) {}

  @Get()
  async getSpecTypes() {
    return this.adminProductSpecService.getSpecTypes();
  }
}
