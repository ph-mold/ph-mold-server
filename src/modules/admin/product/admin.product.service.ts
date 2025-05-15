import { Injectable } from '@nestjs/common';
import { AdminProductRepository } from './admin.product.repository';
import { DataSource } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
import { AdminProductImageService } from '../product-image/admin.product-image.service';

@Injectable()
export class AdminProductService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly productImageService: AdminProductImageService,
    private readonly adminProductRepository: AdminProductRepository,
  ) {}
  async update(productId: number, dto: UpdateProductDto) {
    return await this.dataSource.transaction(async (manager) => {
      const product = await this.adminProductRepository.find(productId);
      product.name = dto.name;
      product.moq = dto.moq;
      product.thumbnailImageUrl =
        dto.images.find((img) => img.isThumbnail === 1)?.url ?? undefined;
      await this.adminProductRepository.save(product, manager);

      await this.productImageService.syncImages(productId, dto.images, manager);
    });
  }
}
