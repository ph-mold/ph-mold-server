import { Injectable } from '@nestjs/common';
import { AdminSampleRequestRepository } from './admin.sample-request.repository';

@Injectable()
export class AdminSampleRequestService {
  constructor(private readonly repo: AdminSampleRequestRepository) {}

  async getSampleRequests() {
    return this.repo.findAllWithProduct();
  }

  async getSampleRequest(id: number) {
    return this.repo.findOneWithProduct(id);
  }
}
