import { Injectable } from '@nestjs/common';
import { AdminProductTagRepository } from './admin.product-tag.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Tag } from 'src/modules/tag/entities/tag.entity';
import { UpdateTagDto } from '../product/dto/update-product.dto';

@Injectable()
export class AdminProductTagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,
    private readonly repo: AdminProductTagRepository,
  ) {}

  async getTags() {
    return this.tagRepo.find();
  }

  async syncTags(
    productId: number,
    tags: UpdateTagDto[],
    manager: EntityManager,
  ) {
    for (const tag of tags) {
      if (tag.flag === 'delete') {
        await this.repo.removeTagRelation(productId, tag.id, manager);
      }

      if (tag.flag === 'new') {
        await this.repo.addTagRelation(productId, tag.id, manager);
      }
    }
  }
}
