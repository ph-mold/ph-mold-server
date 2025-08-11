import { Injectable } from '@nestjs/common';
import { SampleRequest } from '../product/entities/smaple-request.entity';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { CreateSampleRequestDto } from './dto/create-sample-request.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SampleRequestRepository extends Repository<SampleRequest> {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(SampleRequest)
    private readonly sampleRequestRepo: Repository<SampleRequest>,
  ) {
    super(SampleRequest, dataSource.createEntityManager());
  }

  // 8자리 UUID 생성 함수
  private generateTrackingCode(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }

  async createAndSave(dto: CreateSampleRequestDto): Promise<SampleRequest> {
    const product = await this.dataSource
      .getRepository(Product)
      .findOneByOrFail({
        id: dto.productId,
      });

    // 8자리 tracking_code 생성
    const trackingCode = this.generateTrackingCode();

    const sampleRequest = this.create({
      ...dto,
      product,
      trackingCode,
    });

    return await this.save(sampleRequest);
  }

  async findOneByTrackingCode(
    trackingCode: string,
  ): Promise<SampleRequest | undefined> {
    return await this.sampleRequestRepo.findOne({
      where: { trackingCode },
      relations: ['product'],
    });
  }
}
