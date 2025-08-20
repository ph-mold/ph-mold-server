import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inquiry } from 'src/modules/inquiry/entities/inquiry.entity';
import { Repository } from 'typeorm';
import { GetInquiriesDto } from './dto/get-inquiries.dto';

@Injectable()
export class AdminInquiryRepository {
  constructor(
    @InjectRepository(Inquiry)
    private readonly repo: Repository<Inquiry>,
  ) {}

  async findAll() {
    return this.repo.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findAllWithPagination(dto: GetInquiriesDto) {
    return this.repo.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (dto.page - 1) * dto.limit,
      take: dto.limit,
    });
  }

  async findOne(id: number) {
    return this.repo.findOne({
      where: { id },
    });
  }
}
