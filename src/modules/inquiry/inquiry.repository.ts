import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inquiry, InquiryStatus } from './entities/inquiry.entity';
import { CreateInquiryDto } from './dto/create-inquiry.dto';

@Injectable()
export class InquiryRepository {
  constructor(
    @InjectRepository(Inquiry)
    private readonly repo: Repository<Inquiry>,
  ) {}

  async create(dto: CreateInquiryDto): Promise<Inquiry> {
    const inquiry = this.repo.create({
      ...dto,
      detailedAddress: dto.detailedAddress ?? '',
      status: InquiryStatus.PENDING,
    });
    return this.repo.save(inquiry);
  }
}
