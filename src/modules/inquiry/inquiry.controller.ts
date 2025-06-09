import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { InquiryService } from './inquiry.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { Inquiry } from './entities/inquiry.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetInquiriesDto } from './dto/get-inquiries.dto';
import { PaginatedInquiriesResponseDto } from './dto/inquiry-response.dto';

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
}
