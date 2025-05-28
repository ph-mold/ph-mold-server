import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminProductSpecService } from './admin.product-spec.service';
import { AdminProductSpecRepository } from './admin.product-spec.repository';
import { ProductSpec } from 'src/modules/product/entities/product-spec.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSpec])],
  providers: [AdminProductSpecService, AdminProductSpecRepository],
  exports: [AdminProductSpecService],
})
export class AdminProductSpecModule {}
