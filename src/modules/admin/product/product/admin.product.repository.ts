import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/modules/product/entities/product.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class AdminProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}
  async find(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new Error('Product not found');
    return product;
  }

  async save(product: Product, manager: EntityManager): Promise<Product> {
    return await manager.getRepository(Product).save(product);
  }
}
