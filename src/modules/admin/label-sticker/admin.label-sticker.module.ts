import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminLabelStickerService } from './admin.label-sticker.service';
import { AdminLabelStickerController } from './admin.label-sticker.controller';
import { AdminLabelStickerRepository } from './admin.label-sticker.repository';
import { LabelStickerHistory } from './entities/label-sticker-history.entity';
import { LabelStickerPdfGeneratorLS3510 } from './label-ls-3510.generator';
import { LabelStickerPdfGeneratorLS3509 } from './label-ls-3509.generator';

@Module({
  imports: [TypeOrmModule.forFeature([LabelStickerHistory])],
  controllers: [AdminLabelStickerController],
  providers: [
    AdminLabelStickerService,
    AdminLabelStickerRepository,
    LabelStickerPdfGeneratorLS3510,
    LabelStickerPdfGeneratorLS3509,
  ],
})
export class AdminLabelStickerModule {}
