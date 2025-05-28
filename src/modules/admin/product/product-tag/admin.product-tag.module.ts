import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminProductTagService } from './admin.product-tag.service';
import { AdminProductTagRepository } from './admin.product-tag.repository';
import { Tag } from 'src/modules/tag/entities/tag.entity';
import { Product } from 'src/modules/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Tag])],
  providers: [AdminProductTagService, AdminProductTagRepository],
  exports: [AdminProductTagService],
})
export class AdminProductTagModule {}
