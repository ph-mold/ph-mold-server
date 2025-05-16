import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { FileRepository } from './fuil.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadedFile } from './entities/uploaded-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UploadedFile])],
  providers: [FileService, FileRepository],
  controllers: [FileController],
  exports: [FileService],
})
export class FileModule {}
