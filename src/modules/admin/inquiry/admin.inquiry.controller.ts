import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { AdminInquiryService } from './admin.inquiry.service';
import { GetInquiriesDto } from './dto/get-inquiries.dto';
import { CreateInquiryReplyDto } from './dto/create-inquiry-reply.dto';
import { InquiryReply } from 'src/entities/admin';

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

  @Post(':id/reply')
  @ApiOperation({ summary: '문의에 답변 생성' })
  @ApiResponse({
    status: 201,
    description: '답변이 성공적으로 생성되었습니다.',
    type: InquiryReply,
  })
  async createReply(
    @Param('id', ParseIntPipe) inquiryId: number,
    @Body() createReplyDto: CreateInquiryReplyDto,
  ): Promise<InquiryReply> {
    return this.service.createReply(inquiryId, createReplyDto);
  }
}
