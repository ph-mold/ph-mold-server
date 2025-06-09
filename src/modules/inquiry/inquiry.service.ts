import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inquiry } from './entities/inquiry.entity';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { GetInquiriesDto } from './dto/get-inquiries.dto';
import {
  InquiryResponseDto,
  PaginatedInquiriesResponseDto,
} from './dto/inquiry-response.dto';
import { MaskUtil } from '../../common/utils/mask.util';

@Injectable()
export class InquiryService {
  constructor(
    @InjectRepository(Inquiry)
    private readonly repo: Repository<Inquiry>,
  ) {}

  async create(createInquiryDto: CreateInquiryDto): Promise<Inquiry> {
    return this.repo.save(createInquiryDto);
  }

  async findAll(dto: GetInquiriesDto): Promise<PaginatedInquiriesResponseDto> {
    const [inquiries, total] = await this.repo.findAndCount({
      skip: (dto.page - 1) * dto.limit,
      take: dto.limit,
      order: { createdAt: 'DESC' },
    });

    const maskedInquiries = inquiries.map((inquiry) => {
      const response = new InquiryResponseDto(inquiry);
      response.company = MaskUtil.maskCompany(inquiry.company);
      response.name = MaskUtil.maskName(inquiry.name);
      response.phone = MaskUtil.maskPhone(inquiry.phone);
      return response;
    });

    return {
      items: maskedInquiries,
      total,
      page: dto.page,
      limit: dto.limit,
      totalPages: Math.ceil(total / dto.limit),
    };
  }
}
