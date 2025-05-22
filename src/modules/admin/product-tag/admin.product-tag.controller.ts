import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminProductTagService } from './admin.product-tag.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('admin/product-tag')
@ApiBearerAuth('access-token')
@Roles(Role.Admin, Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminProductTagController {
  constructor(
    private readonly adminProductTagService: AdminProductTagService,
  ) {}

  @Get()
  async getTags() {
    return this.adminProductTagService.getTags();
  }
}
