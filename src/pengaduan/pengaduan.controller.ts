import {
  Controller, Get, Post, Put, Delete,
  Param, Body, UseGuards, ParseIntPipe,
  UseInterceptors, UploadedFiles, BadRequestException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PengaduanService } from './pengaduan.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IsOptional, IsString } from 'class-validator';

class UpdatePengaduanDto {
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsString() catatan?: string;
}

@Controller('pengaduan')
export class PengaduanController {
  constructor(private service: PengaduanService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'fotoIdentitas', maxCount: 1 },
      { name: 'lampiran', maxCount: 5 },
    ]),
  )
  async create(
    @UploadedFiles() files: { fotoIdentitas?: Express.Multer.File[]; lampiran?: Express.Multer.File[] },
    @Body('namaLengkap') namaLengkap: string,
    @Body('noIdentitas') noIdentitas: string,
    @Body('alamat') alamat: string,
    @Body('noTelpon') noTelpon: string,
    @Body('isiPengaduan') isiPengaduan: string,
  ) {
    if (!namaLengkap || !noIdentitas || !alamat || !noTelpon || !isiPengaduan) {
      throw new BadRequestException('Semua field wajib harus diisi');
    }
    if (!files?.fotoIdentitas?.[0]) {
      throw new BadRequestException('Foto identitas wajib diunggah');
    }

    const fotoIdentitas = `/uploads/pengaduan/${files.fotoIdentitas[0].filename}`;
    const lampiran = files?.lampiran?.[0]
      ? `/uploads/pengaduan/${files.lampiran[0].filename}`
      : undefined;

    return this.service.create({ namaLengkap, noIdentitas, fotoIdentitas, alamat, noTelpon, isiPengaduan, lampiran });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePengaduanDto) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
