import { Injectable } from '@nestjs/common';
import { AdminInquiryRepository } from './admin.inquiry.repository';
import { GetInquiriesDto } from './dto/get-inquiries.dto';
import { CreateInquiryReplyDto } from './dto/create-inquiry-reply.dto';
import { InquiryReply } from 'src/entities/admin';
import { Inquiry } from 'src/entities';
import { InquiryStatus } from 'src/entities/inquiry.entity';
import { AuthPayload } from '../auth/auth.type';

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

  async createReply(
    inquiryId: number,
    createReplyDto: CreateInquiryReplyDto,
    user: AuthPayload,
  ): Promise<InquiryReply> {
    return this.repo.createReply(inquiryId, createReplyDto, user);
  }

  updateStatus(inquiryId: number, status: InquiryStatus): Promise<Inquiry> {
    return this.repo.updateStatus(inquiryId, status);
  }
}
