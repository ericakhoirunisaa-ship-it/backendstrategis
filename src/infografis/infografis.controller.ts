import {
  Controller, Get, Post, Put, Delete, Param, Body,
  UseGuards, ParseIntPipe, UploadedFile, UseInterceptors,
  Query, BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InfografisService } from './infografis.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IsString, IsOptional, IsInt, IsBoolean } from 'class-validator';

class UpdateInfografisDto {
  @IsOptional() @IsString() judul?: string;
  @IsOptional() @IsString() deskripsi?: string;
  @IsOptional() @IsInt() urutan?: number;
  @IsOptional() @IsBoolean() aktif?: boolean;
}

@Controller('infografis')
export class InfografisController {
  constructor(private service: InfografisService) {}

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
    @Body('deskripsi') deskripsi?: string,
    @Body('urutan') urutan?: string,
  ) {
    if (!file) throw new BadRequestException('File gambar tidak ditemukan');
    if (!judul) throw new BadRequestException('Judul wajib diisi');
    const imageUrl = `/uploads/infografis/${file.filename}`;
    return this.service.create({
      judul,
      deskripsi,
      imageUrl,
      urutan: urutan ? parseInt(urutan) : 0,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateInfografisDto) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
