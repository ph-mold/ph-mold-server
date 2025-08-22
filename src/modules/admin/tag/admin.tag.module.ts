import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminTagService } from './admin.tag.service';
import { AdminTagController } from './admin.tag.controller';
import { Tag } from 'src/entities';
import { AdminTagRepository } from './admin.tag.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [AdminTagService, AdminTagRepository],
  controllers: [AdminTagController],
  exports: [AdminTagService],
})
export class AdminTagModule {}
