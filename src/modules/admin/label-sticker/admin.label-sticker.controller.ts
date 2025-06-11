import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AdminLabelStickerService } from './admin.label-sticker.service';

@Controller('admin/label-sticker')
export class AdminLabelStickerController {
  constructor(private readonly labelStickerService: AdminLabelStickerService) {}

  @Get('ls-3510')
  async getPDFLS3510(@Res() res: Response) {
    const buffer = await this.labelStickerService.getPDFLS3510();
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=output.pdf',
    });
    res.send(buffer);
  }
}
