import { Injectable } from '@nestjs/common';
import { UpdateTagDto } from './dto/update-tag.dto';
import { AdminTagRepository } from './admin.tag.repository';
import { CreateTagDto } from './dto/create-tag.dto';
import { GetTagsDto } from './dto/get-tags.dto';

@Injectable()
export class AdminTagService {
  constructor(private readonly repo: AdminTagRepository) {}

  async getTags() {
    return this.repo.findAll();
  }

  async getTagsWithPagination(dto: GetTagsDto) {
    const [items, total] = await this.repo.findAllWithPagination(dto);

    return {
      items,
      total,
      page: dto.page,
      limit: dto.limit,
    };
  }

  async getTag(id: number) {
    return this.repo.findById(id);
  }

  async createTag(payload: CreateTagDto) {
    return this.repo.create(payload);
  }

  async updateTag(id: number, payload: UpdateTagDto) {
    return this.repo.update(id, payload);
  }

  async deleteTag(id: number) {
    return this.repo.delete(id);
  }
}
