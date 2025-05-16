import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminProductTagService } from './admin.product-tag.service';
import { AdminProductTagRepository } from './admin.product-tag.repository';
import { AdminProductTagController } from './admin.product-tag.controller';
import { Tag } from 'src/modules/tag/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [AdminProductTagService, AdminProductTagRepository],
  controllers: [AdminProductTagController],
  exports: [AdminProductTagService],
})
export class AdminProductTagModule {}
