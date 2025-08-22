import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inquiry } from 'src/entities';
import { InquiryReply } from 'src/entities/admin';
import { Repository } from 'typeorm';
import { GetInquiriesDto } from './dto/get-inquiries.dto';
import { CreateInquiryReplyDto } from './dto/create-inquiry-reply.dto';
import { ReplyType } from 'src/entities/admin/inquiry-reply.entity';
import { InquiryStatus } from 'src/entities/inquiry.entity';
import { AuthPayload } from '../auth/auth.type';

@Injectable()
export class AdminInquiryRepository {
  constructor(
    @InjectRepository(Inquiry)
    private readonly inquiryRepo: Repository<Inquiry>,
    @InjectRepository(InquiryReply)
    private readonly replyRepo: Repository<InquiryReply>,
  ) {}

  async findAll() {
    return this.inquiryRepo.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findAllWithPagination(dto: GetInquiriesDto) {
    return this.inquiryRepo.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (dto.page - 1) * dto.limit,
      take: dto.limit,
    });
  }

  async findOne(id: number) {
    return this.inquiryRepo.findOne({
      where: { id },
      relations: ['replies'],
      order: { replies: { createdAt: 'ASC' } },
    });
  }

  async createReply(
    inquiryId: number,
    createReplyDto: CreateInquiryReplyDto,
    user: AuthPayload,
  ): Promise<InquiryReply> {
    const reply = this.replyRepo.create({
      inquiryId,
      replyType: ReplyType.COMPANY,
      assignedUserId: user.userId,
      ...createReplyDto,
    });

    return this.replyRepo.save(reply);
  }

  async updateStatus(
    inquiryId: number,
    status: InquiryStatus,
  ): Promise<Inquiry> {
    await this.inquiryRepo.update(inquiryId, { status });
    return this.inquiryRepo.findOne({ where: { id: inquiryId } });
  }
}
