import { Injectable } from '@nestjs/common';
import { GetSpecsDto } from './dto/get-specs.dto';
import { AdminSpecRepository } from './admin.spec.repository';
import { CreateSpecDto } from './dto/create-spec.dto';
import { UpdateSpecDto } from './dto/update-spec.dto';

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

  async createSpec(dto: CreateSpecDto) {
    return await this.repo.create(dto);
  }

  async updateSpec(specId: number, dto: UpdateSpecDto) {
    return await this.repo.update(specId, dto);
  }

  async deleteSpec(specId: number) {
    await this.repo.delete(specId);
    return {
      message: '스펙이 삭제되었습니다.',
    };
  }
}
