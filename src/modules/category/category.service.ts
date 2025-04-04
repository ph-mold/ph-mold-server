import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getMainCategories(): Promise<string[]> {
    return this.categoryRepository.findDistinctMainCategories();
  }
  async getSubCtegories(mainCategory?: string): Promise<string[]> {
    return this.categoryRepository.findDistinctSubCategories(mainCategory);
  }
}
