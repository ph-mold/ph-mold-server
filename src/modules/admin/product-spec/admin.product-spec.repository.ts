import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductSpec } from 'src/modules/product/entities/product-spec.entity';
import { SpecType } from 'src/modules/product/entities/spec_type.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class AdminProductSpecRepository {
  constructor(
    @InjectRepository(ProductSpec)
    private readonly repo: Repository<ProductSpec>,
    @InjectRepository(SpecType)
    private readonly specTypeRepo: Repository<SpecType>,
  ) {}

  async insertSpec(
    productId: number,
    specTypeId: number,
    value: string,
    manager: EntityManager,
  ) {
    return manager.getRepository(ProductSpec).insert({
      product: { id: productId },
      specType: { id: specTypeId },
      value,
    });
  }

  async updateSpec(id: number, value: string, manager: EntityManager) {
    return manager.getRepository(ProductSpec).update({ id }, { value });
  }

  async deleteSpec(id: number, manager: EntityManager) {
    return manager.getRepository(ProductSpec).delete({ id });
  }
}
