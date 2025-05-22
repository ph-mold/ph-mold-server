import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminProductSpecService } from './admin.product-spec.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('admin/product-spec')
@ApiBearerAuth('access-token')
@Roles(Role.Admin, Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminProductSpecController {
  constructor(
    private readonly adminProductSpecService: AdminProductSpecService,
  ) {}

  @Get()
  async getSpecTypes() {
    return this.adminProductSpecService.getSpecTypes();
  }
}
