import { Injectable } from '@nestjs/common';
import { AdminSampleRequestRepository } from './admin.sample-request.repository';
import { GetSampleRequestsDto } from './dto/get-sample-requests.dto';
import { AuthPayload } from '../auth/auth.type';
import { CompletedDto, ProcessingDto, ShippedDto } from './dto/process-dto';

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

  async completeReception(id: number, user: AuthPayload) {
    return await this.repo.completeReception(id, user);
  }

  async completeProcessing(id: number, dto: ProcessingDto, user: AuthPayload) {
    return await this.repo.completeProcessing(id, dto, user);
  }

  async completeShipped(id: number, dto: ShippedDto, user: AuthPayload) {
    return await this.repo.completeShipped(id, dto, user);
  }

  async completeCompleted(id: number, dto: CompletedDto, user: AuthPayload) {
    return await this.repo.completeCompleted(id, dto, user);
  }
}
