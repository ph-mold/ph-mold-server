import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminSpecService } from './admin.spec.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { GetSpecsDto } from './dto/get-specs.dto';
import { CreateSpecDto } from './dto/create-spec.dto';
import { UpdateSpecDto } from './dto/update-spec.dto';

@Controller('admin/spec')
@ApiBearerAuth('access-token')
@Roles(Role.Admin, Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminSpecController {
  constructor(private readonly adminSpecService: AdminSpecService) {}

  @Get()
  async getSpecs(@Query() dto: GetSpecsDto) {
    if (dto.page && dto.limit) {
      return this.adminSpecService.getSpecsWithPagination(dto);
    }
    return this.adminSpecService.getSpecs();
  }

  @Post()
  async createSpec(@Body() dto: CreateSpecDto) {
    return this.adminSpecService.createSpec(dto);
  }

  @Patch(':specId')
  async updateSpec(
    @Param('specId') specId: number,
    @Body() dto: UpdateSpecDto,
  ) {
    return this.adminSpecService.updateSpec(specId, dto);
  }

  @Delete(':specId')
  async deleteSpec(@Param('specId') specId: number) {
    return this.adminSpecService.deleteSpec(specId);
  }
}
