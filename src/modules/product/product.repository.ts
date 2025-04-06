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

  async findByTagKeys(tagKeys: string[]): Promise<Product[]> {
    return this.productRepo
      .createQueryBuilder('product')
      .innerJoin('product.tags', 'tag')
      .where('tag.key IN (:...tagKeys)', { tagKeys })
      .groupBy('product.id')
      .having('COUNT(DISTINCT tag.id) = :count', { count: tagKeys.length })
      .getMany();
  }
}
