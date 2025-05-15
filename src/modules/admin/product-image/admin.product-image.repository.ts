import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from 'src/modules/product/entities/product-image.entitiy';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class AdminProductImageRepository {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepo: Repository<ProductImage>,
  ) {}
  insertImage(
    productId: number,
    image: { url: string; isThumbnail?: number; sortOrder?: number },
    manager: EntityManager,
  ) {
    return manager.getRepository(ProductImage).insert({
      product: { id: productId },
      url: image.url,
      isThumbnail: !!image.isThumbnail,
      sortOrder: image.sortOrder ?? 0,
    });
  }

  updateImage(
    id: number,
    data: { isThumbnail?: number; sortOrder?: number },
    manager: EntityManager,
  ) {
    return manager.getRepository(ProductImage).update(
      { id },
      {
        isThumbnail: !!data.isThumbnail,
        sortOrder: data.sortOrder ?? 0,
      },
    );
  }

  deleteImage(id: number, manager: EntityManager) {
    return manager.getRepository(ProductImage).delete({ id });
  }
}
