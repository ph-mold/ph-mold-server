import { Injectable } from '@nestjs/common';
import { AdminProductSpecRepository } from './admin.product-spec.repository';
import { EntityManager } from 'typeorm';
import { UpdateSpecDto } from '../product/dto/update-product.dto';

@Injectable()
export class AdminProductSpecService {
  constructor(private readonly repo: AdminProductSpecRepository) {}

  async syncSpecs(
    productId: number,
    specs: UpdateSpecDto[],
    manager?: EntityManager,
  ) {
    for (const spec of specs) {
      if (spec.flag === 'delete') {
        await this.repo.deleteSpec(spec.id, manager);
        continue;
      }

      if (spec.flag === 'new') {
        await this.repo.insertSpec(
          productId,
          spec.specType.id,
          spec.value,
          manager,
        );
        continue;
      }

      if (spec.flag === 'update') {
        await this.repo.updateSpec(spec.id, spec.value, manager);
      }
    }
  }
}
