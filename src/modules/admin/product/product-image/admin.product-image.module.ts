import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminProductImageRepository } from './admin.product-image.repository';
import { AdminProductImageService } from './admin.product-image.service';
import { FileModule } from 'src/modules/file/file.module';
import { ProductImage } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImage]), FileModule],
  providers: [AdminProductImageService, AdminProductImageRepository],
  exports: [AdminProductImageService],
})
export class AdminProductImageModule {}
