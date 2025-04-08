import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { categoryImageMulterOptions } from 'src/utils/multer-options/category-image';
import {
  CreateCustomCategoryDto,
  CreateCustomCategoryWithImageDto,
} from './dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileCleanupFilter } from 'src/filters/file-cleanup.filter';
import { FileCleanupInterceptor } from 'src/interceptors/file-cleanup.interceptor';

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

  @Post()
  @UseFilters(FileCleanupFilter)
  @UseInterceptors(
    FileInterceptor('image', categoryImageMulterOptions()),
    FileCleanupInterceptor,
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCustomCategoryWithImageDto })
  async createCategory(
    @Body() dto: CreateCustomCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageUrl = `/uploads/categories/${dto.key}/${file.filename}`;
    return await this.categoryService.create(dto, imageUrl);
  }
}
