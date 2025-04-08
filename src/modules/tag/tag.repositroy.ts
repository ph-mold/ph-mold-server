import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class TagRepository {
  constructor(
    @InjectRepository(Tag) private readonly tagRepo: Repository<Tag>,
  ) {}

  async findByKeys(keys: string[]): Promise<Tag[]> {
    return this.tagRepo.find({ where: { key: In(keys) } });
  }
}
