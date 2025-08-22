import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminProductTagService } from './admin.product-tag.service';
import { AdminProductTagRepository } from './admin.product-tag.repository';
import { Tag, Product } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Tag])],
  providers: [AdminProductTagService, AdminProductTagRepository],
  exports: [AdminProductTagService],
})
export class AdminProductTagModule {}
