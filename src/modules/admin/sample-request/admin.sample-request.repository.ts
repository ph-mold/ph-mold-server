import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SampleRequest } from 'src/modules/product/entities/smaple-request.entity';
import { Repository } from 'typeorm';
import { GetSampleRequestsDto } from './dto/get-sample-requests.dto';
import { AuthPayload } from '../auth/auth.type';
import { CompletedDto, ProcessingDto, ShippedDto } from './dto/process-dto';

@Injectable()
export class AdminSampleRequestRepository {
  constructor(
    @InjectRepository(SampleRequest)
    private readonly repo: Repository<SampleRequest>,
  ) {}

  async findAllWithProduct() {
    return this.repo.find({
      relations: ['product'],
      order: { createdAt: 'DESC' },
    });
  }

  async findAllWithSampleRequestPagination(dto: GetSampleRequestsDto) {
    return this.repo.findAndCount({
      relations: ['product'],
      order: { createdAt: 'DESC' },
      skip: (dto.page - 1) * dto.limit,
      take: dto.limit,
    });
  }

  async findOneWithProduct(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['product'],
    });
  }

  async completeReception(id: number, user: AuthPayload) {
    const sampleRequest = await this.repo.findOne({
      where: { id },
      relations: ['product'],
    });
    sampleRequest.addStatus('reception');
    sampleRequest.assignedUserId = user.userId;

    // 기존 nodeData를 보존하면서 새로운 데이터 추가
    const existingNodeData = sampleRequest.nodeData || {};
    sampleRequest.nodeData = {
      ...existingNodeData,
      reception: {
        operator: user.name,
        date: new Date(),
      },
    };

    return await this.repo.save(sampleRequest);
  }

  async completeProcessing(id: number, dto: ProcessingDto, user: AuthPayload) {
    const sampleRequest = await this.repo.findOne({ where: { id } });
    sampleRequest.addStatus('processing');
    sampleRequest.nodeData = {
      ...sampleRequest.nodeData,
      processing: {
        operator: user.name,
        date: new Date(),
        memo: dto.memo,
        imageUrl: dto.imageUrl,
      },
    };

    return await this.repo.save(sampleRequest);
  }

  async completeShipped(id: number, dto: ShippedDto, user: AuthPayload) {
    const sampleRequest = await this.repo.findOne({
      where: { id },
      relations: ['product'],
    });
    sampleRequest.addStatus('shipped');
    sampleRequest.nodeData = {
      ...sampleRequest.nodeData,
      shipped: {
        operator: user.name,
        date: new Date(),
        trackingNumber: dto.trackingNumber,
        memo: dto.memo,
      },
    };

    return await this.repo.save(sampleRequest);
  }

  async completeCompleted(id: number, dto: CompletedDto, user: AuthPayload) {
    const sampleRequest = await this.repo.findOne({ where: { id } });
    sampleRequest.addStatus('completed');
    sampleRequest.completedAt = new Date(dto.completedAt);
    sampleRequest.nodeData = {
      ...sampleRequest.nodeData,
      completed: {
        operator: user.name,
        date: new Date(),
        memo: dto.memo,
      },
    };

    return await this.repo.save(sampleRequest);
  }
}
