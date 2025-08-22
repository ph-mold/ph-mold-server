import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inquiry } from 'src/entities';
import { InquiryReply } from 'src/entities/admin';
import { Repository } from 'typeorm';
import { GetInquiriesDto } from './dto/get-inquiries.dto';
import { CreateInquiryReplyDto } from './dto/create-inquiry-reply.dto';
import { ReplyType } from 'src/entities/admin/inquiry-reply.entity';

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
    });
  }

  async createReply(
    inquiryId: number,
    createReplyDto: CreateInquiryReplyDto,
  ): Promise<InquiryReply> {
    const reply = this.replyRepo.create({
      inquiryId,
      replyType: ReplyType.COMPANY,
      ...createReplyDto,
    });

    return this.replyRepo.save(reply);
  }
}
