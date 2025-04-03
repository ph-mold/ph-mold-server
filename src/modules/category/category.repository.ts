import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../product/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async findDistinctMainCategories(): Promise<string[]> {
    const rows = await this.productRepo
      .createQueryBuilder('product')
      .select('DISTINCT product.mainCategory', 'mainCategory')
      .getRawMany();

    return (rows as Product[]).map((row) => row.mainCategory);
  }

  async findDistinctSubCategories(mainCategory?: string): Promise<string[]> {
    const query = this.productRepo
      .createQueryBuilder('product')
      .select('DISTINCT product.subCategory', 'subCategory');

    if (mainCategory) {
      query.where('product.mainCategory = :main', { main: mainCategory });
    }

    const rows = await query.getRawMany();

    return (rows as Product[]).map((row) => row.subCategory);
  }
}
