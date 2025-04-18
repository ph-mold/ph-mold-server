import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async findProductsByTagKeys(
    includeTagKeys: string[] = [],
    excludeTagKeys: string[] = [],
  ): Promise<Product[]> {
    const qb = this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.tags', 'tag');

    // include 조건
    if (includeTagKeys.length > 0) {
      qb.andWhere((qb) => {
        const sub = qb
          .subQuery()
          .select('pt.product_id')
          .from('product_tags', 'pt')
          .innerJoin('tags', 't', 'pt.tag_id = t.id')
          .where('t.key IN (:...includeTagKeys)')
          .groupBy('pt.product_id')
          .having('COUNT(DISTINCT t.id) = :includeCount')
          .getQuery();

        return `product.id IN ${sub}`;
      }).setParameters({ includeTagKeys, includeCount: includeTagKeys.length });
    }

    // exclude 조건
    if (excludeTagKeys.length > 0) {
      qb.andWhere((qb) => {
        const sub = qb
          .subQuery()
          .select('1')
          .from('product_tags', 'pt')
          .innerJoin('tags', 't', 'pt.tag_id = t.id')
          .where('pt.product_id = product.id')
          .andWhere('t.key IN (:...excludeTagKeys)')
          .getQuery();

        return `NOT EXISTS ${sub}`;
      }).setParameter('excludeTagKeys', excludeTagKeys);
    }

    return qb.getMany();
  }

  async findProductByKey(key: string): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { key },
    });
    if (!product) {
      throw new NotFoundException(`Product with key ${key} not found`);
    }
    return product;
  }
}
