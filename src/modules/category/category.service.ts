import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CustomCategory } from 'src/entities';
import { CreateCustomCategoryDto } from './dto';
import { TagRepository } from '../tag/tag.repositroy';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepo: CategoryRepository,
    private readonly tagRepo: TagRepository,
  ) {}

  async getRootCategories(): Promise<CustomCategory[]> {
    return this.categoryRepo.findRootCategories();
  }
  async getChildrenByKey(parentKey?: string): Promise<CustomCategory[]> {
    return this.categoryRepo.findChildrenByKey(parentKey);
  }

  async resolveTagKeysByCategoryKey(categoryKey: string): Promise<{
    include: string[];
    exclude: string[];
  }> {
    const category = await this.categoryRepo.findOneWithTagsByKey(categoryKey);

    if (!category) {
      throw new NotFoundException(`Category with key ${categoryKey} not found`);
    }

    const include: string[] = [];
    const exclude: string[] = [];

    for (const ct of category.customCategoryTags) {
      if (ct.type === 'include') include.push(ct.tag.key);
      if (ct.type === 'exclude') exclude.push(ct.tag.key);
    }

    return { include, exclude };
  }

  async create(
    dto: CreateCustomCategoryDto,
    imageUrl?: string,
  ): Promise<CustomCategory> {
    const tagKeys = dto.tags.map((t) => t.tagKey);
    const tags = await this.tagRepo.findByKeys(tagKeys);

    const foundKeys = tags.map((t) => t.key);
    const missing = tagKeys.filter((k) => !foundKeys.includes(k));

    if (missing.length > 0) {
      throw new BadRequestException(
        `존재하지 않는 태그 키: ${missing.join(', ')}`,
      );
    }
    return this.categoryRepo.create(dto, imageUrl ?? null, tags);
  }
}
