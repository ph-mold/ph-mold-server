import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecType } from 'src/modules/product/entities/spec_type.entity';
import { AdminSpecService } from './admin.spec.service';
import { AdminSpecController } from './admin.spec.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SpecType])],
  providers: [AdminSpecService],
  controllers: [AdminSpecController],
  exports: [AdminSpecService],
})
export class AdminSpecModule {}
