import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AdminLabelStickerService } from './admin.label-sticker.service';
import { LabelStickerRequestDto } from './dto/label-sticker-request.dto';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { GetLabelStickerHistoriesDto } from './dto/get-label-sticker-histories.dto';
import { PaginatedLabelStickerHistoriesResponseDto } from './dto/paginated-label-sticker-histories-response.dto';

@ApiTags('라벨 스티커')
@ApiBearerAuth('access-token')
@Roles(Role.Admin, Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin/label-sticker')
export class AdminLabelStickerController {
  constructor(private readonly labelStickerService: AdminLabelStickerService) {}

  @Post('ls-3510')
  @ApiOperation({
    summary: 'LS-3510 라벨 스티커 PDF 생성',
    description: 'A4 용지에 맞춰진 라벨 스티커 PDF를 생성합니다.',
  })
  @ApiBody({
    type: LabelStickerRequestDto,
    description: '라벨 스티커 데이터와 저장할 파일명',
  })
  @ApiResponse({
    status: 200,
    description: 'PDF 파일이 성공적으로 생성되었습니다.',
    content: {
      'application/pdf': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async getPDFLS3510(
    @Body() request: LabelStickerRequestDto,
    @Res() res: Response,
  ): Promise<void> {
    const buffer = await this.labelStickerService.getPDFLS3510(request.data);
    const encodedFilename = encodeURIComponent(request.filename);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodedFilename}.pdf`,
    });
    res.send(buffer);
  }

  @Get('histories')
  @ApiOperation({ summary: '라벨 스티커 히스토리 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '라벨 스티커 히스토리 목록을 성공적으로 조회했습니다.',
    type: PaginatedLabelStickerHistoriesResponseDto,
  })
  async findAllHistories(
    @Query() dto: GetLabelStickerHistoriesDto,
  ): Promise<PaginatedLabelStickerHistoriesResponseDto> {
    return this.labelStickerService.findAllHistories(dto);
  }
}
