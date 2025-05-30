import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { AdminTagService } from './admin.tag.service';
import { UpdateTagDto } from './dto/update-tag.dto';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('admin/tag')
@ApiBearerAuth('access-token')
@Roles(Role.Admin, Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminTagController {
  constructor(private readonly adminTagService: AdminTagService) {}

  @Get()
  async getTags() {
    return this.adminTagService.getTags();
  }

  @Get(':id')
  async getTag(@Param('id') id: number) {
    return this.adminTagService.getTag(id);
  }

  @Post()
  async createTag(@Body() body: CreateTagDto) {
    return this.adminTagService.createTag(body);
  }

  @Patch(':id')
  async updateTag(@Param('id') id: number, @Body() body: UpdateTagDto) {
    return this.adminTagService.updateTag(id, body);
  }

  @Delete(':id')
  async deleteTag(@Param('id') id: number) {
    return this.adminTagService.deleteTag(id);
  }
}
