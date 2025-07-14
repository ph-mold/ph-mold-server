import { Injectable } from '@nestjs/common';
import { AdminSampleRequestRepository } from './admin.sample-request.repository';
import { GetSampleRequestsDto } from './dto/get-sample-requests.dto';

@Injectable()
export class AdminSampleRequestService {
  constructor(private readonly repo: AdminSampleRequestRepository) {}

  async getSampleRequests() {
    return this.repo.findAllWithProduct();
  }

  async getSampleRequestsWithPagination(dto: GetSampleRequestsDto) {
    const [items, total] =
      await this.repo.findAllWithSampleRequestPagination(dto);

    return {
      items,
      total,
      page: dto.page,
      limit: dto.limit,
    };
  }

  async getSampleRequest(id: number) {
    return this.repo.findOneWithProduct(id);
  }
}
