import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  UseGuards,
  ParseIntPipe,
  Patch,
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
import { UpdateInquiryStatusDto } from './dto/update-inquiry-status.dto';
import { InquiryReply } from 'src/entities/admin';
import { Inquiry } from 'src/entities';

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

  @Patch(':id/status')
  @ApiOperation({ summary: '문의 상태 변경' })
  @ApiResponse({
    status: 200,
    description: '문의 상태가 성공적으로 변경되었습니다.',
    type: Inquiry,
  })
  async updateStatus(
    @Param('id', ParseIntPipe) inquiryId: number,
    @Body() updateStatusDto: UpdateInquiryStatusDto,
  ): Promise<Inquiry> {
    return this.service.updateStatus(inquiryId, updateStatusDto.status);
  }
}
