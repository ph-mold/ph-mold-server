import { Controller, Get, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('main')
  async getMainCategories() {
    const data = await this.categoryService.getMainCategories();
    return { data };
  }

  @ApiQuery({ name: 'main', required: false, type: String })
  @Get('sub')
  async getSubCategories(@Query('main') mainCategory?: string) {
    const data = await this.categoryService.getSubCtegories(mainCategory);
    return { data };
  }
}
