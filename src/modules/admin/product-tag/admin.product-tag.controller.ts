import { Controller, Get } from '@nestjs/common';
import { AdminProductTagService } from './admin.product-tag.service';

@Controller('admin/product-tag')
export class AdminProductTagController {
  constructor(
    private readonly adminProductTagService: AdminProductTagService,
  ) {}

  @Get()
  async getTags() {
    return this.adminProductTagService.getTags();
  }
}
