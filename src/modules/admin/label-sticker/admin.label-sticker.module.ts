import { Module } from '@nestjs/common';
import { AdminLabelStickerService } from './admin.label-sticker.service';
import { AdminLabelStickerController } from './admin.label-sticker.controller';

@Module({
  controllers: [AdminLabelStickerController],
  providers: [AdminLabelStickerService],
})
export class AdminLabelStickerModule {}
