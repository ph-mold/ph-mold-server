import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Inquiry } from 'src/entities';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { GetInquiriesDto } from './dto/get-inquiries.dto';
import { CreateInquiryReplyDto } from './dto/create-inquiry-reply.dto';
import {
  InquiryReply,
  ReplyType,
} from 'src/entities/admin/inquiry-reply.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InquiryRepository extends Repository<Inquiry> {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(InquiryReply)
    private readonly replyRepo: Repository<InquiryReply>,
  ) {
    super(Inquiry, dataSource.createEntityManager());
  }

  async createInquiry(
    dto: CreateInquiryDto,
    hashedPassword: string,
  ): Promise<Inquiry> {
    const inquiry = this.create({
      ...dto,
      password: hashedPassword,
    });
    return this.save(inquiry);
  }

  async findInquiries(dto: GetInquiriesDto): Promise<[Inquiry[], number]> {
    return this.findAndCount({
      skip: (dto.page - 1) * dto.limit,
      take: dto.limit,
      order: { createdAt: 'DESC' },
    });
  }

  async findInquiryById(id: number): Promise<Inquiry | null> {
    return this.findOne({
      where: { id },
      relations: ['replies'],
      order: { replies: { createdAt: 'ASC' } },
    });
  }

  async createInquiryReply(inquiryId: number, dto: CreateInquiryReplyDto) {
    const reply = this.replyRepo.create({
      inquiryId,
      replyType: ReplyType.CUSTOMER,
      content: dto.content,
    });

    return this.replyRepo.save(reply);
  }
}
