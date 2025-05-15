import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecType } from 'src/modules/product/entities/spec_type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminProductSpecRepository {
  constructor(
    @InjectRepository(SpecType)
    private readonly specTypeRepo: Repository<SpecType>,
  ) {}
}
