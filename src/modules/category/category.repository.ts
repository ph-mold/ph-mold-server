import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomCategory } from './entities/custom-category.entity';
import { CustomCategoryTag } from './entities/custom-category-tag.entity';
import { CreateCustomCategoryDto } from './dto';
import { Tag } from '../tag/entities/tag.entity';

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

  async create(
    dto: CreateCustomCategoryDto,
    imageUrl: string,
    tags: Tag[],
  ): Promise<CustomCategory> {
    const { key, name, parentId } = dto;

    const category = this.customCategoryRepo.create({
      key,
      name,
      parentId,
      imageUrl,
    });

    const saved = await this.customCategoryRepo.save(category);

    const tagKeyToId = Object.fromEntries(tags.map((tag) => [tag.key, tag.id]));

    const tagRelations = dto.tags.map((tagInput) => {
      const relation = new CustomCategoryTag();
      relation.customCategoryId = saved.id;
      relation.tagId = tagKeyToId[tagInput.tagKey];
      relation.type = tagInput.type;
      return relation;
    });

    await this.customCategoryTagRepo.save(tagRelations);

    return saved;
  }
}
