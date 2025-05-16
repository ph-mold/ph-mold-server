import { Injectable } from '@nestjs/common';
import { FileRepository } from './fuil.repository';

@Injectable()
export class FileService {
  constructor(private readonly fileRepo: FileRepository) {}

  async handleUpload(file: Express.Multer.File) {
    const key = this.extractKey(file.filename);
    await this.fileRepo.saveFileInfo({
      key,
      originalName: file.originalname,
      path: file.path,
    });
    return { path: `/${file.path}` };
  }

  async markFileAsUsed(key: string) {
    await this.fileRepo.markAsUsed(key);
  }
  private extractKey(filename: string): string {
    return filename.split('.')[0];
  }
}
