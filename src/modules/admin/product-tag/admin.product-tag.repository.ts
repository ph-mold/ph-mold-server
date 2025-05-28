import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/modules/product/entities/product.entity';
import { Tag } from 'src/modules/tag/entities/tag.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class AdminProductTagRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,
  ) {}

  private getRepo<T>(
    entity: Repository<T>,
    manager?: EntityManager,
  ): Repository<T> {
    return manager ? manager.getRepository(entity.target) : entity;
  }

  async addTagRelation(
    productId: number,
    tagId: number,
    manager?: EntityManager,
  ) {
    const productRepo = this.getRepo(this.productRepo, manager);
    const tagRepo = this.getRepo(this.tagRepo, manager);

    const product = await productRepo.findOne({
      where: { id: productId },
      relations: ['tags'],
    });
    const tag = await tagRepo.findOneBy({ id: tagId });

    if (product && tag) {
      product.tags.push(tag);
      await productRepo.save(product);
    }
  }

  async removeTagRelation(
    productId: number,
    tagId: number,
    manager?: EntityManager,
  ) {
    const productRepo = this.getRepo(this.productRepo, manager);

    const product = await productRepo.findOne({
      where: { id: productId },
      relations: ['tags'],
    });
    if (!product) return;

    product.tags = product.tags.filter((tag) => tag.id !== tagId);
    await productRepo.save(product);
  }
}
