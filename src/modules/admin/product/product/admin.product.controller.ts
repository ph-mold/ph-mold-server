import {
  Body,
  Controller,
  Param,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdminProductService } from './admin.product.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('admin/products')
@ApiBearerAuth('access-token')
@Roles(Role.Admin, Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminProductController {
  constructor(private readonly adminProductService: AdminProductService) {}

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateProduct(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    return await this.adminProductService.update(id, dto);
  }
}
