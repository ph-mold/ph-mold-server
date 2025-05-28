import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminTagService } from './admin.tag.service';
import { AdminTagController } from './admin.tag.controller';
import { Tag } from 'src/modules/tag/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [AdminTagService],
  controllers: [AdminTagController],
  exports: [AdminTagService],
})
export class AdminTagModule {}
