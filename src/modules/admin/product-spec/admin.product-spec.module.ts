import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecType } from 'src/modules/product/entities/spec_type.entity';
import { AdminProductSpecService } from './admin.product-spec.service';
import { AdminProductSpecRepository } from './admin.product-spec.repository';
import { AdminProductSpecController } from './admin.product-spec.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SpecType])],
  providers: [AdminProductSpecService, AdminProductSpecRepository],
  controllers: [AdminProductSpecController],
})
export class AdminProductSpecModule {}
