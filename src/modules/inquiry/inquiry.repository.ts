import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inquiry } from './entities/inquiry.entity';

@Injectable()
export class InquiryRepository {
  constructor(
    @InjectRepository(Inquiry)
    private readonly repo: Repository<Inquiry>,
  ) {}
}
