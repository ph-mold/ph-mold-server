import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SampleRequest } from 'src/modules/product/entities/smaple-request.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminSampleRequestService {
  constructor(
    @InjectRepository(SampleRequest)
    private readonly repo: Repository<SampleRequest>,
  ) {}

  async getSampleRequests() {
    return this.repo.find();
  }
}
