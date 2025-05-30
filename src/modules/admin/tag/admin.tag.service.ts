import { Injectable } from '@nestjs/common';
import { UpdateTagDto } from './dto/update-tag.dto';
import { AdminTagRepository } from './admin.tag.repository';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class AdminTagService {
  constructor(private readonly repo: AdminTagRepository) {}

  async getTags() {
    return this.repo.findAll();
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
