import { Injectable } from '@nestjs/common';
import { SampleRequest } from './entities/smaple-request.entity';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { CreateSampleRequestDto } from './dto/create-sample-request.dto';

@Injectable()
export class SampleRequestRepository extends Repository<SampleRequest> {
  constructor(private readonly dataSource: DataSource) {
    super(SampleRequest, dataSource.createEntityManager());
  }

  async createAndSave(dto: CreateSampleRequestDto): Promise<SampleRequest> {
    const product = await this.dataSource
      .getRepository(Product)
      .findOneByOrFail({
        id: dto.productId,
      });

    const sampleRequest = this.create({
      ...dto,
      product,
    });

    return await this.save(sampleRequest);
  }
}
