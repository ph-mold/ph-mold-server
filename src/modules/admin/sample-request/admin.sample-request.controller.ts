import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { AdminSampleRequestService } from './admin.sample-request.service';
import { GetSampleRequestsDto } from './dto/get-sample-requests.dto';

@Controller('admin/sample-request')
@ApiBearerAuth('access-token')
@Roles(Role.Admin, Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminSampleRequestController {
  constructor(private readonly service: AdminSampleRequestService) {}

  @Get()
  async getSampleRequests(@Query() dto: GetSampleRequestsDto) {
    if (dto.page && dto.limit) {
      return this.service.getSampleRequestsWithPagination(dto);
    }
    return this.service.getSampleRequests();
  }

  @Get(':id')
  async getSampleRequest(@Param('id') id: number) {
    return this.service.getSampleRequest(id);
  }
}
