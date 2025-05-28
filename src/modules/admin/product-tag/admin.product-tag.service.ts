import { Injectable } from '@nestjs/common';
import { AdminProductTagRepository } from './admin.product-tag.repository';
import { EntityManager } from 'typeorm';
import { UpdateTagDto } from '../product/dto/update-product.dto';

@Injectable()
export class AdminProductTagService {
  constructor(private readonly repo: AdminProductTagRepository) {}

  async syncTags(
    productId: number,
    tags: UpdateTagDto[],
    manager?: EntityManager,
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
