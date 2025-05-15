import { Injectable } from '@nestjs/common';
import { AdminProductSpecRepository } from './admin.product-spec.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecType } from 'src/modules/product/entities/spec_type.entity';
import { EntityManager, Repository } from 'typeorm';
import { UpdateSpecDto } from '../product/dto/update-product.dto';

@Injectable()
export class AdminProductSpecService {
  constructor(
    @InjectRepository(SpecType)
    private readonly specTypeRepo: Repository<SpecType>,
    private readonly adminProductSpecRepository: AdminProductSpecRepository,
  ) {}

  async getSpecTypes() {
    return this.specTypeRepo.find();
  }

  async syncSpecs(
    productId: number,
    specs: UpdateSpecDto[],
    manager: EntityManager,
  ) {
    for (const spec of specs) {
      if (spec.flag === 'delete') {
        await this.adminProductSpecRepository.deleteSpec(spec.id, manager);
        continue;
      }

      if (spec.flag === 'new') {
        await this.adminProductSpecRepository.insertSpec(
          productId,
          spec.specType.id,
          spec.value,
          manager,
        );
        continue;
      }

      if (spec.flag === 'update') {
        await this.adminProductSpecRepository.updateSpec(
          spec.id,
          spec.value,
          manager,
        );
      }
    }
  }
}
