import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('')
  async getRootCategories() {
    return this.categoryService.getRootCategories();
  }

  @Get(':key')
  async getChildren(@Param('key') key: string) {
    return this.categoryService.getChildrenByKey(key);
  }
}
