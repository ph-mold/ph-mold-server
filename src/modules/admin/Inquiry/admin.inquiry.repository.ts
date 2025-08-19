import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inquiry } from 'src/modules/inquiry/entities/inquiry.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminInquiryRepository {
  constructor(
    @InjectRepository(Inquiry)
    private readonly repo: Repository<Inquiry>,
  ) {}
}
