import { Injectable } from '@nestjs/common';
import { GetLabelStickerHistoriesDto } from './dto/get-label-sticker-histories.dto';
import { PaginatedLabelStickerHistoriesResponseDto } from './dto/paginated-label-sticker-histories-response.dto';
import { AdminLabelStickerRepository } from './admin.label-sticker.repository';
import { LabelStickerDto } from './dto/label-sticker-request.dto';
import { LabelStickerPdfGenerator } from './label-sticker-pdf.generator';

interface GeneratePDFOptions {
  filename: string;
  operator: string;
  labelType: string;
}

@Injectable()
export class AdminLabelStickerService {
  constructor(
    private readonly labelStickerRepository: AdminLabelStickerRepository,
    private readonly pdfGenerator: LabelStickerPdfGenerator,
  ) {}

  async createPDFLS3510WithHistory(
    data: LabelStickerDto[],
    options: GeneratePDFOptions,
  ): Promise<Buffer> {
    const buffer = await this.pdfGenerator.generatePDF(data);

    // PDF 생성 히스토리 저장
    await this.labelStickerRepository.save({
      fileName: options.filename,
      operator: options.operator,
      labelType: options.labelType,
      labelData: data,
    });

    return buffer;
  }

  async regeneratePDFLS3510(data: LabelStickerDto[]): Promise<Buffer> {
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
