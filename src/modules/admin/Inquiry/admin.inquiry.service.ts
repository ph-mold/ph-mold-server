import { Injectable } from '@nestjs/common';
import { AdminInquiryRepository } from './admin.inquiry.repository';

@Injectable()
export class AdminInquiryService {
  constructor(private readonly repo: AdminInquiryRepository) {}
}
