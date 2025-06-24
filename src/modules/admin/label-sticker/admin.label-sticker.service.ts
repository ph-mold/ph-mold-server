import { Injectable } from '@nestjs/common';
import { GetLabelStickerHistoriesDto } from './dto/get-label-sticker-histories.dto';
import { PaginatedLabelStickerHistoriesResponseDto } from './dto/paginated-label-sticker-histories-response.dto';
import { AdminLabelStickerRepository } from './admin.label-sticker.repository';
import {
  LS3509LabelStickerDto,
  LS3510LabelStickerDto,
} from './dto/label-sticker-request.dto';
import { LabelStickerPdfGeneratorLS3510 } from './label-ls-3510.generator';
import { LabelStickerPdfGeneratorLS3509 } from './label-ls-3509.generator';

interface GeneratePDFOptions {
  filename: string;
  operator: string;
  labelType: string;
}

@Injectable()
export class AdminLabelStickerService {
  constructor(
    private readonly labelStickerRepository: AdminLabelStickerRepository,
    private readonly pdfGeneratorLS3510: LabelStickerPdfGeneratorLS3510,
    private readonly pdfGeneratorLS3509: LabelStickerPdfGeneratorLS3509,
  ) {}

  async createPDFLS3510WithHistory(
    data: LS3510LabelStickerDto[],
    options: GeneratePDFOptions,
  ): Promise<Buffer> {
    const buffer = await this.pdfGeneratorLS3510.generatePDF(data);

    await this.labelStickerRepository.save({
      fileName: options.filename,
      operator: options.operator,
      labelType: options.labelType,
      labelData: data,
    });

    return buffer;
  }

  async createPDFLS3509WithHistory(
    data: LS3510LabelStickerDto[],
    options: GeneratePDFOptions,
  ): Promise<Buffer> {
    const buffer = await this.pdfGeneratorLS3509.generatePDF(data);

    await this.labelStickerRepository.save({
      fileName: options.filename,
      operator: options.operator,
      labelType: options.labelType,
      labelData: data,
    });

    return buffer;
  }

  async regeneratePDFLS3509(data: LS3509LabelStickerDto[]): Promise<Buffer> {
    const buffer = await this.pdfGeneratorLS3509.generatePDF(data);
    return buffer;
  }

  async regeneratePDFLS3510(data: LS3510LabelStickerDto[]): Promise<Buffer> {
    return this.pdfGeneratorLS3510.generatePDF(data);
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

  async softDeleteHistory(id: number): Promise<boolean> {
    return this.labelStickerRepository.softDeleteById(id);
  }
}
