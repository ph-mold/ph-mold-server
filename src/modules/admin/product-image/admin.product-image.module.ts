import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from 'src/modules/product/entities/product-image.entitiy';
import { AdminProductImageRepository } from './admin.product-image.repository';
import { AdminProductImageService } from './admin.product-image.service';
import { FileModule } from 'src/modules/file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImage]), FileModule],
  providers: [AdminProductImageService, AdminProductImageRepository],
})
export class AdminProductImageModule {}
