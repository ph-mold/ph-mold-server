import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecType } from 'src/modules/product/entities/spec_type.entity';
import { AdminProductSpecService } from './admin.product-spec.service';
import { AdminProductSpecRepository } from './admin.product-spec.repository';
import { AdminProductSpecController } from './admin.product-spec.controller';
import { ProductSpec } from 'src/modules/product/entities/product-spec.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSpec, SpecType])],
  providers: [AdminProductSpecService, AdminProductSpecRepository],
  controllers: [AdminProductSpecController],
})
export class AdminProductSpecModule {}
