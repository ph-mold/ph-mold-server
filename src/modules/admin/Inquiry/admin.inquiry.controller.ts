import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { AdminInquiryService } from './admin.inquiry.service';
import { GetInquiriesDto } from './dto/get-inquiries.dto';

@ApiTags('Admin Inquiry')
@Controller('admin/inquiry')
@ApiBearerAuth('access-token')
@Roles(Role.Admin, Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminInquiryController {
  constructor(private readonly service: AdminInquiryService) {}

  @Get()
  async getInquiries(@Query() dto: GetInquiriesDto) {
    if (dto.page && dto.limit) {
      return this.service.getInquiriesWithPagination(dto);
    }
    return this.service.getInquiries();
  }

  @Get(':id')
  async getInquiry(@Param('id') id: number) {
    return this.service.getInquiry(id);
  }
}
