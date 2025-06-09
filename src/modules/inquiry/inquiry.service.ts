import { Injectable } from '@nestjs/common';
import { InquiryRepository } from './inquiry.repository';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { Inquiry } from './entities/inquiry.entity';

@Injectable()
export class InquiryService {
  constructor(private readonly repo: InquiryRepository) {}

  async create(dto: CreateInquiryDto): Promise<Inquiry> {
    return this.repo.create(dto);
  }
}
