import {
  Controller,
  Post,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileCleanupFilter } from 'src/filters/file-cleanup.filter';
import { FileInterceptor } from '@nestjs/platform-express';
import { pngMulterOptions } from 'src/utils/multer-options/file';
import { FileCleanupInterceptor } from 'src/interceptors/file-cleanup.interceptor';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UploadImageDto } from './dto/upload-image.dto';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('file')
@ApiBearerAuth('access-token')
@Roles(Role.Admin, Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseFilters(FileCleanupFilter)
  @UseInterceptors(
    FileInterceptor('image', pngMulterOptions()),
    FileCleanupInterceptor,
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadImageDto })
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return await this.fileService.handleUpload(file);
  }
}
