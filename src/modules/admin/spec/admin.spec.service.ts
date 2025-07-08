import { Injectable, ConflictException } from '@nestjs/common';
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
    // key 중복 검사
    const existingSpec = await this.repo.findByKey(dto.key);
    if (existingSpec) {
      throw new ConflictException('이미 존재하는 키입니다.');
    }

    return await this.repo.create(dto);
  }

  async updateSpec(specId: number, dto: UpdateSpecDto) {
    // key 중복 검사 (자신 제외)
    if (dto.key) {
      const existingSpec = await this.repo.findByKey(dto.key, specId);
      if (existingSpec) {
        throw new ConflictException('이미 존재하는 키입니다.');
      }
    }

    return await this.repo.update(specId, dto);
  }

  async deleteSpec(specId: number) {
    await this.repo.delete(specId);
    return {
      message: '스펙이 삭제되었습니다.',
    };
  }
}
