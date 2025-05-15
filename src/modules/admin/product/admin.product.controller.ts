import {
  Body,
  Controller,
  Param,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdminProductService } from './admin.product.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('admin/products')
export class AdminProductController {
  constructor(private readonly adminProductService: AdminProductService) {}

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateProduct(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    return await this.adminProductService.update(id, dto);
  }
}
