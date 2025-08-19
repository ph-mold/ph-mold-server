import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { AdminInquiryService } from './admin.inquiry.service';

@ApiTags('Admin Inquiry')
@Controller('admin/inquiry')
@ApiBearerAuth('access-token')
@Roles(Role.Admin, Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminInquiryController {
  constructor(private readonly service: AdminInquiryService) {}

  @Get()
  async getInquiries() {
    // return this.service.getInquiries();
  }
}
