import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminLabelStickerService } from './admin.label-sticker.service';
import { AdminLabelStickerController } from './admin.label-sticker.controller';
import { AdminLabelStickerRepository } from './admin.label-sticker.repository';
import { LabelStickerHistory } from './entities/label-sticker-history.entity';
import { LabelStickerPdfGenerator } from './label-sticker-pdf.generator';

@Module({
  imports: [TypeOrmModule.forFeature([LabelStickerHistory])],
  controllers: [AdminLabelStickerController],
  providers: [
    AdminLabelStickerService,
    AdminLabelStickerRepository,
    LabelStickerPdfGenerator,
  ],
})
export class AdminLabelStickerModule {}
