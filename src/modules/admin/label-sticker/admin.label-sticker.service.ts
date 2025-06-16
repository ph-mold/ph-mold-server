import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LabelStickerHistory } from './entities/label-sticker-history.entity';
import { GetLabelStickerHistoriesDto } from './dto/get-label-sticker-histories.dto';
import { PaginatedLabelStickerHistoriesResponseDto } from './dto/paginated-label-sticker-histories-response.dto';
import { AdminLabelStickerRepository } from './admin.label-sticker.repository';
import { LabelStickerDto } from './dto/label-sticker-request.dto';
import { LabelStickerPdfGenerator } from './label-sticker-pdf.generator';

@Injectable()
export class AdminLabelStickerService {
  constructor(
    @InjectRepository(LabelStickerHistory)
    private readonly labelStickerRepository: AdminLabelStickerRepository,
    private readonly pdfGenerator: LabelStickerPdfGenerator,
  ) {}

  async getPDFLS3510(data: LabelStickerDto[]): Promise<Buffer> {
    return this.pdfGenerator.generatePDF(data);
  }

  async findAllHistories(
    dto: GetLabelStickerHistoriesDto,
  ): Promise<PaginatedLabelStickerHistoriesResponseDto> {
    const [items, total] =
      await this.labelStickerRepository.findAllWithPagination(dto);

    return {
      items,
      total,
      page: dto.page,
      limit: dto.limit,
    };
  }
}
