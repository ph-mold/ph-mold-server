import { Injectable } from '@nestjs/common';
import { LessThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadedFile } from 'src/entities';

@Injectable()
export class FileRepository {
  constructor(
    @InjectRepository(UploadedFile)
    private readonly repo: Repository<UploadedFile>,
  ) {}

  async saveFileInfo(file: {
    key: string;
    originalName: string;
    path: string;
  }): Promise<UploadedFile> {
    const entity = this.repo.create({
      key: file.key,
      originalName: file.originalName,
      path: file.path,
    });
    return this.repo.save(entity);
  }

  async markAsUsed(key: string): Promise<void> {
    await this.repo.update({ key }, { used: true });
  }

  async deleteByKey(key: string): Promise<void> {
    await this.repo.delete({ key });
  }

  async findExpiredUnusedFiles(expiredBefore: Date): Promise<UploadedFile[]> {
    return this.repo.find({
      where: {
        used: false,
        createdAt: LessThan(expiredBefore),
      },
    });
  }
}
