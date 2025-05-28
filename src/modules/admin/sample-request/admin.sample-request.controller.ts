import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { AdminSampleRequestService } from './admin.sample-request.service';

@Controller('admin/sample-request')
@ApiBearerAuth('access-token')
@Roles(Role.Admin, Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminSampleRequestController {
  constructor(private readonly service: AdminSampleRequestService) {}

  @Get()
  async getSampleRequests() {
    return this.service.getSampleRequests();
  }
}
