import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AdminLabelStickerService } from './admin.label-sticker.service';
import { LabelStickerRequestDto } from './dto/label-sticker-request.dto';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { GetLabelStickerHistoriesDto } from './dto/get-label-sticker-histories.dto';
import { PaginatedLabelStickerHistoriesResponseDto } from './dto/paginated-label-sticker-histories-response.dto';
import { AuthPayload } from 'src/modules/admin/auth/auth.type';
import { User } from 'src/decorators/user.decorator';

@ApiTags('라벨 스티커')
@ApiBearerAuth('access-token')
@Roles(Role.Admin, Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin/label-sticker')
export class AdminLabelStickerController {
  constructor(private readonly labelStickerService: AdminLabelStickerService) {}

  @Post('ls-3510')
  @ApiBody({
    type: LabelStickerRequestDto,
  })
  async createPDFLS3510(
    @Body() request: LabelStickerRequestDto,
    @Res() res: Response,
    @User() user: AuthPayload,
  ): Promise<void> {
    const buffer = await this.labelStickerService.createPDFLS3510WithHistory(
      request.data,
      {
        filename: request.filename,
        operator: user.name,
        labelType: 'LS-3510',
      },
    );

    const encodedFilename = encodeURIComponent(request.filename);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodedFilename}.pdf`,
    });
    res.send(buffer);
  }

  @Post('ls-3510/regenerate')
  @ApiBody({
    type: LabelStickerRequestDto,
  })
  async regeneratePDFLS3510(
    @Body() request: LabelStickerRequestDto,
    @Res() res: Response,
  ): Promise<void> {
    const buffer = await this.labelStickerService.regeneratePDFLS3510(
      request.data,
    );

    const encodedFilename = encodeURIComponent(request.filename);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodedFilename}.pdf`,
    });
    res.send(buffer);
  }

  @Get('histories')
  async findAllHistories(
    @Query() dto: GetLabelStickerHistoriesDto,
  ): Promise<PaginatedLabelStickerHistoriesResponseDto> {
    return this.labelStickerService.findAllHistories(dto);
  }
}
