import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CustomCategory } from './entities/custom-category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

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
}
