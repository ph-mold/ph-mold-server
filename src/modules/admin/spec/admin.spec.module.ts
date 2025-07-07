import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecType } from 'src/modules/product/entities/spec_type.entity';
import { AdminSpecService } from './admin.spec.service';
import { AdminSpecController } from './admin.spec.controller';
import { AdminSpecRepository } from './admin.spec.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SpecType])],
  providers: [AdminSpecService, AdminSpecRepository],
  controllers: [AdminSpecController],
  exports: [AdminSpecService],
})
export class AdminSpecModule {}
