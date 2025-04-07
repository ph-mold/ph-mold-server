import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async findByTagKeys(
    includeTagKeys: string[],
    excludeTagKeys: string[] = [],
  ): Promise<Product[]> {
    const qb = this.productRepo
      .createQueryBuilder('product')
      .innerJoin('product.tags', 'tag')
      .where('tag.key IN (:...includeTagKeys)', { includeTagKeys })
      .groupBy('product.id')
      .having('COUNT(DISTINCT tag.id) = :includeCount', {
        includeCount: includeTagKeys.length,
      });

    // 제외 조건 추가
    if (excludeTagKeys.length > 0) {
      qb.andWhere((qb) => {
        const subQb = qb
          .subQuery()
          .select('1')
          .from('product_tags', 'pt')
          .innerJoin('tags', 't', 'pt.tag_id = t.id')
          .where('pt.product_id = product.id')
          .andWhere('t.key IN (:...excludeTagKeys)')
          .getQuery();

        return `NOT EXISTS ${subQb}`;
      }).setParameter('excludeTagKeys', excludeTagKeys);
    }

    return qb.getMany();
  }
}
