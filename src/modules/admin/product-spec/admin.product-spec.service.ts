import { Injectable } from '@nestjs/common';
import { AdminProductSpecRepository } from './admin.product-spec.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecType } from 'src/modules/product/entities/spec_type.entity';
import { Repository } from 'typeorm';

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
}
