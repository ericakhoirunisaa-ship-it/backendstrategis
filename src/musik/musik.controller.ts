import {
  Controller, Get, Post, Put, Delete, Param, Body,
  UseGuards, ParseIntPipe, UploadedFile, UseInterceptors, BadRequestException, Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MusikService } from './musik.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

class UpdateMusikDto {
  @IsOptional() @IsString() judul?: string;
  @IsOptional() @IsBoolean() aktif?: boolean;
}

@Controller('musik')
export class MusikController {
  constructor(private service: MusikService) {}

  @Get()
  findAll(@Query('all') all?: string) {
    return this.service.findAll(all !== 'true');
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body('judul') judul: string,
  ) {
    if (!file) throw new BadRequestException('File audio tidak ditemukan');
    if (!judul) throw new BadRequestException('Judul wajib diisi');
    const audioUrl = `/uploads/musik/${file.filename}`;
    return this.service.create({ judul, audioUrl });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMusikDto) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
