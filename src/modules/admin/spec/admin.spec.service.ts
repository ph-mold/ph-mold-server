import { Injectable } from '@nestjs/common';
import { GetSpecsDto } from './dto/get-specs.dto';
import { AdminSpecRepository } from './admin.spec.repository';

@Injectable()
export class AdminSpecService {
  constructor(private readonly repo: AdminSpecRepository) {}

  async getSpecs() {
    return this.repo.findAll();
  }

  async getSpecsWithPagination(dto: GetSpecsDto) {
    const [items, total] = await this.repo.findAllWithPagination(dto);

    return {
      items,
      total,
      page: dto.page,
      limit: dto.limit,
    };
  }
}
