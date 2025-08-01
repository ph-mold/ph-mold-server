import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { AdminSampleRequestService } from './admin.sample-request.service';
import { GetSampleRequestsDto } from './dto/get-sample-requests.dto';
import { ProcessingDto, ShippedDto, CompletedDto } from './dto/process-dto';
import { AuthPayload } from '../auth/auth.type';
import { User } from 'src/decorators/user.decorator';

@ApiTags('Admin Sample Request')
@Controller('admin/sample-request')
@ApiBearerAuth('access-token')
@Roles(Role.Admin, Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminSampleRequestController {
  constructor(private readonly service: AdminSampleRequestService) {}

  @Get()
  async getSampleRequests(@Query() dto: GetSampleRequestsDto) {
    if (dto.page && dto.limit) {
      return this.service.getSampleRequestsWithPagination(dto);
    }
    return this.service.getSampleRequests();
  }

  @Get(':id')
  async getSampleRequest(@Param('id') id: number) {
    return this.service.getSampleRequest(id);
  }

  // ===== 프로세스 관리 API =====

  @Post(':id/process/reception')
  async completeReception(@Param('id') id: number, @User() user: AuthPayload) {
    return await this.service.completeReception(id, user);
  }

  @Post(':id/process/processing')
  async completeProcessing(
    @Param('id') id: number,
    @Body() dto: ProcessingDto,
    @User() user: AuthPayload,
  ) {
    return await this.service.completeProcessing(id, dto, user);
  }

  @Post(':id/process/shipped')
  async completeShipped(
    @Param('id') id: number,
    @Body() dto: ShippedDto,
    @User() user: AuthPayload,
  ) {
    return await this.service.completeShipped(id, dto, user);
  }

  @Post(':id/process/completed')
  async completeRequest(
    @Param('id') id: number,
    @Body() dto: CompletedDto,
    @User() user: AuthPayload,
  ) {
    return await this.service.completeCompleted(id, dto, user);
  }
}
