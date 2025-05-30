import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from 'src/modules/tag/entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class AdminTagRepository {
  constructor(
    @InjectRepository(Tag)
    private readonly repo: Repository<Tag>,
  ) {}

  async findAll(): Promise<Tag[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<Tag> {
    const tag = await this.repo.findOneBy({ id });
    if (!tag) {
      throw new NotFoundException('태그를 찾을 수 없습니다');
    }
    return tag;
  }

  async create(payload: CreateTagDto): Promise<Tag> {
    const tag = this.repo.create(payload);
    return this.repo.save(tag);
  }

  async update(id: number, { key, name }: UpdateTagDto): Promise<Tag> {
    const tag = await this.findById(id);
    tag.name = name;
    tag.key = key;
    return this.repo.save(tag);
  }

  async delete(id: number): Promise<void> {
    //TODO 삭제 플래그로 변경 필요
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('삭제할 태그가 없습니다');
    }
  }
}
