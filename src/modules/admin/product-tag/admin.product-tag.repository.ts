import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/modules/tag/entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminProductTagRepository {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,
  ) {}
}
