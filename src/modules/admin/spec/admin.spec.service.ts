import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecType } from 'src/modules/product/entities/spec_type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminSpecService {
  constructor(
    @InjectRepository(SpecType)
    private readonly repo: Repository<SpecType>,
  ) {}

  async getSpecTypes() {
    return this.repo.find();
  }
}
