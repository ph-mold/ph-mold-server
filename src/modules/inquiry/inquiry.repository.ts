import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Inquiry } from './entities/inquiry.entity';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { GetInquiriesDto } from './dto/get-inquiries.dto';

@Injectable()
export class InquiryRepository extends Repository<Inquiry> {
  constructor(private dataSource: DataSource) {
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
    });
  }
}
