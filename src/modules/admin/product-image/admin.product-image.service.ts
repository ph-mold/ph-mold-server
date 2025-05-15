import { Injectable } from '@nestjs/common';
import { AdminProductImageRepository } from './admin.product-image.repository';
import { EntityManager } from 'typeorm';
import { UpdateImageDto } from '../product/dto/update-product.dto';
import { FileService } from 'src/modules/file/file.service';

@Injectable()
export class AdminProductImageService {
  constructor(
    private readonly adminProductImageRepo: AdminProductImageRepository,
    private readonly fileService: FileService,
  ) {}

  async syncImages(
    productId: number,
    images: UpdateImageDto[],
    manager: EntityManager,
  ) {
    for (const image of images) {
      // 1. 삭제
      if (image.flag === 'delete') {
        await this.adminProductImageRepo.deleteImage(image.id, manager);
        continue;
      }

      // 2. 신규 추가
      if (image.flag === 'new') {
        await this.fileService.markFileAsUsed(image.url);
        await this.adminProductImageRepo.insertImage(
          productId,
          {
            url: image.url,
            isThumbnail: image.isThumbnail,
            sortOrder: image.sortOrder,
          },
          manager,
        );
        continue;
      }

      // 3. 업데이트
      if (image.flag === 'update') {
        await this.adminProductImageRepo.updateImage(
          image.id,
          {
            isThumbnail: image.isThumbnail,
            sortOrder: image.sortOrder,
          },
          manager,
        );
      }
    }
  }
}
