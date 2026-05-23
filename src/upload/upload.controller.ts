import { Controller, Post, Param, UploadedFile, UseInterceptors, UseGuards, ParseIntPipe, Query, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('upload')
export class UploadController {
  constructor(private service: UploadService) {}

  @UseGuards(JwtAuthGuard)
  @Post('preview')
  @UseInterceptors(FileInterceptor('file'))
  preview(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('File tidak ditemukan');
    return this.service.parseAndPreview(file.path);
  }

  @UseGuards(JwtAuthGuard)
  @Post('csv/:indikatorId')
  @UseInterceptors(FileInterceptor('file'))
  import(
    @Param('indikatorId', ParseIntPipe) indikatorId: number,
    @UploadedFile() file: Express.Multer.File,
    @Query('kolom') kolom?: string,
  ) {
    if (!file) throw new BadRequestException('File tidak ditemukan');
    return this.service.importCsv(file.path, indikatorId, kolom);
  }
}
