import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { InquiryService } from './inquiry.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { Inquiry } from 'src/entities';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetInquiriesDto } from './dto/get-inquiries.dto';
import { PaginatedInquiriesResponseDto } from './dto/inquiry-response.dto';
import { GetInquiryDto } from './dto/get-inquiry.dto';
import { CreateInquiryReplyDto } from './dto/create-inquiry-reply.dto';
import { InquiryReply } from 'src/entities/admin';

@Controller('inquiries')
@ApiTags('Inquiries')
export class InquiryController {
  constructor(private readonly service: InquiryService) {}

  @Post()
  @ApiOperation({ summary: '문의 생성' })
  @ApiResponse({
    status: 201,
    description: '문의가 성공적으로 생성되었습니다.',
    type: Inquiry,
  })
  async create(@Body() createInquiryDto: CreateInquiryDto): Promise<Inquiry> {
    return this.service.create(createInquiryDto);
  }

  @Get()
  @ApiOperation({ summary: '문의 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '문의 목록을 성공적으로 조회했습니다.',
    type: PaginatedInquiriesResponseDto,
  })
  async findAll(
    @Query() dto: GetInquiriesDto,
  ): Promise<PaginatedInquiriesResponseDto> {
    return this.service.findAll(dto);
  }

  @Post(':id')
  @ApiOperation({ summary: '문의 상세 조회' })
  @ApiResponse({
    status: 200,
    description: '문의를 성공적으로 조회했습니다.',
    type: Inquiry,
  })
  @ApiResponse({
    status: 403,
    description: '비밀번호가 일치하지 않습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '문의를 찾을 수 없습니다.',
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: GetInquiryDto,
  ): Promise<Inquiry> {
    return this.service.findOne(id, dto.password);
  }

  @Post(':id/reply')
  async reply(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateInquiryReplyDto,
  ): Promise<InquiryReply> {
    return this.service.reply(id, dto);
  }
}
