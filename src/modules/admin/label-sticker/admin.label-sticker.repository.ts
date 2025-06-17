import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LabelStickerHistory } from './entities/label-sticker-history.entity';
import { Repository } from 'typeorm';
import { GetLabelStickerHistoriesDto } from './dto/get-label-sticker-histories.dto';

@Injectable()
export class AdminLabelStickerRepository {
  constructor(
    @InjectRepository(LabelStickerHistory)
    private readonly historyRepo: Repository<LabelStickerHistory>,
  ) {}

  async findAllWithPagination(
    dto: GetLabelStickerHistoriesDto,
  ): Promise<[LabelStickerHistory[], number]> {
    return this.historyRepo.findAndCount({
      skip: (dto.page - 1) * dto.limit,
      take: dto.limit,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async save(
    history: Partial<LabelStickerHistory>,
  ): Promise<LabelStickerHistory> {
    return this.historyRepo.save(history);
  }
}
