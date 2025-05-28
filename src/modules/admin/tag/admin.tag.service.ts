import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from 'src/modules/tag/entities/tag.entity';

@Injectable()
export class AdminTagService {
  constructor(
    @InjectRepository(Tag)
    private readonly repo: Repository<Tag>,
  ) {}

  async getTags() {
    return this.repo.find();
  }
}
