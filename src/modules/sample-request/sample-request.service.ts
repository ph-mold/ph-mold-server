import { Injectable } from '@nestjs/common';
import { CreateSampleRequestDto } from './dto/create-sample-request.dto';
import { SampleRequestRepository } from './sample-request.repository';

@Injectable()
export class SampleRequestService {
  constructor(private readonly sampleRequestRepo: SampleRequestRepository) {}

  async create(dto: CreateSampleRequestDto) {
    return this.sampleRequestRepo.createAndSave(dto);
  }
}
