import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { AdminTagService } from './admin.tag.service';

@Controller('admin/tag')
@ApiBearerAuth('access-token')
@Roles(Role.Admin, Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminTagController {
  constructor(private readonly adminTagService: AdminTagService) {}

  @Get()
  async getTags() {
    return this.adminTagService.getTags();
  }
}
