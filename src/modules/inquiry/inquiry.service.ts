import { Injectable } from '@nestjs/common';
import { InquiryRepository } from './inquiry.repository';

@Injectable()
export class InquiryService {
  constructor(private readonly repo: InquiryRepository) {}
}
