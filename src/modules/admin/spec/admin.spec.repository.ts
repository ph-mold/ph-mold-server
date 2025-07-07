import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecType } from 'src/modules/product/entities/spec_type.entity';
import { Repository } from 'typeorm';
import { GetSpecsDto } from './dto/get-specs.dto';
import { CreateSpecDto } from './dto/create-spec.dto';
import { UpdateSpecDto } from './dto/update-spec.dto';

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

  async create(dto: CreateSpecDto): Promise<SpecType> {
    const specType = this.repo.create(dto);
    return this.repo.save(specType);
  }

  async update(specId: number, dto: UpdateSpecDto): Promise<SpecType> {
    await this.repo.update(specId, dto);
    return this.repo.findOne({ where: { id: specId } });
  }

  async delete(specId: number): Promise<void> {
    await this.repo.delete(specId);
  }
}
