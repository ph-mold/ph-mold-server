import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { TagRepository } from './tag.repositroy';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TagRepository],
  exports: [TagRepository],
})
export class TagModule {}
