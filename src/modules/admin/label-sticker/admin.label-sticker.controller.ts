import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  Get,
  Query,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags, ApiParam } from '@nestjs/swagger';
import { Response } from 'express';
import { AdminLabelStickerService } from './admin.label-sticker.service';
import {
  LabelStickerRequestDto,
  LS3509LabelStickerDto,
  LS3510LabelStickerDto,
} from './dto/label-sticker-request.dto';
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
    type: LabelStickerRequestDto<LS3510LabelStickerDto>,
  })
  async createPDFLS3510(
    @Body() request: LabelStickerRequestDto<LS3510LabelStickerDto>,
    @Res() res: Response,
    @User() user: AuthPayload,
  ): Promise<void> {
    const buffer = await this.labelStickerService.createPDFLS3510WithHistory(
      request.data,
      {
        filename: request.filename,
        operator: user.name,
        labelType: 'ls-3510',
      },
    );

    const encodedFilename = encodeURIComponent(request.filename);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodedFilename}.pdf`,
    });
    res.send(buffer);
  }

  @Post('ls-3509')
  @ApiBody({
    type: LabelStickerRequestDto<LS3509LabelStickerDto>,
  })
  async createPDFLS3509(
    @Body() request: LabelStickerRequestDto<LS3509LabelStickerDto>,
    @Res() res: Response,
    @User() user: AuthPayload,
  ): Promise<void> {
    const buffer = await this.labelStickerService.createPDFLS3509WithHistory(
      request.data,
      {
        filename: request.filename,
        operator: user.name,
        labelType: 'ls-3509',
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
    type: LabelStickerRequestDto<LS3510LabelStickerDto>,
  })
  async regeneratePDFLS3510(
    @Body() request: LabelStickerRequestDto<LS3510LabelStickerDto>,
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

  @Post('ls-3509/regenerate')
  @ApiBody({
    type: LabelStickerRequestDto<LS3509LabelStickerDto>,
  })
  async regeneratePDFLS3509(
    @Body() request: LabelStickerRequestDto<LS3509LabelStickerDto>,
    @Res() res: Response,
  ): Promise<void> {
    const buffer = await this.labelStickerService.regeneratePDFLS3509(
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

  @Delete('histories/:id')
  @ApiParam({ name: 'id', description: '히스토리 ID' })
  async deleteHistory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ success: boolean }> {
    const success = await this.labelStickerService.softDeleteHistory(id);
    return { success };
  }
}
