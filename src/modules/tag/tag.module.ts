import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './domain/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
})
export class TagModule {}
