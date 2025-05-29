import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SampleRequest } from 'src/modules/product/entities/smaple-request.entity';
import { Repository } from 'typeorm';

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
  async findOneWithProduct(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['product'],
    });
  }
}
