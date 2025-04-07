import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomCategory } from './entities/custom-category.entity';
import { CustomCategoryTag } from './entities/custom-category-tag.entity';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(CustomCategory)
    private readonly customCategoryRepo: Repository<CustomCategory>,
    @InjectRepository(CustomCategoryTag)
    private readonly customCategoryTagRepo: Repository<CustomCategoryTag>,
  ) {}

  async findRootCategories(): Promise<CustomCategory[]> {
    return this.customCategoryRepo.find({
      where: { parentId: null },
      order: { createdAt: 'ASC' },
    });
  }
  async findChildrenByKey(parentKey: string): Promise<CustomCategory[]> {
    const parent = await this.customCategoryRepo.findOne({
      where: { key: parentKey },
    });
    if (!parent) throw new Error('Parent category not found');

    return this.customCategoryRepo.find({
      where: { parentId: parent.id },
      order: { createdAt: 'ASC' },
    });
  }
  async findOneWithTagsByKey(key: string): Promise<CustomCategory | null> {
    return this.customCategoryRepo.findOne({
      where: { key },
      relations: ['customCategoryTags', 'customCategoryTags.tag'],
    });
  }
}
