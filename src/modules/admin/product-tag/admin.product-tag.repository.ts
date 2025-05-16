import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/modules/product/entities/product.entity';
import { Tag } from 'src/modules/tag/entities/tag.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class AdminProductTagRepository {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,
  ) {}

  async addTagRelation(
    productId: number,
    tagId: number,
    manager: EntityManager,
  ) {
    const product = await manager.getRepository(Product).findOne({
      where: { id: productId },
      relations: ['tags'],
    });
    const tag = await manager.getRepository(Tag).findOneBy({ id: tagId });
    if (product && tag) {
      product.tags.push(tag);
      await manager.getRepository(Product).save(product);
    }
  }

  async removeTagRelation(
    productId: number,
    tagId: number,
    manager: EntityManager,
  ) {
    const product = await manager.getRepository(Product).findOne({
      where: { id: productId },
      relations: ['tags'],
    });
    if (!product) return;

    product.tags = product.tags.filter((tag) => tag.id !== tagId);
    await manager.getRepository(Product).save(product);
  }
}
