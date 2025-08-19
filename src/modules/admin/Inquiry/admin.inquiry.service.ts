import { Injectable } from '@nestjs/common';
import { AdminInquiryRepository } from './admin.inquiry.repository';
import { GetInquiriesDto } from './dto/get-inquiries.dto';

@Injectable()
export class AdminInquiryService {
  constructor(private readonly repo: AdminInquiryRepository) {}

  async getInquiries() {
    return this.repo.findAll();
  }

  async getInquiriesWithPagination(dto: GetInquiriesDto) {
    const [items, total] = await this.repo.findAllWithPagination(dto);

    return {
      items,
      total,
      page: dto.page,
      limit: dto.limit,
    };
  }

  async getInquiry(id: number) {
    return this.repo.findOne(id);
  }
}
