import { Injectable } from '@nestjs/common';
import AdminProductTagRepository from './admin.product-tag.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from 'src/modules/tag/entities/tag.entity';

@Injectable()
export class AdminProductTagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,
    private readonly adminProductTagRepository: AdminProductTagRepository,
  ) {}

  async getTags() {
    return this.tagRepo.find();
  }
}
