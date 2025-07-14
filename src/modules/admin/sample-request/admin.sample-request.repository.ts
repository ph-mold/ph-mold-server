import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SampleRequest } from 'src/modules/product/entities/smaple-request.entity';
import { Repository } from 'typeorm';
import { GetSampleRequestsDto } from './dto/get-sample-requests.dto';

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
}
