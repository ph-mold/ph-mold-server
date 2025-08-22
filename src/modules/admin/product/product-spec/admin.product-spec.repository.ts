import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductSpec } from 'src/entities';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class AdminProductSpecRepository {
  constructor(
    @InjectRepository(ProductSpec)
    private readonly specRepo: Repository<ProductSpec>,
  ) {}

  private getRepo<T>(
    repo: Repository<T>,
    manager?: EntityManager,
  ): Repository<T> {
    return manager ? manager.getRepository(repo.target) : repo;
  }

  async insertSpec(
    productId: number,
    specTypeId: number,
    value: string,
    manager?: EntityManager,
  ) {
    const repo = this.getRepo(this.specRepo, manager);
    return repo.insert({
      product: { id: productId },
      specType: { id: specTypeId },
      value,
    });
  }

  async updateSpec(id: number, value: string, manager?: EntityManager) {
    const repo = this.getRepo(this.specRepo, manager);
    return repo.update({ id }, { value });
  }

  async deleteSpec(id: number, manager?: EntityManager) {
    const repo = this.getRepo(this.specRepo, manager);
    return repo.delete({ id });
  }
}
