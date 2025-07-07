import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecType } from 'src/modules/product/entities/spec_type.entity';
import { Repository } from 'typeorm';
import { GetSpecsDto } from './dto/get-specs.dto';

@Injectable()
export class AdminSpecRepository {
  constructor(
    @InjectRepository(SpecType)
    private readonly repo: Repository<SpecType>,
  ) {}

  async findAll(): Promise<SpecType[]> {
    return this.repo.find();
  }

  async findAllWithPagination(dto: GetSpecsDto): Promise<[SpecType[], number]> {
    return this.repo.findAndCount({
      skip: (dto.page - 1) * dto.limit,
      take: dto.limit,
    });
  }
}
