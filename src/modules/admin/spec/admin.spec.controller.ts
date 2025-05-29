import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminSpecService } from './admin.spec.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('admin/spec')
@ApiBearerAuth('access-token')
@Roles(Role.Admin, Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminSpecController {
  constructor(private readonly adminSpecService: AdminSpecService) {}

  @Get()
  async getSpecTypes() {
    return this.adminSpecService.getSpecTypes();
  }
}
